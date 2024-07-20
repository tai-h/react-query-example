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
