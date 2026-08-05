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
  HelpCircle,
  LogOut
} from 'lucide-react';

// Import useAuth to access logout functionality
import { useAuth } from '../../hooks/useAuth';

/**
 * Sidebar Component
 * Renders the primary navigation list on left edges of browser viewports.
 * Uses NavLink from react-router-dom to highlight active paths.
 */
export default function Sidebar({ isOpen, toggleSidebar }) {
  // Pull dark theme triggers and click actions from global state provider
  const { isDarkMode: isDark, toggleTheme } = useTheme();
  const { logout } = useAuth();

  // Define navigation layout entries: name titles, router paths, and corresponding icons
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
  ];

  return (
    <aside
      // Manage responsive dimensions: remains static on tablet/desktop screens, drawer toggles on mobile
      className={`fixed top-0 bottom-0 left-0 z-40 flex flex-col w-64 border-r border-border dark:border-border/80 bg-background/90 dark:bg-background/90 backdrop-blur-md transition-all duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header: Workspace identifier inspired by Notion layouts */}
      <div className="flex items-center justify-between h-14 px-4 border-b border-border dark:border-border/85">
        <div className="flex items-center gap-2.5">
          {/* Logo container holding visual sparkles symbol */}
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary dark:bg-primary shadow-sm shadow-blue-500/20">
            <Sparkles className="w-4 h-4 text-text animate-pulse" />
          </div>
          <div>
            {/* Title headers */}
            <h2 className="font-display font-semibold text-sm text-text dark:text-text/20 leading-tight">
              Startup CRM LITE
            </h2>
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Keyboard command visual hints */}
          <kbd className="hidden md:inline-flex items-center justify-center h-5 px-1.5 font-sans text-[10px] font-semibold text-text/50 bg-slate-200/50 dark:bg-surface/50 border border-border dark:border-border/60 rounded">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Navigation list containing links to page routing configurations */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        <div className="px-2 mb-2 text-[10px] font-semibold uppercase tracking-wider text-text/50 dark:text-text/60">
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
                    ? 'text-primary dark:text-primary bg-primary/10 dark:bg-blue-950/40 border border-blue-100/60 dark:border-blue-900/30'
                    // Slate muted highlights for inactive path navigation selections
                    : 'text-text/70 dark:text-text/40 dark:text-text/50 hover:text-text dark:hover:text-text/30 hover:bg-surface dark:hover:bg-slate-700 dark:hover:bg-surface/50 border border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* Dynamic icon mapping with hover scales and active color shifts */}
                  <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-105 ${
                    isActive ? 'text-primary dark:text-primary' : 'text-text/50 dark:text-text/60 group-hover:text-text/70 dark:text-text/40 dark:group-hover:text-text/40'
                  }`} />
                  
                  {/* Text label */}
                  <span>{item.name}</span>
                  
                  {/* Active indicator dot rendered only when link route is currently matched */}
                  {isActive && (
                    <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-primary dark:bg-blue-400 shadow-sm shadow-blue-500/50" />
                  )}
                </>
              )}
            </NavLink>
          );
        })}

        {/* Logout Action */}
        <button 
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2 mt-4 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 border border-transparent rounded-lg transition-colors group cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-red-500 dark:text-red-400 group-hover:text-red-600 dark:group-hover:text-red-300" />
          <span>Logout</span>
        </button>
      </nav>

      {/* Sidebar Footer containing global dark/light toggles */}
      <div className="p-3 border-t border-border dark:border-border/80 bg-surface/50 dark:bg-background/30">
        <button
          onClick={toggleTheme}
          className="flex items-center justify-between w-full px-3 py-2 text-xs font-medium text-text/70 dark:text-text/40 dark:text-text/50 hover:text-text dark:hover:text-text/30 hover:bg-surface/60/50 dark:hover:bg-surface/80 border border-border/80 dark:border-border rounded-lg transition-all cursor-pointer"
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
                <Moon className="w-3.5 h-3.5 text-primary" />
                <span>Dark Mode</span>
              </>
            )}
          </div>
          {/* Muted indicator label */}
          <span className="text-[10px] text-text/50 bg-slate-200 dark:bg-surface px-1.5 py-0.5 rounded">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </button>
      </div>
    </aside>
  );
}
