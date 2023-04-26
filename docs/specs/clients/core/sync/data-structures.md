# Data Structures

## Store Update

```typescript
type StoreUpdate = StoreSet | StoreDelete
```

## Store Set

``` typescript
interface StoreSet {
  id: number,
  key: string,
  value: string
}
```

## Store Delete

```typescript
interface StoreDelete {
  id: number,
  key: string
}
```

## Store State

```typescript
// key (string), value(string)
type StoreState = Map<string, string>
```

## Store Map

```typescript
// store (string), state(StoreState)
type StoreMap = Map<string, StoreState>
```
