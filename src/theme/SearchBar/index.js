import '@markprompt/css'

import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import SearchBar from '@theme-original/SearchBar'
import React, { Suspense, lazy } from 'react'

// import Markprompt lazily as Docusaurus does not currently support ESM
const Markprompt = lazy(() => {
  return import('@markprompt/react').then(mod => ({
    default: mod.Markprompt
  }))
})

const markpromptConfigExtras = {
  references: {
    // References link mappings:
    getHref: reference => reference.file?.path,
    getLabel: reference => reference.meta?.leadHeading?.value || reference.file?.title
  },
  search: {
    // Search results link mappings:
    getHref: result => result.url,
    getHeading: result => result.hierarchy?.lvl0,
    getTitle: result => result.hierarchy?.lvl2,
    getSubtitle: result => null
  }
}

export default function SearchBarWrapper(props) {
  const { siteConfig } = useDocusaurusContext()
  const { projectKey, ...config } = siteConfig.themeConfig.markprompt

  config.references = markpromptConfigExtras.references
  config.search = { ...config.search, ...markpromptConfigExtras.search }

  return (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      {/* Docusaurus' version of `ReactDOMServer` doesn't support Suspense yet, so we can only render the component on the client. */}
      {typeof window !== 'undefined' && (
        <Suspense fallback={null}>
          <Markprompt projectKey={projectKey} {...config} />
        </Suspense>
      )}
    </div>
  )
}
