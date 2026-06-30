import { TrendingUp, TrendingDown } from 'lucide-react';

export default function MetricCard({ title, value, trend, trendType, description, icon: Icon, sparklineData = [] }) {
  const isUp = trendType === 'up';
  const isDown = trendType === 'down';

  // Helper to generate SVG path for sparkline
  const getSparklinePath = (data) => {
    if (!data || data.length < 2) return '';
    const width = 100;
    const height = 30;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min === 0 ? 1 : max - min;
    
    return data.map((val, idx) => {
      const x = (idx / (data.length - 1)) * width;
      const y = height - ((val - min) / range) * height * 0.8 - height * 0.1; // 10% padding
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
  };

  const sparklinePath = getSparklinePath(sparklineData);

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-800 dark:bg-[#111827] border border-slate-200 dark:border-slate-700 dark:border-slate-800/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02),0_1px_2px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04),0_2px_8px_rgba(0,0,0,0.02)] transition-all duration-300 group">
      {/* Background radial highlight */}
      <div className="absolute -right-10 -top-10 w-28 h-28 rounded-full bg-blue-500/5 dark:bg-blue-400/5 blur-xl group-hover:scale-125 transition-transform duration-500" />
      
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 dark:text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 dark:text-slate-300 border border-slate-100 dark:border-slate-700 dark:border-slate-700/30 group-hover:border-blue-100/50 dark:group-hover:border-blue-900/20 group-hover:bg-blue-50/30 dark:group-hover:bg-blue-950/20 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {Icon && <Icon className="w-4 h-4" />}
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="text-2xl font-display font-bold text-slate-900 dark:text-white dark:text-slate-50 tracking-tight">
          {value}
        </span>
      </div>

      <div className="mt-3 flex items-center justify-between">
        {/* Trend badge */}
        <div className="flex items-center gap-1">
          {trend && (
            <span className={`inline-flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${
              isUp 
                ? 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-950/30' 
                : isDown 
                  ? 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-950/30' 
                  : 'text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:bg-slate-800/50'
            }`}>
              {isUp && <TrendingUp className="w-3 h-3" />}
              {isDown && <TrendingDown className="w-3 h-3" />}
              {trend}
            </span>
          )}
          <span className="text-[11px] text-slate-400 dark:text-slate-500 dark:text-slate-400 font-medium">
            {description}
          </span>
        </div>

        {/* Micro sparkline - Stripe style */}
        {sparklineData.length > 0 && (
          <div className="w-20 h-7 opacity-85 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 100 30" className="w-full h-full overflow-visible">
              <path
                d={sparklinePath}
                fill="none"
                stroke={isUp ? '#22c55e' : isDown ? '#ef4444' : '#3b82f6'}
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
