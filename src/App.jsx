// Import React Router wrapper for managing browser address state in single-page apps
import { BrowserRouter } from 'react-router-dom';

// Import the global Theme provider coordinating light/dark classes on HTML layouts
import { ThemeProvider } from './context/ThemeContext';

// Import the primary CRM leads database state provider containing lead updates logic
import { LeadProvider } from './context/LeadContext';

// Import authentication context provider
import { AuthProvider } from './context/AuthContext';

// Import our new route engine containing lazy loaded pages and fallback templates
import AppRoutes from './routes/index';

// Import toast notification container to fire UI warnings/success boxes in cards
import { Toaster } from 'react-hot-toast';

/**
 * App Root Component
 * Coordinates provider frameworks (Theme, CRM Data) and sets browser routing environments.
 */
function App() {
  return (
    // Wrap entire application inside the Theme Context provider
    <ThemeProvider>
      {/* Wrap client CRM databases provider containing mutations and items checklists */}
      <LeadProvider>
        {/* Wrap authentication provider to manage user session state */}
        <AuthProvider>
          {/*
            Declare client router state.
            BrowserRouter uses clean HTML5 history APIs to coordinate navigation paths.
          */}
          <BrowserRouter>
          {/* Mount the primary client routes engine containing child nodes definitions */}
          <AppRoutes />
          
          {/* 
            Setup global toast alert parameters.
            Renders notifications on bottom-right edges of pages during changes.
          */}
          <Toaster 
            position="bottom-right"
            toastOptions={{
              duration: 3500,
              style: {
                fontFamily: 'var(--font-sans)',
                fontSize: '13px'
              }
            }}
          />
          </BrowserRouter>
        </AuthProvider>
      </LeadProvider>
    </ThemeProvider>
  );
}

// Export the App component as default export for main.jsx to bootstrap
export default App;
