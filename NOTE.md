# NOTE

[bulletproof-react](https://github.com/alan2207/bulletproof-react) を参考に作成

参考）

- [本気で考える React のベストプラクティス！bulletproof-react2022](https://zenn.dev/t_keshi/articles/bulletproof-react-2022)

## tsconfig.json

以下の設定を追加

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

これにより、`@` から始まるパスでインポートすることが可能となる。

```tsx
import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';
```

## Routing

```sh
npm install react-router-dom
```

```tsx
import { Suspense, useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          loading...
        </div>
      }
    >
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
```

## lazyImport

```tsx
const { Home } = lazyImport(() => import('@/features/Home'), 'Home');
const { About } = lazyImport(() => import('@/features/About'), 'About');

const routes = [{ path: '/', element: <Home /> }];
```
