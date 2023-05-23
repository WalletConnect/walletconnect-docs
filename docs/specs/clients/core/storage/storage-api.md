import IframeComponent from '../../../../components/IframeComponent';

# Storage API

```typescript
export abstract class IKeyValueStorage {
  public abstract getKeys(): Promise<string[]>;
  public abstract getEntries<T = any>(): Promise<[string, T][]>;
  public abstract getItem<T = any>(key: string): Promise<T | undefined>;
  public abstract setItem<T = any>(key: string, value: T): Promise<void>;
  public abstract removeItem(key: string): Promise<void>;
}
```

<IframeComponent />
