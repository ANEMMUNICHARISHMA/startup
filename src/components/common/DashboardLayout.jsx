import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import LeadModal from '../leads/LeadModal';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const location = useLocation();

  // Determine page title based on path
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/':
        return 'CRM Overview';
      case '/leads':
        return 'Leads Database';
      case '/analytics':
        return 'Performance Analytics';
      default:
        return 'CRM Workspace';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#090d16] transition-colors duration-200">
      {/* Sidebar navigation */}
      <Sidebar isOpen={sidebarOpen} toggleSidebar={setSidebarOpen} />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
        <Header 
          title={getPageTitle()}
          toggleSidebar={() => setSidebarOpen(true)} 
          onOpenAddLead={() => setIsAddLeadOpen(true)} 
        />
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden">
          <div className="max-w-7xl mx-auto space-y-6 fade-enter fade-enter-active">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Global Add Lead Modal Overlay */}
      {isAddLeadOpen && (
        <LeadModal 
          isOpen={isAddLeadOpen} 
          onClose={() => setIsAddLeadOpen(false)} 
        />
      )}
    </div>
  );
}
