import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CHART_COLORS } from '../../constants/analyticsColors';

const formatCurrency = (value) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}k`;
  return `₹${value}`;
};

export const RevenueChartCard = ({ data }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface/50 p-3 border border-border shadow-xl rounded-lg">
          <p className="font-semibold text-text mb-1">{label}</p>
          <p className="text-emerald-400 font-medium">₹{payload[0].value.toLocaleString('en-IN')}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-surface p-6 rounded-2xl border border-border shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-text tracking-wide">Revenue Growth Trend</h3>
        <p className="text-xs text-text/60 mt-1">Monthly won revenue from closed deals over the last 6 months.</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.success} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={CHART_COLORS.success} stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              tickFormatter={formatCurrency}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke={CHART_COLORS.success} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorRevenue)" 
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
