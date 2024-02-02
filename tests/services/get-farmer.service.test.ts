import Farmer from '../../src/types/farmer'
import getFarmer from '../../src/services/get-farmer.service'

describe('getFarmer', () => {
  const farmers: Farmer[] = [
    { id: 11, name: 'Al Pacino', idCardNumber: '3456789012', birthDate: '1940-04-25' },
    { id: 1, name: 'Audrey Hepburn', idCardNumber: '1234567890', birthDate: '1929-05-04' },
    { id: 9, name: 'Dustin Hoffman', idCardNumber: '9012345678', birthDate: '1937-08-08' },
    { id: 8, name: 'Harrison Ford', idCardNumber: '8901234567', birthDate: '1942-07-13' },
    { id: 2, name: 'Jack Lemmon', idCardNumber: '2345678901', birthDate: '1925-02-08' },
    { id: 10, name: 'Jane Fonda', idCardNumber: '2345678923', birthDate: '1937-12-21' },
  ]

  it('should return the correct farmer by ID', () => {
    // Execute
    const result = getFarmer(farmers, '2')

    // Assert
    expect(result).toEqual(farmers[4])
  })

  it.each([
    '4',
    'invalidId',
    '-1',
  ])('should return null for invalid or non-existent IDs', id => {
    // Execute
    const result = getFarmer(farmers, id)

    // Assert
    expect(result).toBeNull()
  })
})
