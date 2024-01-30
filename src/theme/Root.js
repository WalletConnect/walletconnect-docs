import React from 'react'
import { DocsSidebarProvider } from '@docusaurus/theme-common/internal'

export default function Root({ children }) {
  return <DocsSidebarProvider>{children}</DocsSidebarProvider>
}
