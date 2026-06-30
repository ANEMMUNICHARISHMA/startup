// Import React Router NavLink component to link paths and calculate active classes dynamically
import { NavLink } from 'react-router-dom';

// Import global theme context to swap light and dark variable states in layout containers
import { useTheme } from '../../context/ThemeContext';

// Import essential styling icons from Lucide package representing views and controls
import { 
  LayoutDashboard, 
  Users, 
  TrendingUp, 
  Sun, 
  Moon, 
  Sparkles,
  Settings,
  HelpCircle
} from 'lucide-react';

/**
 * Sidebar Component
 * Renders the primary navigation list on left edges of browser viewports.
 * Uses NavLink from react-router-dom to highlight active paths.
 */
export default function Sidebar({ isOpen, toggleSidebar }) {
  // Pull dark theme triggers and click actions from global state provider
  const { isDarkMode: isDark, toggleTheme } = useTheme();

  // Define navigation layout entries: name titles, router paths, and corresponding icons
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
  ];

  return (
    <aside
      // Manage responsive dimensions: remains static on tablet/desktop screens, drawer toggles on mobile
      className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col w-64 border-r border-slate-200 dark:border-slate-700 dark:border-slate-800/80 bg-slate-50 dark:bg-slate-900/90 dark:bg-[#0b0f19]/90 backdrop-blur-md transition-all duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header: Workspace identifier inspired by Notion layouts */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-slate-200 dark:border-slate-700 dark:border-slate-800/85">
        <div className="flex items-center gap-2.5">
          {/* Logo container holding visual sparkles symbol */}
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 dark:bg-blue-500 shadow-sm shadow-blue-500/20">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
          </div>
          <div>
            {/* Title headers */}
            <h2 className="font-display font-semibold text-sm text-slate-900 dark:text-white dark:text-slate-100 leading-tight">
              CRM Lite
            </h2>
            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 dark:text-slate-400">
              Acme Workspace
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Keyboard command visual hints */}
          <kbd className="hidden md:inline-flex items-center justify-center h-5 px-1.5 font-sans text-[10px] font-semibold text-slate-400 bg-slate-200/50 dark:bg-slate-800/50 border border-slate-300 dark:border-slate-700/60 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Navigation list containing links to page routing configurations */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 dark:text-slate-400">
          Core Views
        </div>
        
        {/* Render each navigation item dynamically using NavLink */}
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.name}
              to={item.path}
              // Hide mobile sidebar slide drawer upon page selection
              onClick={() => toggleSidebar(false)}
              // Function-based className to apply distinct styles when route is active
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-150 group relative ${
                  isActive
                    // Blue visual highlights for current active router path page view
                    ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 border border-blue-100/60 dark:border-blue-900/30'
                    // Slate muted highlights for inactive path navigation selections
                    : 'text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:bg-slate-800/50 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Dynamic icon mapping with hover scales and active color shifts */}
                  <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400 dark:text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:text-slate-300 dark:group-hover:text-slate-300'
                  }`} />
                  
                  {/* Text label */}
                  <span>{item.name}</span>
                  
                  {/* Active indicator dot rendered only when link route is currently matched */}
                  {isActive && (
                    <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-blue-400 shadow-sm shadow-blue-500/50" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* System Settings navigation grouping links */}
        <div className="pt-6 px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 dark:text-slate-400">
          System
        </div>
        
        {/* Mock settings trigger */}
        <a 
          href="#settings" 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:bg-slate-800/50 border border-transparent rounded-lg transition-colors group"
        >
          <Settings className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:text-slate-300 dark:group-hover:text-slate-300" />
          <span>Settings</span>
        </a>

        {/* Mock support and docs links */}
        <a 
          href="#help" 
          className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-slate-200 hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 dark:hover:bg-slate-800/50 border border-transparent rounded-lg transition-colors group"
        >
          <HelpCircle className="w-4 h-4 text-slate-400 dark:text-slate-500 dark:text-slate-400 group-hover:text-slate-600 dark:text-slate-300 dark:group-hover:text-slate-300" />
          <span>Support & Docs</span>
        </a>
      </nav>

      {/* Sidebar Footer containing global dark/light toggles */}
      <div className="p-3 border-t border-slate-200 dark:border-slate-700 dark:border-slate-800/80 bg-slate-100 dark:bg-slate-800/50 dark:bg-[#090d16]/30">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 dark:text-slate-400 hover:text-slate-900 dark:text-white dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 dark:border-slate-800 rounded-lg transition-all cursor-pointer"
        >
          <div className="flex items-center gap-2">
            {/* Conditional icon logic for light/dark settings */}
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-500 animate-spin-slow" />
                <span>Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-blue-600" />
                <span>Dark Mode</span>
              </>
            )}
          </div>
          {/* Muted indicator label */}
          <span className="text-[10px] text-slate-400 bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>
    </aside>
  );
}
