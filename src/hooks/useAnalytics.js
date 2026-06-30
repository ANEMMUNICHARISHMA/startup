import { useMemo, useState } from 'react';
import { useLeads } from '../context/LeadContext';
import * as helpers from '../utils/analyticsHelpers';

export const useAnalytics = () => {
  const { leads } = useLeads();
  const [dateRange, setDateRange] = useState('all'); // '7d', '30d', '90d', '1y', 'all'

  // Filter leads based on selected date range
  const filteredLeads = useMemo(() => {
    if (dateRange === 'all') return leads;

    const now = new Date();
    let cutoffDate = new Date();

    if (dateRange === '7d') cutoffDate.setDate(now.getDate() - 7);
    else if (dateRange === '30d') cutoffDate.setDate(now.getDate() - 30);
    else if (dateRange === '90d') cutoffDate.setDate(now.getDate() - 90);
    else if (dateRange === '1y') cutoffDate.setFullYear(now.getFullYear() - 1);

    return leads
      .filter(lead => {
        if (!lead.createdAt) return false;
        const created = new Date(lead.createdAt);
        return created >= cutoffDate;
      })
      .sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  }, [leads, dateRange]);

  // Memoize all computed metrics based on the filtered leads
  const metrics = useMemo(() => ({
    totalLeads: filteredLeads.length,
    conversionRate: filteredLeads.length > 0 
      ? Math.round((filteredLeads.filter(l => l.status === 'Won').length / filteredLeads.length) * 100) 
      : 0,
    pipelineValue: helpers.getPipelineValue(filteredLeads),
    wonRevenue: helpers.getWonRevenue(filteredLeads),
    avgSalesCycle: helpers.getAverageSalesCycle(filteredLeads),
    lostRate: helpers.getLostRate(filteredLeads),
    salesVelocity: helpers.getSalesVelocity(filteredLeads),
    forecastRevenue: helpers.getForecastRevenue(filteredLeads),
    
    // Chart Data
    statusDistribution: helpers.getStatusDistribution(filteredLeads),
    funnelData: helpers.getFunnelData(filteredLeads),
    monthlyLeads: helpers.getMonthlyLeads(filteredLeads),
    conversionTrend: helpers.getConversionByMonth(filteredLeads),
    revenueTrend: helpers.getRevenueByMonth(filteredLeads),
    leadSources: helpers.getLeadSourceStats(filteredLeads),
    topPerformers: helpers.getTopPerformers(filteredLeads),
    activityHeatmap: helpers.getActivityHeatmapData(filteredLeads),
  }), [filteredLeads]);

  return {
    leads: filteredLeads,
    dateRange,
    setDateRange,
    metrics,
    hasData: filteredLeads.length > 0
  };
};
