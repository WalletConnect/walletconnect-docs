import React from 'react';
import DocSidebar from '@theme-original/DocSidebar';
import Dropdown from '../Dropdown';
import '../../css/sidebar.css'
import { useLocation } from 'react-router-dom';
import { getItemInStorage } from '../Dropdown/utils';

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
        <FrameworksMenu/>
        <DocSidebar {...props} /></>
  );
}

const appKit_environments = ['react', 'next', 'vue', 'javascript', 'react-native', 'flutter', 'android', 'ios', 'unity']
const walletKit_environments = ['web', 'ios', 'android', 'react-native', 'c#']

const FrameworksMenu = ()=>{
  const initial_environment = getItemInStorage()
  console.log("initial_environment: ", initial_environment)

  const location = useLocation()

  if(location.pathname.includes("/appkit/overview") || location.pathname.includes("/walletkit/overview")){
    return
  }

  if(location.pathname.includes("/appkit/")){
    return <Dropdown list={appKit_environments} initial={appKit_environments.find(item => item === initial_environment)} />
  }

  if(location.pathname.includes("/walletkit/")){
    return <Dropdown list={walletKit_environments} initial={walletKit_environments.find(item => item === initial_environment)} />
  }
}