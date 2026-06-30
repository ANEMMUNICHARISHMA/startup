import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Sector } from 'recharts';
import { STATUS_COLORS } from '../../constants/analyticsColors';

const renderActiveShape = (props) => {
  const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
    </g>
  );
};

export const PieChartCard = ({ data, totalLeads }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const percentage = Math.round((data.value / totalLeads) * 100);
      return (
        <div className="bg-slate-200 dark:bg-[#1F2937] p-3 border border-slate-700 shadow-xl rounded-lg">
          <p className="font-semibold text-slate-900 dark:text-white">{data.name}</p>
          <p className="text-slate-300 text-sm mt-1">{data.value} Leads ({percentage}%)</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white dark:bg-[#131826] p-6 rounded-2xl border border-slate-200 dark:border-[#1F2937] shadow-sm flex flex-col h-full">
      <div className="mb-8">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-wide">Lead Status Distribution</h3>
        <p className="text-xs text-slate-500 mt-1">Proportional breakdown of opportunities in pipeline stages.</p>
      </div>
      
      <div className="flex-1 flex flex-col">
        <div className="relative h-[200px] w-full">
          {/* Center Label */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{totalLeads}</span>
            <span className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mt-1">Total Leads</span>
          </div>
          
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={80}
                paddingAngle={2}
                stroke="none"
                dataKey="value"
                onMouseEnter={onPieEnter}
              >
                {data.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={STATUS_COLORS[entry.name] || '#94A3B8'} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={{fill: 'transparent'}} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Custom Legend */}
        <div className="mt-8 space-y-3">
          {data.map((entry) => {
            const percentage = Math.round((entry.value / totalLeads) * 100);
            return (
              <div key={entry.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: STATUS_COLORS[entry.name] || '#94A3B8' }} />
                  <span className="text-slate-300 font-medium">{entry.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-slate-900 dark:text-white font-semibold">{entry.value}</span>
                  <span className="text-slate-500 font-medium w-8 text-right">({percentage}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
