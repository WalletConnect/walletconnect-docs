import React, { useEffect } from 'react'
import { DocsSidebarProvider } from '@docusaurus/theme-common/internal'

export default function Root({ children }) {
  useEffect(() => {
    // Need to replace the consent preferences button after render due
    // to the loading order of docusaurus scripts and footer tags.
    // The server rendered tags are present before the termly script
    // finishes loading. Making the tags not trigger the termly modal.
    setTimeout(() => {
      const termlyATag = document.createElement('a')
      termlyATag.href = '#'
      termlyATag.className = 'termly-display-preferences footer__link-item'
      termlyATag.innerHTML = 'Consent Preferences'
      document.getElementById('termly-display-preferences')?.parentElement.append(termlyATag)
      document.getElementById('termly-display-preferences')?.remove()
    }, 0)
  }, [])

  return (
    <>
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-5557TG59"
          height="0"
          width="0"
          style={{
            display: 'none',
            visibility: 'hidden'
          }}
        ></iframe>
      </noscript>
      <DocsSidebarProvider>{children}</DocsSidebarProvider>
    </>
  )
}
