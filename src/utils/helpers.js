export const randomizer = () => {
  return Math.floor((1 + Math.random()) * 0x100000000000).toString(16)
}

export const getInitialName = (name) => {
  const split = name.split(' ')
  const initialName = split[0][0] + (split[1] ? split[1][0] : '')
  return initialName.toUpperCase()
}
