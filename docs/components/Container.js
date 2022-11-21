import React from "react";
import Box from './Box'

const CONSTANTS = [
  {
    name: "Sign",
    description: "Sign is a remote signer protocol to communicate securely between web3 wallets and dapps.",
    url: `/2.0/api/sign`
  },
  {
    name: "Auth",
    description: "Auth is an authentication protocol that can be used to log-in blockchain wallets into apps.",
    url: `/2.0/api/auth`
  },
  {
    name: "Push",
    description: "Push is a push notification protocol that enables apps to notify users of both off-chain and on-chain events.",
    url: `/2.0/api/push`
  },
  {
    name: "Chat",
    description: "Chat is a direct messaging protocol that can enable wallets to message each other.",
    url: `/2.0/api/chat`
  }
];

export const Container = (props) => {
  const items = props.items || CONSTANTS
  return (
    <div className="boxContainer">
      {items.map((product, i)=>(
        <Box name={product.name} description={product.description} url={product.url} key={i}/>
      ))}
    </div>
  );
};

export default Container;
