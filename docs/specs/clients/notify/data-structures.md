# Data Structures

## Notify Subscription

```jsonc
{
  "topic": string,
  "account": string,
  "relay": {
    "protocol": string,
    "data": string
  },  
  "metadata": Metadata,
  "scope": Record<string, {description: string, enabled: boolean}>,
  "expiry": number,
}
```

## Notify Message

```jsonc
{
  "title": string,
  "body": string,
  "icon": string,
  "url": string,
  "type": string
}
```

## Notify Message Record

```jsonc
{
  "id": string,
  "topic": string,
  "publishedAt": Int64,
  "message": NotifyMessage
}
```

## Notify Type

```jsonc
{
  "name": string,
  "description": string
}
```

## Notify Available Types

```jsonc
{
  "version": number,
  "lastModified": Int64,
  "types": NotifyType[]
}
```