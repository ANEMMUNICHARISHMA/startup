import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SOURCE_COLORS, CHART_COLORS } from '../../constants/analyticsColors';

export const LeadSourceChart = ({ data }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-200 dark:bg-[#1F2937] p-3 border border-slate-700 shadow-xl rounded-lg">
          <p className="font-semibold text-slate-900 dark:text-white mb-1">{data.name}</p>
          <p className="text-slate-300 font-medium">{data.count} Leads</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#131826] p-6 rounded-2xl border border-slate-200 dark:border-[#1F2937] shadow-sm h-full flex flex-col">
      <div className="mb-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Acquisition Channels</h3>
        <p className="text-xs text-slate-500 mt-1">Breakdown of opportunities by original lead generation channel.</p>
      </div>
      <div className="flex-1 min-h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_COLORS.grid} />
            <XAxis 
              type="number"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 11 }} 
              tickFormatter={(val) => Math.floor(val)}
            />
            <YAxis 
              dataKey="name" 
              type="category"
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: CHART_COLORS.text, fontSize: 11 }}
              width={80}
            />
            <Tooltip content={<CustomTooltip />} cursor={{fill: '#1E293B', opacity: 0.4}} />
            <Bar 
              dataKey="count" 
              radius={[0, 4, 4, 0]}
              barSize={16}
              animationDuration={1500}
            >
              {data.map((entry) => (
                <Cell key={`cell-${entry.name}`} fill={SOURCE_COLORS[entry.name] || '#94A3B8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
