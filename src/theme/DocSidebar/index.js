import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import '../../css/sidebar.css'

export default function DocSidebarWrapper(props) {
  return (
    <>
    <li className="custom-list__logo">
    <a className="navbar__brand" href="/">
      <div className="navbar__logo menu__list-item-collapsible">
        <img src="/img/walletconnect-logo-white.svg#dark-mode-only"  alt="WalletConnect Logo"/>
          <img src="/img/walletconnect-logo-black.svg#light-mode-only"  alt="WalletConnect Logo"/>
        </div>WalletConnect<span>Docs</span>
        </a>
        </li>
        <DocSidebar {...props} />
    </>
  );
}