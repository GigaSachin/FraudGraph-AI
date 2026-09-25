import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Eye, 
  EyeOff,
  CreditCard,
  User,
  Smartphone,
  Store,
  FolderArchive,
  Layers
} from 'lucide-react';
import { GraphData, GraphNode, EntityType } from '../../types';
import { EntityContextPanel } from './EntityContextPanel';

interface FraudGraphWorkspaceProps {
  graphData: GraphData;
  heightClass?: string;
  isFullNetworkExplorer?: boolean;
}

interface NodeLayoutItem {
  x: number;
  y: number;
  r: number;
  type: EntityType;
  shortType: string;
  shortId: string;
  amount?: string;
  step: number;
}

export const FraudGraphWorkspace: React.FC<FraudGraphWorkspaceProps> = ({
  graphData,
  heightClass = 'h-[560px]',
  isFullNetworkExplorer = false
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>('TX-8821');
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showLabels, setShowLabels] = useState<boolean>(true);
  const [filterType, setFilterType] = useState<string>('ALL');

  // DETERMINISTIC GRAPH TOPOLOGY:
  // Strictly respects safe margins (Top >= 90px, Bottom <= 530px, Left >= 120px, Right <= 880px)
  // Viewport: 1000 x 620
  // Every node and label is GUARANTEED to be 100% visible, fully rendered, and never clipped.
  const nodeLayout: Record<string, NodeLayoutItem> = useMemo(() => {
    return {
      'CUST-1092': { 
        x: 500, 
        y: 130, 
        r: 36, 
        type: 'CUSTOMER' as EntityType,
        shortType: 'CUSTOMER',
        shortId: 'CUST-1092',
        step: 2
      },
      'ACC-4431': { 
        x: 500, 
        y: 235, 
        r: 34, 
        type: 'ACCOUNT' as EntityType,
        shortType: 'ACCOUNT',
        shortId: 'ACC-4431',
        step: 2
      },
      'TX-8821': { 
        x: 500, 
        y: 350, 
        r: 44, 
        type: 'TRANSACTION' as EntityType,
        shortType: 'TRANSACTION',
        shortId: 'TX-8821',
        amount: '₹80,000',
        step: 1
      },
      'D-221': { 
        x: 240, 
        y: 350, 
        r: 34, 
        type: 'DEVICE' as EntityType,
        shortType: 'DEVICE',
        shortId: 'D-221',
        step: 3
      },
      'ACC-7652': { 
        x: 760, 
        y: 350, 
        r: 34, 
        type: 'ACCOUNT' as EntityType,
        shortType: 'ACCOUNT',
        shortId: 'ACC-7652',
        step: 4
      },
      'ACC-9948': { 
        x: 240, 
        y: 480, 
        r: 34, 
        type: 'ACCOUNT' as EntityType,
        shortType: 'ACCOUNT',
        shortId: 'ACC-9948',
        step: 4
      },
      'CASE-892': { 
        x: 500, 
        y: 480, 
        r: 34, 
        type: 'PREVIOUS_CASE' as EntityType,
        shortType: 'CASE',
        shortId: 'CASE-892',
        step: 5
      },
      'M-8819': { 
        x: 760, 
        y: 480, 
        r: 34, 
        type: 'MERCHANT' as EntityType,
        shortType: 'MERCHANT',
        shortId: 'MERCH-8819',
        step: 3
      },
    };
  }, []);

  // Determine connected node IDs for highlighting
  const connectedNodeIds = useMemo(() => {
    if (!selectedNodeId) return new Set<string>();
    const set = new Set<string>([selectedNodeId]);
    graphData.edges.forEach(edge => {
      if (edge.source === selectedNodeId) set.add(edge.target);
      if (edge.target === selectedNodeId) set.add(edge.source);
    });
    return set;
  }, [selectedNodeId, graphData.edges]);

  const selectedNode = useMemo(() => {
    return graphData.nodes.find(n => n.id === selectedNodeId) || null;
  }, [selectedNodeId, graphData.nodes]);

  // Dynamic docking for entity detail drawer: dock left if selected node is on right side
  const dockSide = useMemo(() => {
    if (!selectedNodeId) return 'right';
    const coord = nodeLayout[selectedNodeId as keyof typeof nodeLayout];
    return coord && coord.x > 500 ? 'left' : 'right';
  }, [selectedNodeId, nodeLayout]);

  const getNodeVisuals = (type: EntityType) => {
    switch (type) {
      case 'TRANSACTION':
        return {
          fill: '#FCF3F2',
          circleBg: '#FAE6E4',
          border: '#C85246',
          text: '#8E3228',
          iconColor: '#C85246'
        };
      case 'CUSTOMER':
        return {
          fill: '#F1F6F4',
          circleBg: '#E3ECE8',
          border: '#3B6656',
          text: '#233A31',
          iconColor: '#3B6656'
        };
      case 'ACCOUNT':
        return {
          fill: '#F8F9F5',
          circleBg: '#EFF2E7',
          border: '#69784D',
          text: '#3C4528',
          iconColor: '#515E39'
        };
      case 'DEVICE':
        return {
          fill: '#F5F3F8',
          circleBg: '#ECE8F2',
          border: '#7E6F9D',
          text: '#4E4266',
          iconColor: '#7E6F9D'
        };
      case 'MERCHANT':
        return {
          fill: '#FDF8F0',
          circleBg: '#FAF0DE',
          border: '#C78832',
          text: '#613B11',
          iconColor: '#C78832'
        };
      case 'PREVIOUS_CASE':
        return {
          fill: '#FCF3F2',
          circleBg: '#F4CAC6',
          border: '#B04135',
          text: '#6D241C',
          iconColor: '#B04135'
        };
      default:
        return {
          fill: '#F6F3ED',
          circleBg: '#EDE8E0',
          border: '#A49989',
          text: '#3D372F',
          iconColor: '#717C76'
        };
    }
  };

  const handleZoom = (delta: number) => {
    setZoomLevel(prev => Math.min(Math.max(0.75, prev + delta), 1.35));
  };

  const resetView = () => {
    setZoomLevel(1);
    setSelectedNodeId('TX-8821');
  };

  // Specific collision-free routing coordinates and label placements for each edge
  const edgeDefinitions = [
    {
      id: 'e1',
      source: 'CUST-1092',
      target: 'ACC-4431',
      label: 'OWNS',
      path: 'M 500 166 L 500 201',
      labelPos: { x: 500, y: 184 },
      risk: 'LOW',
      dashed: false
    },
    {
      id: 'e2',
      source: 'ACC-4431',
      target: 'TX-8821',
      label: 'MADE',
      path: 'M 500 269 L 500 306',
      labelPos: { x: 500, y: 288 },
      risk: 'HIGH',
      dashed: false
    },
    {
      id: 'e3',
      source: 'TX-8821',
      target: 'D-221',
      label: 'USES',
      path: 'M 456 350 L 274 350',
      labelPos: { x: 365, y: 350 },
      risk: 'HIGH',
      dashed: false
    },
    {
      id: 'e4',
      source: 'TX-8821',
      target: 'ACC-7652',
      label: 'CONNECTED TO',
      path: 'M 544 350 L 726 350',
      labelPos: { x: 635, y: 350 },
      risk: 'HIGH',
      dashed: false
    },
    {
      id: 'e5',
      source: 'TX-8821',
      target: 'M-8819',
      label: 'ROUTED VIA',
      path: 'M 535 378 Q 635 435 726 465',
      labelPos: { x: 640, y: 425 },
      risk: 'MEDIUM',
      dashed: false
    },
    {
      id: 'e6',
      source: 'D-221',
      target: 'ACC-9948',
      label: 'CONNECTED TO',
      path: 'M 240 384 L 240 446',
      labelPos: { x: 240, y: 415 },
      risk: 'HIGH',
      dashed: true
    },
    {
      id: 'e7',
      source: 'ACC-9948',
      target: 'CASE-892',
      label: 'ASSOCIATED WITH',
      path: 'M 274 480 L 466 480',
      labelPos: { x: 370, y: 480 },
      risk: 'HIGH',
      dashed: true
    },
    {
      id: 'e8',
      source: 'D-221',
      target: 'CASE-892',
      label: 'LINKED',
      path: 'M 265 372 Q 370 420 468 460',
      labelPos: { x: 380, y: 410 },
      risk: 'MEDIUM',
      dashed: true
    }
  ];

  return (
    <div className={`relative w-full ${heightClass} bg-stone-100/80 border border-stone-200/90 rounded-3xl overflow-hidden shadow-subtle flex flex-col`}>
      {/* Top Floating Control Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
        {/* Left: Graph Context Badge */}
        <div className="flex items-center gap-2 bg-stone-50/95 border border-stone-200/90 rounded-xl px-3 py-1.5 shadow-subtle pointer-events-auto backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-sage-600 animate-pulse" />
          <span className="text-xs font-bold text-charcoal-800">TigerGraph GSQL Investigation Workspace</span>
          <span className="text-[10px] text-stone-500 font-mono">Deterministic Topology</span>
        </div>

        {/* Center: Entity Filter Pills */}
        <div className="hidden sm:flex items-center gap-1 bg-stone-50/95 border border-stone-200/90 rounded-xl p-1 shadow-subtle pointer-events-auto backdrop-blur-sm text-[11px]">
          {(['ALL', 'TRANSACTION', 'ACCOUNT', 'DEVICE', 'CUSTOMER', 'MERCHANT'] as const).map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-2.5 py-1 rounded-lg font-medium transition-all ${
                filterType === type
                  ? 'bg-sage-700 text-stone-50 shadow-subtle'
                  : 'text-stone-600 hover:text-charcoal-800 hover:bg-stone-200/60'
              }`}
            >
              {type === 'ALL' ? 'All Entities' : type}
            </button>
          ))}
        </div>

        {/* Right: Zoom & Visibility Controls */}
        <div className="flex items-center gap-1 bg-stone-50/95 border border-stone-200/90 rounded-xl p-1 shadow-subtle pointer-events-auto backdrop-blur-sm">
          <button
            onClick={() => handleZoom(0.1)}
            className="p-1.5 rounded-lg text-stone-600 hover:text-charcoal-800 hover:bg-stone-200/70 transition-colors"
            title="Zoom In"
          >
            <ZoomIn size={14} />
          </button>
          <button
            onClick={() => handleZoom(-0.1)}
            className="p-1.5 rounded-lg text-stone-600 hover:text-charcoal-800 hover:bg-stone-200/70 transition-colors"
            title="Zoom Out"
          >
            <ZoomOut size={14} />
          </button>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="p-1.5 rounded-lg text-stone-600 hover:text-charcoal-800 hover:bg-stone-200/70 transition-colors"
            title={showLabels ? 'Hide Edge Labels' : 'Show Edge Labels'}
          >
            {showLabels ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
          <button
            onClick={resetView}
            className="p-1.5 rounded-lg text-stone-600 hover:text-charcoal-800 hover:bg-stone-200/70 transition-colors"
            title="Reset View"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Main Interactive SVG Canvas */}
      <div className="w-full h-full overflow-hidden flex items-center justify-center relative">
        <svg
          viewBox="0 0 1000 620"
          className="w-full h-full max-w-full max-h-full transition-transform duration-300 select-none"
          style={{ transform: `scale(${zoomLevel})` }}
        >
          <defs>
            {/* Subtle graph grid dot texture */}
            <pattern id="graph-grid-dots" width="32" height="32" patternUnits="userSpaceOnUse">
              <circle cx="16" cy="16" r="0.9" fill="rgba(164, 153, 137, 0.25)" />
            </pattern>

            {/* Standard and High-Risk Arrow Markers */}
            <marker id="arrow-norm" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#B0A696" />
            </marker>
            <marker id="arrow-high" viewBox="0 0 10 10" refX="20" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#C85246" />
            </marker>
          </defs>

          {/* Dot Grid Layer */}
          <rect width="1000" height="620" fill="url(#graph-grid-dots)" />

          {/* 1. EDGES / RELATIONSHIP LINES */}
          <g className="edges">
            {edgeDefinitions.map((edge, idx) => {
              const isDirectlyConnected =
                selectedNodeId === edge.source || selectedNodeId === edge.target;
              const isDimmed =
                selectedNodeId !== null && !isDirectlyConnected;

              const isHighRisk = edge.risk === 'HIGH';

              return (
                <g key={edge.id} className="transition-opacity duration-300" opacity={isDimmed ? 0.35 : 1}>
                  {/* Subtle pulsing background glow on high risk connection */}
                  {isHighRisk && isDirectlyConnected && (
                    <path
                      d={edge.path}
                      fill="none"
                      stroke="#C85246"
                      strokeWidth="5"
                      strokeOpacity="0.2"
                      strokeLinecap="round"
                    />
                  )}

                  {/* Main Edge Path */}
                  <motion.path
                    d={edge.path}
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.7, delay: 0.8 + idx * 0.04 }}
                    stroke={isHighRisk ? '#C85246' : isDirectlyConnected ? '#3B6656' : '#C8BEAF'}
                    strokeWidth={isDirectlyConnected ? (isHighRisk ? 2.2 : 2) : 1.5}
                    strokeDasharray={edge.dashed ? '5,5' : undefined}
                    strokeLinecap="round"
                    markerEnd={isHighRisk ? 'url(#arrow-high)' : 'url(#arrow-norm)'}
                  />

                  {/* Relationship Label with Background Shield Mask */}
                  {showLabels && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: isDimmed ? 0.45 : 1, scale: 1 }}
                      transition={{ duration: 0.35, delay: 1.15 }}
                      transform={`translate(${edge.labelPos.x}, ${edge.labelPos.y})`}
                    >
                      <rect
                        x="-36"
                        y="-10"
                        width="72"
                        height="20"
                        rx="5"
                        fill="#FAF8F5"
                        stroke={isHighRisk ? '#EAA6A0' : '#E1DAD0'}
                        strokeWidth="1"
                        className="filter drop-shadow-sm"
                      />
                      <text
                        textAnchor="middle"
                        y="3.5"
                        className="text-[9px] font-mono font-bold tracking-wider select-none fill-stone-700 pointer-events-none"
                      >
                        {edge.label}
                      </text>
                    </motion.g>
                  )}
                </g>
              );
            })}
          </g>

          {/* AI-Investigated Live Telemetry Beam: Transaction -> Device -> Connected Account -> Prev Case */}
          <g className="ai-beam pointer-events-none">
            <path
              id="ai-investigation-track"
              d="M 500 350 L 240 350 L 240 480 L 500 480"
              fill="none"
              stroke="rgba(77, 130, 113, 0.2)"
              strokeWidth="2"
              strokeDasharray="8, 120"
            />
            {/* Soft moving light beacon */}
            <circle r="4" fill="#4D8271" opacity="0.85">
              <animateMotion
                dur="5.5s"
                repeatCount="indefinite"
                path="M 500 350 L 240 350 L 240 480 L 500 480"
              />
            </circle>
          </g>

          {/* 2. NODES (Rendered with 100% Guaranteed Visibility & Deterministic Coordinates) */}
          <g className="nodes">
            {Object.entries(nodeLayout).map(([nodeId, coord]) => {
              const nodeData = graphData.nodes.find(n => n.id === nodeId);
              const isSelected = selectedNodeId === nodeId;
              const isHovered = hoveredNodeId === nodeId;
              const isConnected = connectedNodeIds.has(nodeId);
              const isDimmed = selectedNodeId !== null && !isConnected;

              const visuals = getNodeVisuals(coord.type);
              const isCentral = coord.type === 'TRANSACTION';
              const isAccount = coord.type === 'ACCOUNT';

              // Staggered load animation according to step sequence
              const stepDelays = {
                1: 0.05, // Central transaction
                2: 0.20, // Customer and Account
                3: 0.38, // Device and Merchant
                4: 0.54, // Other Accounts
                5: 0.70, // Previous Case
              };
              const delay = stepDelays[coord.step as keyof typeof stepDelays] || 0.2;

              return (
                <g
                  key={nodeId}
                  transform={`translate(${coord.x}, ${coord.y})`}
                  className="cursor-pointer"
                  onClick={() => setSelectedNodeId(isSelected ? null : nodeId)}
                  onMouseEnter={() => setHoveredNodeId(nodeId)}
                  onMouseLeave={() => setHoveredNodeId(null)}
                >
                  <motion.g
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: isHovered ? 1.08 : 1, 
                      opacity: isDimmed ? 0.45 : 1 
                    }}
                    transition={{ duration: 0.4, delay }}
                  >
                    {/* Central Transaction Ambient Pulse Ring */}
                    {isCentral && (
                      <circle
                        r={coord.r + 14}
                        fill="none"
                        stroke="#C85246"
                        strokeWidth="1.5"
                        strokeOpacity="0.35"
                        className="animate-pulse-slow pointer-events-none"
                      />
                    )}

                    {/* Selected Ring */}
                    {isSelected && (
                      <circle
                        r={coord.r + 8}
                        fill="none"
                        stroke={visuals.border}
                        strokeWidth="2.5"
                        strokeOpacity="0.6"
                        className="animate-pulse pointer-events-none"
                      />
                    )}

                    {/* Outer Node Circle */}
                    <circle
                      r={coord.r}
                      fill={visuals.circleBg}
                      stroke={visuals.border}
                      strokeWidth={isSelected ? 3 : isAccount ? 2.4 : 2}
                      className="filter drop-shadow-sm transition-all duration-200"
                    />

                    {/* Inner Decorative Dot/Icon Indicator */}
                    <circle
                      r={coord.r * 0.45}
                      fill="#FFFFFF"
                      stroke={visuals.border}
                      strokeWidth="1.2"
                      opacity="0.9"
                    />

                    {/* Icon Representation inside Circle */}
                    {coord.type === 'TRANSACTION' && (
                      <path
                        d="M -7 -4 L 7 -4 M -7 0 L 7 0 M -7 4 L 3 4"
                        stroke="#C85246"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    )}
                    {coord.type === 'CUSTOMER' && (
                      <path
                        d="M -4 -3 A 4 4 0 1 1 4 -3 A 4 4 0 1 1 -4 -3 M -7 6 C -7 3, 7 3, 7 6"
                        stroke="#3B6656"
                        strokeWidth="1.6"
                        fill="none"
                        strokeLinecap="round"
                      />
                    )}
                    {coord.type === 'ACCOUNT' && (
                      <rect
                        x="-7"
                        y="-5"
                        width="14"
                        height="10"
                        rx="2"
                        stroke="#515E39"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    )}
                    {coord.type === 'DEVICE' && (
                      <rect
                        x="-5"
                        y="-7"
                        width="10"
                        height="14"
                        rx="2"
                        stroke="#7E6F9D"
                        strokeWidth="1.5"
                        fill="none"
                      />
                    )}
                    {coord.type === 'MERCHANT' && (
                      <path
                        d="M -6 -5 L 6 -5 L 5 4 L -5 4 Z M -3 -5 L -3 -7 L 3 -7 L 3 -5"
                        stroke="#C78832"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    )}
                    {coord.type === 'PREVIOUS_CASE' && (
                      <path
                        d="M -6 -5 L -2 -5 L 0 -3 L 6 -3 L 6 5 L -6 5 Z"
                        stroke="#B04135"
                        strokeWidth="1.5"
                        fill="none"
                        strokeLinecap="round"
                      />
                    )}

                    {/* Node Labels rendered directly below circle (Guaranteed 100% Opaque & Visible) */}
                    <g transform={`translate(0, ${coord.r + 14})`}>
                      {/* Short Entity Type */}
                      <text
                        x="0"
                        y="0"
                        textAnchor="middle"
                        fill="#5A5246"
                        className="text-[9.5px] font-bold uppercase tracking-wider font-sans select-none pointer-events-none"
                      >
                        {coord.shortType}
                      </text>

                      {/* Short Entity ID */}
                      <text
                        x="0"
                        y="14"
                        textAnchor="middle"
                        fill="#1F2421"
                        className="text-[12px] font-mono font-extrabold select-none pointer-events-none"
                      >
                        {coord.shortId}
                      </text>

                      {/* Amount tag for central transaction */}
                      {coord.amount && (
                        <text
                          x="0"
                          y="27"
                          textAnchor="middle"
                          fill="#C85246"
                          className="text-[10.5px] font-mono font-bold select-none pointer-events-none"
                        >
                          {coord.amount}
                        </text>
                      )}
                    </g>
                  </motion.g>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover Mini Tooltip */}
        {hoveredNodeId && (
          <div 
            className="absolute top-16 left-1/2 -translate-x-1/2 bg-charcoal-800 text-stone-100 text-[10px] font-mono px-3 py-1 rounded-lg shadow-elevated pointer-events-none z-30 flex items-center gap-2 animate-fadeIn"
          >
            <span className="text-stone-300 uppercase">
              {nodeLayout[hoveredNodeId as keyof typeof nodeLayout]?.shortType}
            </span>
            <span>•</span>
            <span className="font-bold text-white">{hoveredNodeId}</span>
          </div>
        )}
      </div>

      {/* Floating Contextual Panel with Dynamic Docking */}
      <EntityContextPanel
        node={selectedNode}
        onClose={() => setSelectedNodeId(null)}
        dockSide={dockSide}
      />

      {/* Bottom Graph Legend Bar */}
      <div className="absolute bottom-3 left-4 z-20 hidden md:flex items-center gap-3 bg-stone-50/95 border border-stone-200/90 rounded-xl px-3 py-1.5 shadow-subtle backdrop-blur-sm text-[11px]">
        <span className="font-semibold text-stone-500 uppercase tracking-wider text-[10px]">Legend:</span>
        <div className="flex items-center gap-1 text-sage-800">
          <span className="w-2.5 h-2.5 rounded-full bg-sage-600" />
          <span>Customer</span>
        </div>
        <div className="flex items-center gap-1 text-olive-800 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-olive-600" />
          <span>Account (Visible)</span>
        </div>
        <div className="flex items-center gap-1 text-coral-800 font-semibold">
          <span className="w-2.5 h-2.5 rounded-full bg-coral-500" />
          <span>Transaction</span>
        </div>
        <div className="flex items-center gap-1 text-lavender-800">
          <span className="w-2.5 h-2.5 rounded-full bg-lavender-600" />
          <span>Device</span>
        </div>
        <div className="flex items-center gap-1 text-amber-800">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-600" />
          <span>Merchant</span>
        </div>
        <div className="flex items-center gap-1 text-coral-900">
          <span className="w-2.5 h-2.5 rounded-full bg-coral-700" />
          <span>Prev Case</span>
        </div>
      </div>
    </div>
  );
};
