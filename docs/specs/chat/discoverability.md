# Discoverability

One of the most important features of the user experience is that two participants can exchange messages by simply discovering their peer's public key and below we will described three different mechanisms to exchange them both privately and publicly.

In scenarios 1 and 2 we describe how public keys can be found publicly and in scenario 3 we describe how public keys can be exchanged privately

In any scenario, the proposer never needs to exchange their public key to its peer to create a chat thread but in scenarios 1 and 2 it assumes the proposer has prior knowledge of its peer blockchain account.

## Scenario 1 - A finds B's public key through the default keyserver

In this scenario, it is assumed that A has knowledge of B's blockchain account.

If B has not registered in the default keyserver then A would not be able to find its public key to invite to chat.

If B has already registered in the default keyserver then A would retrieve its public key to invite to chat.

Thus A can query the default keyserver using the resolve() method to get B's public key.

## Scenario 2 - A finds B's public key through the ENS domain

In this scenario, it is assumed that A has knowledge of B's blockchain account.

If B has not setup his ENS domain to map the chat public key then A would not be able to find its public key to invite to chat.

If B has already setup his ENS domain to map the chat public key then A would retrieve its public key to invite to chat.

Thus A can query the ENS domain and resolve the mapping to the chat public key

## Scenario 3 - B shares public key with A through the qrcode

In this scenario, it is assumed that A does not have knowledge of B's blockchain account.

We assume that A and B have other means of communication such as a face-to-face interaction or an online video call where they can exchange a qrcode to send a chat invite to each other.

Thus A can scan the qrcode provided by B to retrieve blockchain account and public key
