# Storage API

```typescript
export abstract class IKeyValueStorage {
  public abstract getKeys(): Promise<string[]>;
  public abstract getEntries<T = any>(): Promise<[string, T][]>;
  public abstract getItem<T = any>(key: string): Promise<T | undefined>;
  public abstract setItem<T = any>(key: string, value: T): Promise<void>;
  public abstract removeItem(key: string): Promise<void>;

  // Emitted when a key is created, updated, or deleted
  public abstract on<T = any>("create", (key: string, value: T) => {}): void;
  public abstract on<T = any>("update", (key: string, value: T) => {}): void;
  public abstract on<T = any>("delete", (key: string, value: T) => {}): void;

  // Emitted when the store is persisted to disk
  public abstract on("sync", () => {}): void;
}
```
