# Data Structures

## Push Subscription

```jsonc
{
  "topic": string,
  "account": string,
  "relay": {
    "protocol": string,
    "data": string
  },  
  "metadata": Metadata,
  "scope": [string: bool],
  "expiry": Int64,
}
```

## Push Message

```jsonc
{
  "title": string,
  "body": string,
  "icon": string,
  "url": string,
  "type": string
}
```

## Push Message Record

```jsonc
{
  "id": string,
  "topic": string,
  "publishedAt": Int64,
  "message": PushMessage
}
```
 
