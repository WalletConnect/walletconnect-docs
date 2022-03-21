# Interfaces

## _ClientOptions_

| Name           | Type                                              | Required | Default |
| -------------- | ------------------------------------------------- | -------- | ------- |
| name           | `string`                                          | No       | TODO    |
| projectId      | `string`                                          | No       | TODO    |
| controller     | `boolean`                                         | No       | TODO    |
| metadata       | [AppMetadata](#appmetadata)                       | No       | TODO    |
| relayUrl       | `string`                                          | No       | TODO    |
| logger         | `string` / `Logger`                               | No       | TODO    |
| keychain       | [IKeychain](#ikeychain)                           | No       | TODO    |
| storage        | [IKeyValueStorage](#ikeyvaluestorage)             | No       | TODO    |
| storageOptions | [KeyValueStorageOptions](#keyvaluestorageoptions) | No       | TODO    |

## _AppMetadata_

| Name        | Type       | Required | Default |
| ----------- | ---------- | -------- | ------- |
| name        | `string`   | TODO     | TODO    |
| description | `string`   | TODO     | TODO    |
| url         | `string`   | TODO     | TODO    |
| icons       | `string[]` | TODO     | TODO    |

## _IKeychain_

| Name     | Description                                                        | Required | Default | Type |
| -------- | ------------------------------------------------------------------ | -------- | ------- | ---- |
| client   | `Client`                                                           | TODO     | TODO    | TODO |
| logger   | `Logger`                                                           | TODO     | TODO    | TODO |
| keychain | `Map<string, string>`                                              | TODO     | TODO    | TODO |
| name     | `string`                                                           | TODO     | TODO    | TODO |
| context  | `string`                                                           | TODO     | TODO    | TODO |
| init     | [Method](/javascript/walletconnect/reference/methods#keychaininit) | TODO     | TODO    | TODO |
| has      | [Method](/javascript/walletconnect/reference/methods#keychainhas)  | TODO     | TODO    | TODO |
| set      | [Method](/javascript/walletconnect/reference/methods#keychainset)  | TODO     | TODO    | TODO |
| get      | [Method](/javascript/walletconnect/reference/methods#keychainget)  | TODO     | TODO    | TODO |
| del      | [Method](/javascript/walletconnect/reference/methods#keychaindel)  | TODO     | TODO    | TODO |

## _IKeyValueStorage_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _KeyValueStorageOptions_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _JsonRpcPayload_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.ApproveParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.ConnectParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.DisconnectParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.ExtendParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.NotifyParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.PairParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.PingParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.RejectParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.RequestParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.RespondParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.UpdateParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _ClientTypes.UpgradeParams_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _PairingTypes.Settled_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _SessionTypes.Settled_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |

## _CryptoTypes.Participant_

| Name | Description | Required | Default | Type |
| ---- | ----------- | -------- | ------- | ---- |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
| TODO | TODO        | TODO     | TODO    | TODO |
