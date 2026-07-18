import React from 'react';
import { Users, Percent, DollarSign, TrendingUp, Clock, AlertTriangle } from 'lucide-react';

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const StatCard = ({ title, value, icon: Icon, trend, trendLabel, iconColor, trendColor }) => (
  <div className="bg-surface rounded-xl border border-border p-5 shadow-sm hover:border-border transition-colors">
    <div className="flex items-start justify-between mb-4">
      <p className="text-[11px] font-bold tracking-wider text-text/50 uppercase">{title}</p>
      <Icon size={16} className={iconColor} />
    </div>
    <div>
      <h4 className="text-3xl font-bold text-text tracking-tight">{value}</h4>
    </div>
    {trend !== undefined && (
      <div className="mt-4 flex items-center text-[11px] font-medium">
        <span className={`${trendColor} bg-background/50 px-1.5 py-0.5 rounded mr-2`}>
          {trend > 0 ? '+' : ''}{trend}% 
          <TrendingUp size={10} className="inline ml-1 mb-0.5" />
        </span>
        <span className="text-text/60">{trendLabel || 'vs previous period'}</span>
      </div>
    )}
  </div>
);

export const StatsCards = ({ metrics }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      <StatCard 
        title="Total Leads" 
        value={metrics.totalLeads} 
        icon={Users} 
        trend={400} 
        iconColor="text-primary"
        trendColor="text-emerald-500" 
      />
      <StatCard 
        title="Conversion Rate" 
        value={`${metrics.conversionRate}%`} 
        icon={Percent} 
        trend={20} 
        iconColor="text-emerald-500"
        trendColor="text-emerald-500" 
      />
      <StatCard 
        title="Pipeline Value" 
        value={formatCurrency(metrics.pipelineValue)} 
        icon={DollarSign} 
        trend={100} 
        trendLabel="vs last quarter"
        iconColor="text-amber-500"
        trendColor="text-emerald-500" 
      />
      <StatCard 
        title="Won Revenue" 
        value={formatCurrency(metrics.wonRevenue)} 
        icon={TrendingUp} 
        trend={100} 
        trendLabel="closed won deals"
        iconColor="text-emerald-500"
        trendColor="text-emerald-500" 
      />
      <StatCard 
        title="Avg Sales Cycle" 
        value={`${metrics.avgSalesCycle} Days`} 
        icon={Clock} 
        trend={0} 
        trendLabel="(time to result)"
        iconColor="text-accent"
        trendColor="text-text/50" 
      />
      <StatCard 
        title="Lost Rate" 
        value={`${metrics.lostRate}%`} 
        icon={AlertTriangle} 
        trend={-5} 
        trendLabel="Lost vs Total Leads"
        iconColor="text-red-500"
        trendColor="text-emerald-500" 
      />
    </div>
  );
};
