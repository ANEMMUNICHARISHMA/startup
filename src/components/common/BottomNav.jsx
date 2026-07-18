import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, TrendingUp } from 'lucide-react';

export default function BottomNav() {
  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Leads', path: '/leads', icon: Users },
    { name: 'Analytics', path: '/analytics', icon: TrendingUp },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around h-16 bg-surface dark:bg-background border-t border-border dark:border-border md:hidden pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        return (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center min-w-[44px] min-h-[44px] w-full h-full space-y-1 ${
                isActive
                  ? 'text-primary dark:text-primary'
                  : 'text-text/60 hover:text-text dark:hover:text-text/30'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon className={`w-6 h-6 ${isActive ? 'text-primary dark:text-primary' : ''}`} />
                <span className="text-[10px] font-medium sr-only sm:not-sr-only">{item.name}</span>
              </>
            )}
          </NavLink>
        );
      })}
    </nav>
  );
}
