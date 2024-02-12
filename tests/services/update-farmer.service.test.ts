import * as validator from '../../src/services/validate.service'
import Farmer from '../../src/types/farmer'
import { ResourceNotFoundError } from '../../src/types/errors'
import updateFarmer from '../../src/services/update-farmer.service'

describe('updateFarmer', () => {
  let farmers: Farmer[]
  let originalFarmers: Farmer[]
  let validateSpy: jest.SpyInstance

  beforeEach(() => {
    farmers = [
      { id: 1, name: 'Audrey Tautou', idCardNumber: '1234567890', birthDate: '1976-08-09' },
      { id: 10, name: 'Cate Blanchett', idCardNumber: '2345678923', birthDate: '1969-05-14' },
      { id: 2, name: 'Heath Ledger', idCardNumber: '2345678901', birthDate: '1979-04-04' },
      { id: 8, name: 'Kate Beckinsale', idCardNumber: '8901234567', birthDate: '1973-07-26' },
      { id: 9, name: 'Russell Crowe', idCardNumber: '9012345678', birthDate: '1964-04-07' },
    ]

    originalFarmers = JSON.parse(JSON.stringify(farmers))

    validateSpy = jest.spyOn(validator, 'default')
  })

  afterEach(() => {
    validateSpy.mockRestore()
  })

  it('should update a farmer successfully, then sort the farmers array by name', () => {
    // Prepare
    const farmerId = '9'
    const requestBody = { name: 'Jennifer Aniston', idCardNumber: '1098765432', birthDate: '1969-02-11' }

    validateSpy.mockReturnValue(requestBody)

    // Execute
    expect(() => updateFarmer(requestBody, farmers, farmerId)).not.toThrow()

    // Assert
    expect(farmers).toEqual([
      { id: 1, name: 'Audrey Tautou', idCardNumber: '1234567890', birthDate: '1976-08-09' },
      { id: 10, name: 'Cate Blanchett', idCardNumber: '2345678923', birthDate: '1969-05-14' },
      { id: 2, name: 'Heath Ledger', idCardNumber: '2345678901', birthDate: '1979-04-04' },
      { id: 9, name: 'Jennifer Aniston', idCardNumber: '1098765432', birthDate: '1969-02-11' },
      { id: 8, name: 'Kate Beckinsale', idCardNumber: '8901234567', birthDate: '1973-07-26' },
    ])

    expect(validateSpy).toHaveBeenCalledWith(requestBody, farmers, 9)
  })

  it('should throw ResourceNotFound when farmer is not found', () => {
    // Prepare
    const farmerId = '123'
    const requestBody = { name: 'Updated John', idCardNumber: '67890', birthDate: '1995-05-05' }

    // Execute & assert
    expect(() => updateFarmer(requestBody, farmers, farmerId)).toThrow(ResourceNotFoundError)

    expect(farmers).toEqual(originalFarmers)

    expect(validateSpy).not.toHaveBeenCalled()
  })
})
