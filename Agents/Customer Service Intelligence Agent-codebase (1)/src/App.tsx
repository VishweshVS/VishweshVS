import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { Layout } from '@/components/layout/Layout';
import { LoadingState } from '@/components/ui/LoadingSpinner';
import { Dashboard } from '@/pages/Dashboard';
import { Tickets } from '@/pages/Tickets';
import { Analytics } from '@/pages/Analytics';
import { Recommendations } from '@/pages/Recommendations';
import { Alerts } from '@/pages/Alerts';
import { Feedback } from '@/pages/Feedback';
import { useCurrentUser } from '@/hooks/useAuth';
import { queryClient } from '@/services/api';

function AppContent() {
  const { data: user, isLoading, error } = useCurrentUser();

  // Setup console logging for iframe communication
  useEffect(() => {
    ["log", "warn", "error"].forEach((level) => {
      const original = console[level as keyof Console] as (...args: any[]) => void;

      console[level as keyof Console] = (...args: any[]) => {
        // keep normal console output
        original.apply(console, args);

        // sanitize args for postMessage
        const safeArgs = args.map((a) => {
          if (a instanceof Error) {
            return {
              message: a.message,
              stack: a.stack,
              name: a.name,
            };
          }
          try {
            JSON.stringify(a);
            return a;
          } catch {
            return String(a);
          }
        });

        try {
          window.parent?.postMessage(
            { type: "iframe-console", level, args: safeArgs },
            "*"
          );
        } catch (e) {
          // use original, not the wrapped one (avoid recursion)
          original("Failed to postMessage:", e);
        }
      };
    });

    // Global error handler
    window.onerror = (msg, url, line, col, error) => {
      window.parent?.postMessage(
        {
          type: "iframe-console",
          level: "error",
          args: [
            msg,
            url,
            line,
            col,
            error ? { message: error.message, stack: error.stack } : null,
          ],
        },
        "*"
      );
    };

    // Unhandled promise rejections
    window.onunhandledrejection = (event) => {
      const reason =
        event.reason instanceof Error
          ? { message: event.reason.message, stack: event.reason.stack }
          : event.reason;

      window.parent?.postMessage(
        {
          type: "iframe-console",
          level: "error",
          args: ["Unhandled Promise Rejection:", reason],
        },
        "*"
      );
    };
  }, []);

  if (isLoading) {
    return <LoadingState message="Loading application..." />;
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
            Failed to load user data
          </h1>
          <p className="text-gray-600">Please refresh the page to try again</p>
        </div>
      </div>
    );
  }

  return (
    <Layout user={user}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tickets" element={<Tickets />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/feedback" element={<Feedback />} />
      </Routes>
    </Layout>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <AppContent />
        </Router>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}