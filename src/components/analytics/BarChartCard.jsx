import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../constants/analyticsColors';

export const BarChartCard = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface/50 p-3 border border-border shadow-xl rounded-lg">
          <p className="font-semibold text-text mb-1">{label}</p>
          <p className="text-primary font-medium">{payload[0].value} Leads</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-text tracking-wide">Monthly Leads Trend</h3>
        <p className="text-xs text-text/60 mt-1">Volume of new opportunities registered monthly over the last 6 months.</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={CHART_COLORS.grid} />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 11 }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
              tickFormatter={(val) => Math.floor(val)}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'var(--color-border)', opacity: 0.4}} />
            <Bar 
              dataKey="count" 
              fill={CHART_COLORS.primary} 
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
