import { useLeads } from '../context/LeadContext';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  CartesianGrid, 
  LineChart, 
  Line 
} from 'recharts';
import { 
  BarChart2, 
  PieChart as PieIcon, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Activity, 
  Zap 
} from 'lucide-react';

const COLORS = ['#2563EB', '#3B82F6', '#22C55E', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function Analytics() {
  const { leads } = useLeads();

  // Dynamic values
  const totalLeads = leads.length;
  const wonLeads = leads.filter(l => l.stage === 'Won');
  const lostLeads = leads.filter(l => l.stage === 'Lost');
  
  const totalPipelineValue = leads.reduce((sum, l) => sum + l.value, 0);
  const avgDealValue = totalLeads > 0 ? Math.round(totalPipelineValue / totalLeads) : 0;
  
  const closedCount = wonLeads.length + lostLeads.length;
  const conversionRate = closedCount > 0 ? Math.round((wonLeads.length / closedCount) * 100) : 0;
  
  const totalWonValue = wonLeads.reduce((sum, l) => sum + l.value, 0);
  
  // 1. Lead Sources data aggregation (Pie Chart)
  const sourceMap = leads.reduce((acc, lead) => {
    acc[lead.source] = (acc[lead.source] || 0) + 1;
    return acc;
  }, {});

  const sourceData = Object.entries(sourceMap).map(([name, value]) => ({
    name,
    value
  }));

  // 2. Stage Funnel data aggregation (Bar Chart)
  const funnelStages = ['New', 'Contacted', 'Qualified', 'Proposal', 'Won'];
  const funnelData = funnelStages.map((stage) => {
    const count = leads.filter(l => l.stage === stage).length;
    const value = leads.filter(l => l.stage === stage).reduce((sum, l) => sum + l.value, 0);
    return {
      name: stage,
      'Lead Count': count,
      'Deal Value ($)': value
    };
  });

  // 3. Team Owner Performance aggregation
  const owners = ['Alex Rivera', 'Sophia Martinez', 'Marcus Vance'];
  const teamPerformanceData = owners.map((owner) => {
    const ownerLeads = leads.filter(l => l.owner === owner);
    const wonValue = ownerLeads.filter(l => l.stage === 'Won').reduce((sum, l) => sum + l.value, 0);
    const pipelineValue = ownerLeads.reduce((sum, l) => sum + l.value, 0);
    return {
      name: owner.split(' ')[0], // First name
      Won: wonValue,
      Pipeline: pipelineValue
    };
  });

  return (
    <div className="space-y-6">
      {/* Metrics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Average Deal size</span>
            <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-xl font-display font-bold text-slate-900 dark:text-slate-50">${avgDealValue.toLocaleString()}</p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold block mt-1">Global average per active lead</span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Sales conversion</span>
            <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-xl font-display font-bold text-slate-900 dark:text-slate-50">{conversionRate}%</p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold block mt-1">Closed-won vs closed-lost</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Revenue Realized</span>
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-xl font-display font-bold text-slate-900 dark:text-slate-50">${totalWonValue.toLocaleString()}</p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold block mt-1">Sum of won contract value</span>
        </div>

        {/* KPI 4 */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Deals Tracked</span>
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 text-xl font-display font-bold text-slate-900 dark:text-slate-50">{totalLeads}</p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold block mt-1">Total leads count in CRM</span>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Funnel chart */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-5">
            <div>
              <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-slate-50">
                Funnel Conversion Volumetrics
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                Volume of deal contracts distributed across active stages
              </p>
            </div>
            <BarChart2 className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-64 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={funnelData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800/50" />
                <XAxis dataKey="name" stroke="#94A3B8" tickLine={false} />
                <YAxis stroke="#94A3B8" tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '10px', 
                    background: '#0f172a', 
                    border: '1px solid #1e293b', 
                    color: '#f8fafc',
                    fontSize: '11px'
                  }} 
                  formatter={(value) => [`$${value.toLocaleString()}`, 'Deal Value']}
                />
                <Bar dataKey="Deal Value ($)" fill="#2563EB" radius={[4, 4, 0, 0]}>
                  {funnelData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Channels Acquisition Doughnut */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-5">
            <div>
              <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-slate-50">
                Acquisition Channels (Sources)
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                Distribution of client leads by marketing channel
              </p>
            </div>
            <PieIcon className="w-4 h-4 text-slate-400" />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 h-64">
            <div className="w-1/2 h-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={sourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {sourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      borderRadius: '10px', 
                      background: '#0f172a', 
                      border: '1px solid #1e293b', 
                      color: '#f8fafc',
                      fontSize: '11px'
                    }} 
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom details legend list */}
            <div className="flex-1 w-full space-y-2 text-xs">
              {sourceData.map((data, index) => {
                const percentage = Math.round((data.value / totalLeads) * 100);
                return (
                  <div key={data.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                      <span className="text-slate-600 dark:text-slate-350 font-semibold">{data.name}</span>
                    </div>
                    <span className="font-medium text-slate-400 dark:text-slate-500">
                      {data.value} ({percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Team Performance Performance Compare Chart */}
        <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-slate-800/80 rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.02)] lg:col-span-2">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80 mb-5">
            <div>
              <h3 className="font-display font-semibold text-sm text-slate-900 dark:text-slate-50">
                Team Closing Performance
              </h3>
              <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">
                Comparing total revenue closed won vs pending pipeline by representative owner
              </p>
            </div>
            <Activity className="w-4 h-4 text-slate-400" />
          </div>

          <div className="h-68 w-full text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={teamPerformanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="dark:stroke-slate-800/50" />
                <XAxis dataKey="name" stroke="#94A3B8" tickLine={false} />
                <YAxis stroke="#94A3B8" tickLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '10px', 
                    background: '#0f172a', 
                    border: '1px solid #1e293b', 
                    color: '#f8fafc',
                    fontSize: '11px'
                  }} 
                  formatter={(value) => [`$${value.toLocaleString()}`, null]}
                />
                <Legend iconType="circle" />
                <Bar dataKey="Won" fill="#22C55E" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Pipeline" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
