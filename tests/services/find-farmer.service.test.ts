import Farmer from '../../src/types/farmer'
import { findFarmer } from '../../src/services/find-farmer.service'

describe('findFarmer', () => {
  const farmers: Farmer[] = [
    { id: 8, name: 'Natalie Portman', idCardNumber: '1234567890', birthDate: '1981-06-09' },
    { id: 12, name: 'Leonardo DiCaprio', idCardNumber: '2345678901', birthDate: '1974-11-11' },
    { id: 4, name: 'Meryl Streep', idCardNumber: '3456789012', birthDate: '1949-06-22' },
    { id: 99, name: 'Brad Pitt', idCardNumber: '4567890123', birthDate: '1963-12-18' },
    { id: 3, name: 'Angelina Jolie', idCardNumber: '5678901234', birthDate: '1975-06-04' },
  ]

  it.each([
    ['12', 1],
    ['99', 3],
    ['4', 2],
    ['8', 0],
  ])('should find the index of a farmer by valid ID and return the index', (id, index) => {
    // Execute
    const result = findFarmer(farmers, id)

    // Assert
    expect(result).toBe(index)
  })

  it.each([
    '1',
    'invalidId',
    '-12',
  ])('should return null for invalid or non-existent IDs', id => {
    // Execute
    const result = findFarmer(farmers, id)

    // Assert
    expect(result).toBeNull()
  })
})
