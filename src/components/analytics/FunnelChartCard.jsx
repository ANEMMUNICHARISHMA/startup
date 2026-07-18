import React from 'react';
import { FunnelChart, Funnel, Tooltip, ResponsiveContainer } from 'recharts';

export const FunnelChartCard = ({ data }) => {
  const maxLeads = data && data.length > 0 ? data[0].value : 0;
  
  // Custom colors for funnel to match the blue-to-green gradient in screenshot
  const FUNNEL_COLORS = ['#3B82F6', '#4F46E5', '#6366F1', '#8B5CF6', '#10B981'];

  // Add fill to data so we don't need <Cell> which might be buggy in Funnel
  const chartData = data.map((d, index) => ({
    ...d,
    fill: FUNNEL_COLORS[index % FUNNEL_COLORS.length]
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const stage = payload[0].payload;
      return (
        <div className="bg-surface/50 p-3 border border-border shadow-xl rounded-lg">
          <p className="font-semibold text-text">{stage.name}</p>
          <p className="text-text/40 text-sm mt-1">{stage.value} Leads</p>
          {stage.name !== 'New' && (
            <p className="text-xs font-medium text-emerald-500 mt-1">
              Conversion: {stage.conversion}%
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-text tracking-wide">Sales Conversion Funnel</h3>
        <p className="text-xs text-text/60 mt-1">Track stage conversion efficiency and funnel leakage.</p>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row items-center">
        {/* Chart Side */}
        <div className="flex-1 w-full min-h-[260px] flex justify-center items-center">
          {data && data.length > 0 ? (
            <ResponsiveContainer width="100%" height={260}>
              <FunnelChart>
                <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
                <Funnel
                  dataKey="value"
                  nameKey="name"
                  data={chartData}
                  isAnimationActive={false}
                  labelLine={false}
                />
              </FunnelChart>
            </ResponsiveContainer>
          ) : null}
        </div>

        {/* Legend Side */}
        <div className="md:w-5/12 w-full mt-6 md:mt-0 md:pl-6 space-y-4">
          {data.map((stage, index) => {
            const overallPercentage = maxLeads > 0 ? Math.round((stage.value / maxLeads) * 100) : 0;
            const dropoff = index === 0 ? 0 : 100 - stage.conversion;
            const color = FUNNEL_COLORS[index % FUNNEL_COLORS.length];
            
            return (
              <div key={stage.name} className="flex flex-col relative pl-4">
                {/* Timeline line */}
                {index !== data.length - 1 && (
                  <div className="absolute left-[3px] top-4 bottom-[-24px] w-[1px] bg-surface/50" />
                )}
                {/* Dot */}
                <div 
                  className="absolute left-0 top-1.5 w-2 h-2 rounded-full" 
                  style={{ backgroundColor: color }} 
                />
                
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-text font-bold">{stage.name}</span>
                  <div className="text-text/50">
                    <span className="text-text font-bold mr-1">{stage.value}</span>
                    ({overallPercentage}%)
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1.5 bg-surface/50 rounded-full overflow-hidden mt-1 mb-1.5">
                  <div 
                    className="h-full rounded-full" 
                    style={{ width: `${overallPercentage}%`, backgroundColor: color }} 
                  />
                </div>
                
                {/* Subtext */}
                <div className="flex items-center justify-between text-[10px] font-medium text-text/60">
                  {index > 0 ? (
                    <>
                      <span>Conv: {stage.conversion}% from prev</span>
                      <span className="text-red-400">-{dropoff}% drop-off</span>
                    </>
                  ) : (
                    <span className="invisible">placeholder</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
