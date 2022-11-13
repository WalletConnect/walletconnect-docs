import React from "react";
import Box from './Box'

const CONSTANTS = [
  {
    name: "Sign",
    description: "Sign is a remote signer protocol to communicate securely between web3 wallets and dapps."
  },
  {
    name: "Auth",
    description: "Auth is an authentication protocol that can be used to log-in blockchain wallets into apps."
  },
  {
    name: "Push",
    description: "Chat is a direct messaging protocol that can enable wallets to message each other."
  },
  {
    name: "Chat",
    description: "Push is a push notification protocol that enables apps to notify users of both off-chain and on-chain events."
  }
]

export const Container = () => {
  return (
    <div className="container">
      {CONSTANTS.map((i)=>(
        <Box name={i.name} description={i.description} />
      ))}
    </div>
  );
};

export default Container;
