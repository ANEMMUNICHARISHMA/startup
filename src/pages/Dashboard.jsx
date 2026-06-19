import React from 'react';
import { Users, TrendingUp, DollarSign, Target } from 'lucide-react';
import { StatsCard } from '../components/dashboard/StatsCard';
import { PipelineOverview } from '../components/dashboard/PipelineOverview';
import { RecentLeads } from '../components/dashboard/RecentLeads';
import { QuickActions } from '../components/dashboard/QuickActions';

/**
 * Main Dashboard page component combining all dashboard widgets.
 * Uses sample data for initial UI build.
 *
 * @returns {JSX.Element} The Dashboard page component
 */
export default function Dashboard() {
  // Sample data to be replaced with real data in Phase 8
  const sampleLeads = [
    { id: '1', name: 'Alice Freeman', company: 'Acme Corp', status: 'New', dateAdded: '2026-06-19T10:00:00Z' },
    { id: '2', name: 'Bob Smith', company: 'TechFlow', status: 'Contacted', dateAdded: '2026-06-18T14:30:00Z' },
    { id: '3', name: 'Charlie Davis', company: 'Nexus Inc', status: 'Qualified', dateAdded: '2026-06-17T09:15:00Z' },
    { id: '4', name: 'Diana Prince', company: 'Themyscira LLC', status: 'Proposal', dateAdded: '2026-06-16T16:45:00Z' },
    { id: '5', name: 'Evan Wright', company: 'Global Logistics', status: 'Won', dateAdded: '2026-06-15T11:20:00Z' },
    { id: '6', name: 'Fiona Gallagher', company: 'Shameless Tech', status: 'New', dateAdded: '2026-06-19T12:00:00Z' },
    { id: '7', name: 'George Miller', company: 'Mad Max Motors', status: 'Qualified', dateAdded: '2026-06-18T08:00:00Z' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* Header Section */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 mt-1">Welcome back, here's what's happening with your pipeline today.</p>
        </div>

        {/* Stats Row - Responsive Grid: 1 col on mobile, 2 on tablet, 4 on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard 
            title="Total Leads" 
            value="248" 
            icon={<Users className="text-blue-600" size={24} />} 
            change={12.5} 
            color="bg-blue-600" 
          />
          <StatsCard 
            title="Active Pipeline" 
            value="$45,200" 
            icon={<TrendingUp className="text-amber-500" size={24} />} 
            change={8.2} 
            color="bg-amber-500" 
          />
          <StatsCard 
            title="Closed Won" 
            value="$128,500" 
            icon={<DollarSign className="text-green-500" size={24} />} 
            change={23.1} 
            color="bg-green-500" 
          />
          <StatsCard 
            title="Win Rate" 
            value="32%" 
            icon={<Target className="text-indigo-500" size={24} />} 
            change={-2.4} 
            color="bg-indigo-500" 
          />
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (takes up 2/3 on desktop) */}
          <div className="lg:col-span-2 space-y-6">
            <PipelineOverview leads={sampleLeads} />
            <RecentLeads leads={sampleLeads} />
          </div>

          {/* Right Column (takes up 1/3 on desktop) */}
          <div className="space-y-6">
            <QuickActions />
          </div>
        </div>

      </div>
    </div>
  );
}
