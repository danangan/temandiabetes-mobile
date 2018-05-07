export const randomizer = () => Math.floor((1 + Math.random()) * 0x100000000000).toString(16);

export const getInitialName = (name, defaultVal = 'NA') => {
  if (!name) return ''
  if (name === '') return defaultVal
  const split = name.split(' ')
  const initialName = split[0][0] + (split[1] ? split[1][0] : '')
  return initialName.toUpperCase()
}

export const dateFormatter = (date) => {
  if (!date) return ''
  date = new Date(date)
  // the month is added 1 because month is defined 0-11
  return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
}

// result is like result from lodash
export const result = (obj, prop, defaultVal = null) => {
  if(obj.hasOwnProperty(prop)) {
    return obj[prop]
  } else {
    return defaultVal
  }
}
