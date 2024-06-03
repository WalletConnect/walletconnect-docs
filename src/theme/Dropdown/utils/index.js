const SELECTED_ENV_KEY = 'SELECTED_ENV_KIT'

export function setItemInStorage(item) {
  if (typeof window === 'undefined') return

  localStorage.setItem(SELECTED_ENV_KEY, item)
}

export function removeItemInStorage() {
  if (typeof window === 'undefined') return

  localStorage.removeItem(SELECTED_ENV_KEY)
}

export function getItemInStorage() {
  if (typeof window === 'undefined') return

  return localStorage.getItem(SELECTED_ENV_KEY)
}

export function parseEnvironment(env) {
  if (!env) return ''
  if (env.includes('-')) {
    const env_array = env.split('-')
    return env_array
      .map(item => {
        if (item === 'ios') {
          return 'iOS'
        }
        if(item === 'javascript'){
          return "JavaScript"
        }
        return capitalize(item)
      })
      .join(' ')
  }
  if (env === 'ios') {
    return 'iOS'
  }
  if(env === 'javascript'){
    return "JavaScript"
  }
  return capitalize(env)
}

function capitalize(item) {
  return item.charAt(0).toUpperCase() + item.slice(1)
}
