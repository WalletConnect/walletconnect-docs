import React from 'react';
import { DocsSidebarProvider } from '@docusaurus/theme-common/internal';
// Default implementation, that you can customize
export default function Root({children}) {
  return <DocsSidebarProvider>{children}</DocsSidebarProvider>;
}