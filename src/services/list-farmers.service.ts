import Farmer from '../types/farmer'
import QueryString from 'qs'
/**
 * Retrieves a subset of farmers based on pagination parameters.
 * @param farmers - The array of farmers to paginate.
 * @param query - The query object containing pagination parameters.
 * @returns The subset of farmers based on pagination parameters.
 */
const listFarmers = (farmers: Farmer[], query: QueryString.ParsedQs): Farmer[] => {
  /** The offset value used for pagination. */
  let offset: number

  /** The maximum number of items to retrieve. */
  let limit: number

  /** The parsed offset value from the query parameters. */
  const parsedOffset = parseInt(String(query.offset))

  /** The parsed limit value from the query parameters. */
  const parsedLimit = parseInt(String(query.limit))

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
