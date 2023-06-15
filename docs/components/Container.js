import React from 'react'
import Box from './Box'

export const Container = props => {
  return (
    <div className="boxContainer">
      {props.items.map((product, i) => (
        <Box name={product.name} description={product.description} url={product.url} key={i} />
      ))}
    </div>
  )
}

export default Container
