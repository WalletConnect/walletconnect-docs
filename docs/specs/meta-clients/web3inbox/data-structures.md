# Data Structures

```typescript
// Read more: https://rxjs.dev/guide/observer
interface Observer<TObservedValue> {
  next: (val: TObservedValue) => void
  error?: (error: Error) => void
  complete?: () => void
}
```
