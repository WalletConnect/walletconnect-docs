import React from 'react'
import { useNavbarSecondaryMenu } from '@docusaurus/theme-common/internal'
import { FrameworksMenu } from '@site/src/theme/DocSidebar'

export default function NavbarMobileSidebarSecondaryMenu() {
  const secondaryMenu = useNavbarSecondaryMenu()
  return (
    <>
      <FrameworksMenu />
      {secondaryMenu.content}
    </>
  )
}
