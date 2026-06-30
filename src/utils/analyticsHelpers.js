/**
 * Pure functions to process Lead data for analytics charts.
 * All functions accept an array of leads and return structured data for Recharts or KPIs.
 */

const getMonthName = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return d.toLocaleString('default', { month: 'short' }); // e.g., "Jan"
};

const getMonthYear = (dateString) => {
  if (!dateString) return '';
  const d = new Date(dateString);
  return `${d.toLocaleString('default', { month: 'short' })} '${d.getFullYear().toString().substring(2)}`; // e.g., "Jan '23"
};

const getLast6Months = () => {
  const months = [];
  const d = new Date();
  for (let i = 5; i >= 0; i--) {
    const temp = new Date(d.getFullYear(), d.getMonth() - i, 1);
    months.push(getMonthYear(temp.toISOString()));
  }
  return months;
};

export const getStatusDistribution = (leads) => {
  if (!leads || leads.length === 0) return [];
  
  const statusCounts = leads.reduce((acc, lead) => {
    const status = lead.status || 'Unknown';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(statusCounts)
    .map(status => ({ name: status, value: statusCounts[status] }))
    .sort((a, b) => b.value - a.value);
};

export const getMonthlyLeads = (leads) => {
  const last6Months = getLast6Months();
  const counts = last6Months.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {});

  if (leads && leads.length > 0) {
    leads.forEach((lead) => {
      if (!lead.createdAt) return;
      const month = getMonthYear(lead.createdAt);
      if (counts[month] !== undefined) {
        counts[month] += 1;
      }
    });
  }

  return Object.keys(counts).map(month => ({ name: month, count: counts[month] }));
};

export const getConversionByMonth = (leads) => {
  const last6Months = getLast6Months();
  const stats = last6Months.reduce((acc, month) => {
    acc[month] = { total: 0, won: 0 };
    return acc;
  }, {});

  if (leads && leads.length > 0) {
    leads.forEach((lead) => {
      if (!lead.createdAt) return;
      const month = getMonthYear(lead.createdAt);
      if (stats[month] !== undefined) {
        stats[month].total += 1;
        if (lead.status === 'Won') {
          stats[month].won += 1;
        }
      }
    });
  }

  return Object.keys(stats).map(month => ({
    name: month,
    conversionRate: stats[month].total > 0 ? Math.round((stats[month].won / stats[month].total) * 100) : 0
  }));
};

export const getRevenueByMonth = (leads) => {
  const last6Months = getLast6Months();
  const revenue = last6Months.reduce((acc, month) => {
    acc[month] = 0;
    return acc;
  }, {});

  if (leads && leads.length > 0) {
    const wonLeads = leads.filter(l => l.status === 'Won' && (l.wonAt || l.createdAt));
    wonLeads.forEach((lead) => {
      const month = getMonthYear(lead.wonAt || lead.createdAt);
      if (revenue[month] !== undefined) {
        revenue[month] += (Number(lead.value) || 0);
      }
    });
  }

  return Object.keys(revenue).map(month => ({
    name: month,
    revenue: revenue[month]
  }));
};

export const getPipelineValue = (leads) => {
  if (!leads || leads.length === 0) return 0;
  // Active leads are anything not Won or Lost
  return leads
    .filter(l => l.status !== 'Won' && l.status !== 'Lost')
    .reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
};

export const getWonRevenue = (leads) => {
  if (!leads || leads.length === 0) return 0;
  return leads
    .filter(l => l.status === 'Won')
    .reduce((sum, lead) => sum + (Number(lead.value) || 0), 0);
};

export const getAverageSalesCycle = (leads) => {
  const wonLeads = leads.filter(l => l.status === 'Won' && l.createdAt && l.wonAt);
  if (wonLeads.length === 0) return 0;

  const totalDays = wonLeads.reduce((sum, lead) => {
    const created = new Date(lead.createdAt);
    const won = new Date(lead.wonAt);
    const diffTime = Math.abs(won - created);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return sum + diffDays;
  }, 0);

  return Math.round(totalDays / wonLeads.length);
};

export const getLostRate = (leads) => {
  if (!leads || leads.length === 0) return 0;
  const lostLeads = leads.filter(l => l.status === 'Lost').length;
  return Math.round((lostLeads / leads.length) * 100);
};

export const getLeadSourceStats = (leads) => {
  if (!leads || leads.length === 0) return [];
  const sourceCounts = leads.reduce((acc, lead) => {
    const source = lead.source || 'Other';
    acc[source] = (acc[source] || 0) + 1;
    return acc;
  }, {});

  return Object.keys(sourceCounts)
    .map(source => ({ name: source, count: sourceCounts[source] }))
    .sort((a, b) => b.count - a.count);
};

export const getFunnelData = (leads) => {
  if (!leads || leads.length === 0) return [];
  
  // Custom Funnel order: New -> Contacted -> Meeting Scheduled -> Proposal Sent -> Won
  // We assume a lead in a later stage has passed through earlier stages.
  const stageHierarchy = {
    'New': 1,
    'Contacted': 2,
    'Meeting Scheduled': 3,
    'Proposal Sent': 4,
    'Won': 5
  };

  const funnelCounts = {
    'New': 0,
    'Contacted': 0,
    'Meeting Scheduled': 0,
    'Proposal Sent': 0,
    'Won': 0
  };

  leads.forEach(lead => {
    const level = stageHierarchy[lead.status] || 0;
    if (level >= 1) funnelCounts['New']++;
    if (level >= 2) funnelCounts['Contacted']++;
    if (level >= 3) funnelCounts['Meeting Scheduled']++;
    if (level >= 4) funnelCounts['Proposal Sent']++;
    if (level >= 5) funnelCounts['Won']++;
  });

  const stages = Object.keys(funnelCounts);
  return stages.map((stage, index) => {
    const count = funnelCounts[stage];
    const prevCount = index > 0 ? funnelCounts[stages[index - 1]] : count;
    const conversion = prevCount > 0 ? Math.round((count / prevCount) * 100) : 0;
    
    return {
      name: stage,
      value: count,
      conversion: conversion,
      fill: `var(--color-${stage.replace(/\s+/g, '-').toLowerCase()})` // CSS vars to be injected
    };
  });
};

export const getSalesVelocity = (leads) => {
  if (!leads || leads.length === 0) return 0;
  // Velocity = (Opportunities * Win Rate * Avg Deal Size) / Length of Sales Cycle
  const opportunities = leads.length;
  const wonLeads = leads.filter(l => l.status === 'Won');
  const winRate = opportunities > 0 ? wonLeads.length / opportunities : 0;
  
  const totalWonValue = wonLeads.reduce((sum, l) => sum + (Number(l.value) || 0), 0);
  const avgDealSize = wonLeads.length > 0 ? totalWonValue / wonLeads.length : 0;
  
  const avgSalesCycle = getAverageSalesCycle(leads) || 30; // fallback to 30 days if 0 to avoid Infinity

  return Math.round((opportunities * winRate * avgDealSize) / avgSalesCycle);
};

export const getForecastRevenue = (leads) => {
  // Simple forecast: Avg revenue of the last 6 months
  const monthlyRevenue = getRevenueByMonth(leads);
  if (monthlyRevenue.length === 0) return 0;
  
  const last6Months = monthlyRevenue.slice(-6);
  const total = last6Months.reduce((sum, item) => sum + item.revenue, 0);
  return Math.round(total / last6Months.length);
};

export const getTopPerformers = (leads) => {
  if (!leads || leads.length === 0) return [];
  const wonLeads = leads.filter(l => l.status === 'Won' && l.owner);
  
  const performers = wonLeads.reduce((acc, lead) => {
    acc[lead.owner] = (acc[lead.owner] || 0) + (Number(lead.value) || 0);
    return acc;
  }, {});

  return Object.keys(performers)
    .map(name => ({ name, revenue: performers[name] }))
    .sort((a, b) => b.revenue - a.revenue);
};

export const getActivityHeatmapData = (leads) => {
  // Returns array of { date: 'YYYY-MM-DD', count: N }
  if (!leads || leads.length === 0) return [];
  
  const dates = {};
  leads.forEach(lead => {
    if (lead.createdAt) {
      const d = new Date(lead.createdAt).toISOString().split('T')[0];
      dates[d] = (dates[d] || 0) + 1;
    }
    if (lead.contactedAt) {
      const d = new Date(lead.contactedAt).toISOString().split('T')[0];
      dates[d] = (dates[d] || 0) + 1;
    }
    if (lead.meetingAt) {
      const d = new Date(lead.meetingAt).toISOString().split('T')[0];
      dates[d] = (dates[d] || 0) + 1;
    }
  });

  return Object.keys(dates).map(date => ({ date, count: dates[date] }));
};
