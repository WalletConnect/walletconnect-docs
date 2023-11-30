import React from 'react'
import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'

const typeToImageMap = {
  react: 'assets/home/reactLogo.png',
  nextjs: 'assets/home/nextjsLogo.png',
  vue: 'assets/home/vueLogo.png',
  javascript: 'assets/home/javascriptLogo.png',
  ios: 'assets/home/iosLogo.png',
  android: 'assets/home/androidLogo.png',
  rn: 'assets/home/rnLogo.png',
  web: 'assets/home/webLogo.png',
  flutter: 'assets/home/flutterLogo2.png',
  csharp: 'assets/home/unityLogo.png'
}

export const Card = ({ title, description, links, product, children, image }) => {
  return (
    <div className={`gs__wrapper gs__wrapper--${product}`}>
      <div className="gs__text-container">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="gs__text">{children}</div>
      <div className="gs__platform__wrapper">
        {links.map(({ type, url }) => (
          <Link key={type} className="gs__platform" to={useBaseUrl(url)}>
            <img
              className="gs__platform--image"
              src={useBaseUrl(typeToImageMap[type])}
              alt={`${type} logo`}
            />
          </Link>
        ))}
      </div>
      <img className="gs__image" src={useBaseUrl(image)} alt="cloud illustration" />
    </div>
  )
}

export default Card
