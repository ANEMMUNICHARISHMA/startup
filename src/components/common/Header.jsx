import { 
  Menu, 
  Search, 
  Bell, 
  Plus, 
  SlidersHorizontal,
  ChevronDown
} from 'lucide-react';
import { useState } from 'react';
import { useLeads } from '../../context/LeadContext';

export default function Header({ toggleSidebar, onOpenAddLead, title }) {
  const { leads } = useLeads();
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-slate-200 dark:border-slate-800/80 bg-white/70 dark:bg-[#090d16]/75 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger toggle */}
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Dynamic Page Title */}
        <h1 className="font-display font-bold text-base text-slate-900 dark:text-slate-50">
          {title}
        </h1>
      </div>

      {/* Center - Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6 relative">
        <Search className="absolute left-3 w-4 h-4 text-slate-400 dark:text-slate-500 pointer-events-none" />
        <input
          type="text"
          placeholder="Search leads, companies, tasks..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-8.5 pl-9 pr-10 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 bg-slate-100/70 hover:bg-slate-100 dark:bg-slate-900/60 dark:hover:bg-slate-900 border border-transparent focus:border-blue-500 dark:focus:border-blue-600 rounded-lg outline-none transition-all"
        />
        <div className="absolute right-3 flex items-center gap-0.5">
          <kbd className="inline-flex items-center justify-center px-1 font-sans text-[10px] text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded shadow-xs">
            ⌘
          </kbd>
          <kbd className="inline-flex items-center justify-center px-1 font-sans text-[10px] text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/50 rounded shadow-xs">
            F
          </kbd>
        </div>
      </div>

      {/* Right - Profile & Global Actions */}
      <div className="flex items-center gap-3">
        {/* Notifications Button */}
        <button className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 relative group transition-colors">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-500 ring-2 ring-white dark:ring-[#090d16] animate-pulse" />
        </button>

        {/* Global Add Lead CTA button */}
        <button
          onClick={onOpenAddLead}
          className="flex items-center gap-1.5 h-8.5 px-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500 text-white font-medium text-xs rounded-lg shadow-sm shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-97 transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

        {/* Vertical divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-slate-800/80" />

        {/* Profile Card */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/30 p-1 rounded-lg transition-colors">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&width=100&auto=format&fit=crop"
              alt="User profile photo"
              className="w-7 h-7 rounded-full object-cover border border-slate-200 dark:border-slate-800"
            />
            <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-1.5 ring-white dark:ring-[#090d16]" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-slate-900 dark:text-slate-100 leading-none">
              Sophia M.
            </p>
            <span className="text-[9px] font-medium text-slate-400 dark:text-slate-500">
              Admin Owner
            </span>
          </div>
          <ChevronDown className="hidden lg:block w-3 h-3 text-slate-400" />
        </div>
      </div>
    </header>
  );
}
