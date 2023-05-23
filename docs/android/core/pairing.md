import IframeComponent from '../../components/IframeComponent';

# Pairing Client
Pairing API is a lightweight api for establishing an encrypted, protocol agnostic communication layer between peers. It's purpose is to provide a secure channel for proposing protocols or sending requests. The Pairing api can be accessed through the Core Client

#
### **Create Pairing**

```kotlin
val pairing: Pairing? = CoreClient.Pairing.create() { error -> }
```
When first establishing a pairing with a Peer, call `CoreClient.Pairing.create`. This will try and generate a new pairing with a URI parameter that can be used to establish a connection with the other Peer as well as other meta data related to the pairing.

#
### **Pair Clients**

```kotlin
val pairingParams = Core.Params.Pair(pairingUri)
CoreClient.Pairing.pair(pairingParams) { error -> }
```

To pair the wallet with the Dapp, call the CoreClient.Pairing's pair function which needs a `Core.Params.Pair` parameter. `Core.Params.Pair` is where the WC Uri will be passed.

#
### **Get List of Active Pairings**

```kotlin
val listOfActivePairings: List<Core.Model.Pairing> = CoreClient.Pairing.getPairings()
```

To get a list of the most current active pairings, call `CoreClient.Pairing.getPairings()` which will return a list of type `Core.Model.Pairing`.

#
### **Disconnect a Pairing**

```kotlin
CoreClient.Pairing.disconnect(topic = /*Pairing topic*/") { error -> }
```

To disconnect from a pairing, just pass the topic of the pairing to disconnect from (use `getPairings()` to get a list of all active pairings and their topics). 

<IframeComponent />
