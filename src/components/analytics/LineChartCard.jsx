import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../constants/analyticsColors';

export const LineChartCard = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface/50 p-3 border border-border shadow-xl rounded-lg">
          <p className="font-semibold text-text mb-1">{label}</p>
          <p className="text-emerald-400 font-medium">{payload[0].value}% Conversion</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-text tracking-wide">Monthly Conversion Trend</h3>
        <p className="text-xs text-text/60 mt-1">Ratio of won opportunities over total opportunities registered by month.</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              domain={[0, 100]}
              tickFormatter={(val) => `${val}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="conversionRate" 
              stroke={CHART_COLORS.success} 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2, fill: '#131826', stroke: CHART_COLORS.success }}
              activeDot={{ r: 6, stroke: CHART_COLORS.success, strokeWidth: 2, fill: '#fff' }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
