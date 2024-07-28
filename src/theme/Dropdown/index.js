import { useState, useRef, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import s from './styles.module.css'
import { getEnvFromCurrentPath, isIconWhite, parseEnvironment } from './utils'
import { env_icons } from './icons'

/**
 * This Dropdown Menu is meant to be for a list of Frameworks and Programming languages.
 *  The selected item will mutate the current URL
 */
export default function Dropdown({ list, isWalletKit }) {
  const location = useLocation()
  const history = useHistory()

  const [selected, setSelected] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  if (!selected) {
    if (typeof window === 'undefined') return true
    const environment = getEnvFromCurrentPath(list)
    if (!environment) {
      throw Error("The current path doesn't contain any environment.")
    }
    setSelected(environment)
  }

  function handleItem(new_environment) {
    const current_environment = getEnvFromCurrentPath(list)
    if (!current_environment) {
      throw Error("The current path doesn't contain any environment.")
    }
    setSelected(new_environment)
    setIsOpen(false)
    const new_path =
      location.pathname.slice(0, location.pathname.indexOf(current_environment)) +
      new_environment +
      `${isWalletKit ? '/installation' : '/core/installation'}`

    history.push(new_path)
  }

  const menuRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  return (
    <div className={s.container} ref={menuRef}>
      <div className={s.dropdownButton} onClick={() => setIsOpen(p => !p)}>
        <img
          className={`${s.envIcon} ${isIconWhite(selected) && s.invertOnLightMode}`}
          src={env_icons[selected]}
          alt={selected}
        />
        {parseEnvironment(selected)}
        <span className={`${s.dropdownArrow} ${isOpen && s.rotateArrow}`} />
      </div>
      {isOpen && (
        <div className={`${s.dropdownContainer} ${isWalletKit && s.walletKit}`}>
          {list
            .filter(i => i !== selected)
            .map(item => (
              <span className={s.item} onClick={() => handleItem(item)}>
                <img
                  className={`${s.envIcon} ${isIconWhite(item) && s.invertOnLightMode}`}
                  src={env_icons[item]}
                  alt={item}
                />
                {parseEnvironment(item)}
              </span>
            ))}
        </div>
      )}
    </div>
  )
}
