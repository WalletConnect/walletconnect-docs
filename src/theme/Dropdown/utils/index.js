export function parseEnvironment(env) {
  if (!env) return ''
  if (env === 'c-sharp') {
    return 'C#'
  }
  if (env === 'ios') {
    return 'iOS'
  }
  if (env === 'javascript') {
    return 'JavaScript'
  }
  if (env.includes('-')) {
    const env_array = env.split('-')
    return env_array
      .map(item => {
        if (item === 'ios') {
          return 'iOS'
        }
        if (item === 'javascript') {
          return 'JavaScript'
        }
        return capitalize(item)
      })
      .join(' ')
  }
  return capitalize(env)
}

function capitalize(item) {
  return item.charAt(0).toUpperCase() + item.slice(1)
}

export function isIconWhite(icon) {
  if (icon === 'ios' || icon === 'next' || icon === 'unity') return true
}

export function getEnvFromCurrentPath(list) {
  if (location.pathname.includes('react-native')) {
    return 'react-native'
  } else {
    return list.find(item => location.pathname.includes(item))
  }
}
