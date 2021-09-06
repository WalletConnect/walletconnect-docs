# Glossary

## Expiry

Expiry refers to the timestamp when the sequence is deleted.  

Whenever the responder settles the sequence it calculates the expiry by adding the TTL to the current timestamp. The proposer would then use the expiry calculated by the responder.

Expiry times are always represented in seconds.

## Time to Live (TTL)

Time to live (TTL) refers to the maximum duration for a sequence to live.

TTL plus the current timestamp is used to calculate the expiry timestamp.

TTL times are always represented in seconds.