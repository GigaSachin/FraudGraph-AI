import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Clock } from 'lucide-react';

interface MetricProps {
  label: string;
  value: number;
  accent: 'sage' | 'coral' | 'amber';
  icon: React.ReactNode;
  trend: string;
  sparklineData: number[];
}

const NumberCounter: React.FC<{ target: number }> = ({ target }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200; // ms
    const stepTime = 25;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
};

// Clean tiny SVG sparkline with subtle gradient fill
const MiniSparkline: React.FC<{ data: number[]; color: string; fillGradientId: string }> = ({ data, color, fillGradientId }) => {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 28;

  const points = data.map((val, idx) => {
    const x = (idx / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 6) - 3;
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${points} ${width},${height} 0,${height}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <linearGradient id={fillGradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.28" />
          <stop offset="100%" stopColor={color} stopOpacity="0.0" />
        </linearGradient>
      </defs>
      <polygon points={areaPoints} fill={`url(#${fillGradientId})`} />
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points}
      />
    </svg>
  );
};

export const OverviewMetrics: React.FC = () => {
  const metrics: MetricProps[] = [
    {
      label: 'ACTIVE INVESTIGATIONS',
      value: 128,
      accent: 'sage',
      icon: <Activity size={17} className="text-sage-700" />,
      trend: '+12% vs last shift',
      sparklineData: [42, 58, 62, 75, 71, 88, 95, 110, 128]
    },
    {
      label: 'HIGH RISK CASES',
      value: 24,
      accent: 'coral',
      icon: <AlertTriangle size={17} className="text-coral-600" />,
      trend: '4 require immediate escalation',
      sparklineData: [12, 14, 18, 15, 21, 19, 23, 22, 24]
    },
    {
      label: 'AWAITING DECISION',
      value: 31,
      accent: 'amber',
      icon: <Clock size={17} className="text-amber-600" />,
      trend: 'Avg resolution: 4.8m',
      sparklineData: [19, 22, 28, 25, 29, 34, 30, 32, 31]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 my-6">
      {metrics.map((m, idx) => {
        let accentBorder = 'border-sage-200/90 hover:border-sage-300';
        let accentBg = 'bg-stone-50/80';
        let accentIconBg = 'bg-sage-100/80';
        let strokeColor = '#4D8271';

        if (m.accent === 'coral') {
          accentBorder = 'border-coral-200/80 hover:border-coral-300';
          accentIconBg = 'bg-coral-100/70';
          strokeColor = '#C85246';
        } else if (m.accent === 'amber') {
          accentBorder = 'border-amber-200/80 hover:border-amber-300';
          accentIconBg = 'bg-amber-100/70';
          strokeColor = '#C78832';
        }

        return (
          <motion.div
            key={m.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: idx * 0.1 }}
            className={`p-5 rounded-2xl ${accentBg} border ${accentBorder} shadow-subtle transition-all duration-300 hover:shadow-soft`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-xl ${accentIconBg} flex items-center justify-center`}>
                  {m.icon}
                </div>
                <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-600">
                  {m.label}
                </span>
              </div>
              <MiniSparkline
                data={m.sparklineData}
                color={strokeColor}
                fillGradientId={`sparkline-grad-${m.accent}`}
              />
            </div>

            <div className="mt-4 flex items-baseline justify-between">
              <div className="text-3xl font-extrabold text-charcoal-800 tracking-tight font-sans">
                <NumberCounter target={m.value} />
              </div>
              <span className="text-[11px] text-stone-600 font-medium">
                {m.trend}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};
