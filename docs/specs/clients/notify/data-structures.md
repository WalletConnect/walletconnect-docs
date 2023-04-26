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
}
```

## Notify Message

```jsonc
{
  "title": string,
  "body": string,
  "icon": string,
  "url": string,
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
 
