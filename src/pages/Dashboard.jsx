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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-text">Dashboard</h1>
        <p className="text-sm sm:text-base text-text/60 mt-1">Welcome back! Here's what's happening with your leads today.</p>
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

      {/* Middle Section - Pipeline Overview and Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        <div className="lg:col-span-2">
          <PipelineOverview leads={leads} />
        </div>
        <div className="lg:col-span-1">
          <QuickActions 
            onAddLead={onOpenAddLead}
            onViewAll={() => navigate('/leads')}
          />
        </div>
      </div>

      {/* Bottom Section - Recent Leads */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6">
        <RecentLeads leads={leads} />
      </div>
    </div>
  );
};

export default Dashboard;
