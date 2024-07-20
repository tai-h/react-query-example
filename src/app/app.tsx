import { Suspense, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense fallback={<div className="flex items-center justify-center w-screen h-screen">loading...</div>}>
      {children}
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
