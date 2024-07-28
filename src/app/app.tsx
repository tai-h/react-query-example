import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Suspense, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // throwOnError: true,
      refetchOnWindowFocus: false,
      retry: false,
      staleTime: 1000 * 60,
    },
  },
});

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center w-screen h-screen">loading...</div>}>
      <QueryClientProvider client={queryClient}>
        {import.meta.env.DEV && <ReactQueryDevtools />}
        {children}
      </QueryClientProvider>
    </Suspense>
  );
};

const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      lazy: async () => {
        const { Home } = await import('@/features/Home');
        return { Component: Home };
      },
    },
    {
      path: '/fetch-example-1',
      lazy: async () => {
        const { FetchExample1 } = await import('@/features/FetchExample1');
        return { Component: FetchExample1 };
      },
    },
    {
      path: '/fetch-example-1-2',
      lazy: async () => {
        const { FetchExample1_2 } = await import('@/features/FetchExample1_2');
        return { Component: FetchExample1_2 };
      },
    },
    {
      path: '/fetch-example-2',
      lazy: async () => {
        const { FetchExample2 } = await import('@/features/FetchExample2');
        return { Component: FetchExample2 };
      },
    },
    {
      path: '/fetch-example-3',
      lazy: async () => {
        const { FetchExample3 } = await import('@/features/FetchExample3');
        return { Component: FetchExample3 };
      },
    },
    {
      path: '/tanstack-query-example-1',
      lazy: async () => {
        const { TanStackQueryExample1 } = await import('@/features/TanStackQueryExample1');
        return { Component: TanStackQueryExample1 };
      },
    },
    {
      path: '/suspense-example-1',
      lazy: async () => {
        const { SuspenseExample1 } = await import('@/features/SuspenseExample1');
        return { Component: SuspenseExample1 };
      },
    },
    {
      path: '/reducer-example-1',
      lazy: async () => {
        const { ReducerExample1 } = await import('@/features/ReducerExample1');
        return { Component: ReducerExample1 };
      },
    },
    {
      path: '/reducer-example-2',
      lazy: async () => {
        const { ReducerExample2 } = await import('@/features/ReducerExample2');
        return { Component: ReducerExample2 };
      },
    },
    {
      path: '/context-example-1',
      lazy: async () => {
        const { ContextExample1Provider } = await import('@/features/ContextExample1');
        return { Component: ContextExample1Provider };
      },
    },
  ]);
};

const AppRouter = () => {
  const router = useMemo(() => createRouter(), []);

  return <RouterProvider router={router} />;
};

export function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}

export default App;
