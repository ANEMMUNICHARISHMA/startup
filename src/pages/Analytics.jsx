import React, { useState, useEffect } from 'react';
import { useAnalytics } from '../hooks/useAnalytics';
import { AnalyticsFilters } from '../components/analytics/AnalyticsFilters';
import { StatsCards } from '../components/analytics/StatsCards';
import { PieChartCard } from '../components/analytics/PieChartCard';
import { FunnelChartCard } from '../components/analytics/FunnelChartCard';
import { BarChartCard } from '../components/analytics/BarChartCard';
import { LineChartCard } from '../components/analytics/LineChartCard';
import { RevenueChartCard } from '../components/analytics/RevenueChartCard';
import { LeadSourceChart } from '../components/analytics/LeadSourceChart';
import { SalesVelocityCard } from '../components/analytics/SalesVelocityCard';
import { ForecastCard } from '../components/analytics/ForecastCard';
import { ActivityHeatmap } from '../components/analytics/ActivityHeatmap';
import { TopPerformersCard } from '../components/analytics/TopPerformersCard';
import { EmptyAnalyticsState } from '../components/analytics/EmptyAnalyticsState';
import { LoadingSkeleton } from '../components/analytics/LoadingSkeleton';

export default function Analytics() {
  const { dateRange, setDateRange, metrics, hasData } = useAnalytics();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate network loading state for a premium feel
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [dateRange]);

  return (
    <div className="p-4 md:p-8 bg-slate-50 dark:bg-slate-900 dark:bg-[#0B0F19] min-h-screen text-slate-900 dark:text-white dark:text-slate-100">
      <div className="max-w-[1400px] mx-auto space-y-6">
        
        {/* Header & Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white dark:text-slate-100 tracking-tight">Analytics Dashboard</h1>
            <p className="text-slate-400 mt-1 text-sm">Track sales performance and growth trends.</p>
          </div>
          <AnalyticsFilters dateRange={dateRange} setDateRange={setDateRange} />
        </div>

        {/* Content Area */}
        {isLoading ? (
          <LoadingSkeleton />
        ) : !hasData ? (
          <EmptyAnalyticsState />
        ) : (
          <div className="space-y-6">
            <StatsCards metrics={metrics} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <PieChartCard data={metrics.statusDistribution} totalLeads={metrics.totalLeads} />
              <FunnelChartCard data={metrics.funnelData} />
              
              <BarChartCard data={metrics.monthlyLeads} />
              <LineChartCard data={metrics.conversionTrend} />
              
              <RevenueChartCard data={metrics.revenueTrend} />
              <LeadSourceChart data={metrics.leadSources} />
              
              <ActivityHeatmap data={metrics.activityHeatmap} />
              <TopPerformersCard performers={metrics.topPerformers} />
              
              <ForecastCard revenue={metrics.forecastRevenue} />
              <SalesVelocityCard velocity={metrics.salesVelocity} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
