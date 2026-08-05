import React from 'react';
import { Users, DollarSign, Activity, TrendingUp } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import PipelineOverview from '../components/dashboard/PipelineOverview';
import RecentLeads from '../components/dashboard/RecentLeads';
import QuickActions from '../components/dashboard/QuickActions';
import { useLeads } from '../context/LeadContext';
import { useOutletContext, useNavigate } from 'react-router-dom';

/**
 * Dashboard page component combining stats, pipeline overview, recent leads, and quick actions.
 * 
 * @returns {JSX.Element} The rendered Dashboard page.
 */
const Dashboard = () => {
  const { leads } = useLeads();
  const { onOpenAddLead } = useOutletContext() || {};
  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-text">Workspace Dashboard</h1>
          <p className="text-sm sm:text-base text-text/60 mt-1">Review your startup pipeline conversions, recent activities, and metrics.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-sm text-text/80 shadow-sm whitespace-nowrap">
          <svg className="w-4 h-4 text-text/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Stats Cards - Responsive Grid: 1 col mobile, 2 col tablet, 4 col desktop */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6">
        <StatsCard 
          title="Total Leads" 
          value="1,248" 
          icon={Users} 
          change={12.5} 
          color="text-primary" 
        />
        <StatsCard 
          title="Pipeline Value" 
          value="$45,200" 
          icon={DollarSign} 
          change={8.2} 
          color="text-green-600" 
        />
        <StatsCard 
          title="Conversion Rate" 
          value="15.3%" 
          icon={Activity} 
          change={-2.4} 
          color="text-amber-500" 
        />
        <StatsCard 
          title="Active Proposals" 
          value="24" 
          icon={TrendingUp} 
          change={5.0} 
          color="text-purple-600" 
        />
      </div>

      {/* Bottom Section - 3 Columns for Pipeline Overview, Recent Leads, Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1 flex flex-col">
          <PipelineOverview leads={leads} />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <RecentLeads leads={leads} />
        </div>
        <div className="lg:col-span-1 flex flex-col">
          <QuickActions 
            onAddLead={onOpenAddLead}
            onViewAll={() => navigate('/leads')}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
