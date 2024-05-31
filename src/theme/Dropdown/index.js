import { useState } from 'react'
import { useLocation, useHistory } from "react-router-dom"
import s from './styles.module.css'
import { parseEnvironment, setItemInStorage } from './utils'

/**
 * This Dropdown Menu is meant to be for a list of Frameworks and Programming languages.
 *  The selected item will mutate the current URL
 */
export default function Dropdown({ list, initial }){
  
  const location = useLocation()
  const history = useHistory()

  const [selected, setSelected] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  if(!selected){
    if(initial){
      setSelected(initial)
    }else{
      const environment = list.find(item => location.pathname.includes(item))
      console.log("ASDASDASD: ", environment)
      if(!environment){
        throw Error("The current path doesn't contain any environment.")
      }
      setSelected(environment)
    }
  }

  function handleItem(new_environment){
    const current_environment = list.find(item => location.pathname.includes(item))
    if(!current_environment){
      throw Error("The current path doesn't contain any environment.")
    }
    setSelected(new_environment)
    setItemInStorage(new_environment)
    const new_path = location.pathname.replace(current_environment, new_environment)
    
    history.push(new_path)
  }
  
  return (
    <div className={s.container} >
      <button onClick={()=>setIsOpen(p => !p)} >{parseEnvironment(selected)}</button>
      <div className={[!isOpen && s.kill, s.dropdownContainer].join(" ")}>
        {list.map(item =><span className={s.item} onClick={()=>handleItem(item)} >{parseEnvironment(item)}</span>)}
      </div>
    </div>
  )
}