export const convertOptionsToHashKey = ({skip, limit}: {skip: number, limit: number}) => {
  return `skip<${skip}>-limit<${limit}>`
}