import Farmer from '../../src/types/farmer'
import { ResourceNotFoundError } from '../../src/types/errors'
import deleteFarmer from '../../src/services/delete-farmer.service'

describe('deleteFarmer', () => {
  let farmers: Farmer[]

  beforeEach(() => {
    farmers = [
      { id: 1, name: 'Audrey Tautou', idCardNumber: '1234567890', birthDate: '1976-08-09' },
      { id: 10, name: 'Cate Blanchett', idCardNumber: '2345678923', birthDate: '1969-05-14' },
      { id: 2, name: 'Heath Ledger', idCardNumber: '2345678901', birthDate: '1979-04-04' },
      { id: 8, name: 'Kate Beckinsale', idCardNumber: '8901234567', birthDate: '1973-07-26' },
      { id: 9, name: 'Russell Crowe', idCardNumber: '9012345678', birthDate: '1964-04-07' },
    ]
  })

  it('should delete a farmer by ID and return true', () => {
    // Execute
    expect(() => deleteFarmer(farmers, '2')).not.toThrow()

    // Assert
    expect(farmers).toEqual([
      { id: 1, name: 'Audrey Tautou', idCardNumber: '1234567890', birthDate: '1976-08-09' },
      { id: 10, name: 'Cate Blanchett', idCardNumber: '2345678923', birthDate: '1969-05-14' },
      { id: 8, name: 'Kate Beckinsale', idCardNumber: '8901234567', birthDate: '1973-07-26' },
      { id: 9, name: 'Russell Crowe', idCardNumber: '9012345678', birthDate: '1964-04-07' },
    ])
  })

  it.each([
    '4',
    'invalidId',
    '-12',
  ])('should throw ResourceNotFound for invalid or non-existent IDs', id => {
    // Execute
    expect(() => deleteFarmer(farmers, id)).toThrow(ResourceNotFoundError)

    // Assert
    expect(farmers).toEqual([
      { id: 1, name: 'Audrey Tautou', idCardNumber: '1234567890', birthDate: '1976-08-09' },
      { id: 10, name: 'Cate Blanchett', idCardNumber: '2345678923', birthDate: '1969-05-14' },
      { id: 2, name: 'Heath Ledger', idCardNumber: '2345678901', birthDate: '1979-04-04' },
      { id: 8, name: 'Kate Beckinsale', idCardNumber: '8901234567', birthDate: '1973-07-26' },
      { id: 9, name: 'Russell Crowe', idCardNumber: '9012345678', birthDate: '1964-04-07' },
    ])
  })
})
