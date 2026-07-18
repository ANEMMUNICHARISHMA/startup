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
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-border dark:border-border/80 bg-surface/70 dark:bg-[#090d16]/75 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger toggle */}
        <button
          onClick={toggleSidebar}
          aria-label="Toggle navigation menu"
          className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text/60 hover:text-text dark:hover:text-text/20 hover:bg-surface dark:hover:bg-slate-700 md:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>
        
        {/* Dynamic Page Title */}
        <h1 className="font-display font-bold text-base text-text dark:text-slate-50">
          {title}
        </h1>
      </div>

      {/* Center - Search Bar */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6 relative">
        <Search className="absolute left-3 w-4 h-4 text-text/50 dark:text-text/60 pointer-events-none" />
        <input
          type="text"
          placeholder="Search leads, companies, tasks..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="w-full h-8.5 pl-9 pr-10 text-xs text-text dark:text-text/20 placeholder-slate-400 dark:placeholder-slate-500 bg-surface/70 hover:bg-surface dark:hover:bg-slate-700 dark:bg-background/60 dark:hover:bg-background border border-transparent focus:border-primary dark:focus:border-primary rounded-lg outline-none transition-all"
        />
        <div className="absolute right-3 flex items-center gap-0.5">
          <kbd className="inline-flex items-center justify-center px-1 font-sans text-[10px] text-text/50 bg-surface dark:bg-surface border border-border dark:border-border/50 rounded shadow-xs">
            ⌘
          </kbd>
          <kbd className="inline-flex items-center justify-center px-1 font-sans text-[10px] text-text/50 bg-surface dark:bg-surface border border-border dark:border-border/50 rounded shadow-xs">
            F
          </kbd>
        </div>
      </div>

      <div className="flex md:hidden flex-1 justify-end mx-2">
        <button aria-label="Open search" className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text/60 hover:text-text hover:bg-surface/80 dark:hover:bg-slate-700">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Right - Profile & Global Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Notifications Button */}
        <button aria-label="View notifications" className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-text/60 hover:text-text hover:bg-surface/80 dark:hover:bg-slate-700 relative group transition-colors">
          <Bell className="w-5 h-5 md:w-4 md:h-4" />
          <span className="absolute top-2 right-2 md:top-1.5 md:right-1.5 w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary ring-2 ring-white dark:ring-[#090d16] animate-pulse" />
        </button>

        {/* Global Add Lead CTA button */}
        <button
          onClick={onOpenAddLead}
          className="flex items-center justify-center w-11 h-11 min-w-[44px] sm:w-auto sm:h-9 sm:px-3 gap-1.5 bg-primary hover:bg-primary dark:bg-primary dark:hover:bg-primary text-text font-medium text-xs rounded-lg shadow-sm shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-97 transition-all duration-150 cursor-pointer"
        >
          <Plus className="w-5 h-5 sm:w-3.5 sm:h-3.5" />
          <span className="hidden sm:inline">Add Lead</span>
        </button>

        {/* Vertical divider */}
        <div className="w-px h-6 bg-slate-200 dark:bg-surface/80" />

        {/* Profile Card */}
        <div className="flex items-center gap-2 cursor-pointer hover:bg-background dark:hover:bg-slate-700 dark:hover:bg-surface/30 p-1 min-w-[44px] min-h-[44px] rounded-lg transition-colors">
          <div className="relative flex items-center justify-center h-full w-full">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&width=100&auto=format&fit=crop"
              alt="User profile photo"
              className="w-8 h-8 md:w-7 md:h-7 rounded-full object-cover border border-border dark:border-border"
            />
            <div className="absolute bottom-1 right-1 md:bottom-0 md:right-0 w-2.5 h-2.5 md:w-2 md:h-2 rounded-full bg-emerald-500 ring-1.5 ring-white dark:ring-[#090d16]" />
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-semibold text-text dark:text-text/20 leading-none">
              Sophia M.
            </p>
            <span className="text-[9px] font-medium text-text/50 dark:text-text/60">
              Admin Owner
            </span>
          </div>
          <ChevronDown className="hidden lg:block w-3 h-3 text-text/50" />
        </div>
      </div>
    </header>
  );
}
