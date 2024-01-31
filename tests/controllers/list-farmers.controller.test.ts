import Farmer from '../../src/types/farmer'
import listFarmers from '../../src/controllers/list-farmers.controller'

describe('listFarmers', () => {
  const farmers: Farmer[] = [
    { id: 11, name: 'Al Pacino', idCardNumber: '3456789012', birthDate: '1940-04-25' },
    { id: 1, name: 'Audrey Hepburn', idCardNumber: '1234567890', birthDate: '1929-05-04' },
    { id: 9, name: 'Dustin Hoffman', idCardNumber: '9012345678', birthDate: '1937-08-08' },
    { id: 8, name: 'Harrison Ford', idCardNumber: '8901234567', birthDate: '1942-07-13' },
    { id: 2, name: 'Jack Lemmon', idCardNumber: '2345678901', birthDate: '1925-02-08' },
    { id: 10, name: 'Jane Fonda', idCardNumber: '2345678924', birthDate: '1937-12-21' },
    { id: 3, name: 'John Wayne', idCardNumber: '3456789012', birthDate: '1907-05-26' },
    { id: 4, name: 'Marilyn Monroe', idCardNumber: '4567890123', birthDate: '1926-06-01' },
    { id: 7, name: 'Meryl Streep', idCardNumber: '7890123456', birthDate: '1949-06-22' },
    { id: 6, name: 'Robert Redford', idCardNumber: '6789012345', birthDate: '1936-08-18' },
    { id: 5, name: 'Sean Connery', idCardNumber: '5678901234', birthDate: '1930-08-25' },
  ]

  const manyFarmers: Farmer[] = []

  beforeAll(() => {
    for (let i = 0; i < 110; ++i) {
      manyFarmers.push(farmers[i % farmers.length])
    }
  })

  it('should retrieve a list of farmers with valid parameters', () => {
    // Prepare
    const paramsDictionary = {
      offset: '2',
      limit: '3',
    }

    // Execute
    const result = listFarmers(farmers, paramsDictionary)

    // Assert
    const expectedFarmers: Farmer[] = [
      farmers[2],
      farmers[3],
      farmers[4],
    ]

    expect(result).toEqual(expectedFarmers)
  })

  it('should handle missing offset parameter and use default offset', () => {
    // Execute
    const result = listFarmers(farmers, { limit: '3' })

    // Assert
    const expectedFarmers: Farmer[] = [
      farmers[0],
      farmers[1],
      farmers[2],
    ]

    expect(result).toEqual(expectedFarmers)
  })

  it('should handle missing limit parameter and use default limit', () => {
    // Execute
    const result = listFarmers(farmers, { offset: '1' })

    // Assert
    const expectedFarmers: Farmer[] = [
      farmers[1],
      farmers[2],
      farmers[3],
      farmers[4],
      farmers[5],
      farmers[6],
      farmers[7],
      farmers[8],
      farmers[9],
      farmers[10],
    ]

    expect(result).toEqual(expectedFarmers)
  })

  it.each([
    'invalid',
    '-123',
  ])('should handle invalid limit and use default limit', limit => {
    // Execute
    const result = listFarmers(farmers, { offset: '1', limit })

    // Assert
    const expectedFarmers: Farmer[] = [
      farmers[1],
      farmers[2],
      farmers[3],
      farmers[4],
      farmers[5],
      farmers[6],
      farmers[7],
      farmers[8],
      farmers[9],
      farmers[10],
    ]

    expect(result).toEqual(expectedFarmers)
  })

  it.each([
    '1000',
    '101',
    '200',
  ])('should keep maximum limit to be 100', limit => {
    // Execute
    const result = listFarmers(manyFarmers, { offset: '2', limit })

    // Assert
    expect(result).toHaveLength(100)
    expect(result).toEqual(manyFarmers.slice(2, 102))
  })
})
