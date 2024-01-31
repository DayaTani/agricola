import Farmer from '../types/farmer'

/**
 * Retrieves a list of farmers based on specified parameters, including offset and limit.
 *
 * @param farmers - An array of Farmer objects representing the list of farmers.
 * @param paramsDictionary - A dictionary containing request parameters.
 * @returns An array of farmers based on the specified parameters.
 */
const listFarmers = (farmers: Farmer[], paramsDictionary: Record<string, string>): Farmer[] => {
  /** The offset value used for pagination. */
  let offset: number

  /** The maximum number of items to retrieve. */
  let limit: number

  /** The parsed offset value obtained from `paramsDictionary`. */
  const parsedOffset = parseInt(paramsDictionary['offset'])

  /** The parsed limit value obtained from `paramsDictionary`. */
  const parsedLimit = parseInt(paramsDictionary['limit'])

  if (!isNaN(parsedOffset) && parsedOffset >= 0) {
    offset = parsedOffset
  } else {
    offset = 0
  }

  if (!isNaN(parsedLimit) && parsedLimit >= 0) {
    limit = Math.min(parsedLimit, 100)
  } else {
    limit = 10
  }

  return farmers.slice(offset, offset + limit)
}

export default listFarmers
