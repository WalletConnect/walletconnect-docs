import React from 'react'
import { DocsSidebarProvider } from '@docusaurus/theme-common/internal'

export default function Root({ children }) {
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
