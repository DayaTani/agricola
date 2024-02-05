import * as validator from '../../src/services/validate.service'
import Farmer from '../../src/types/farmer'
import FarmerDto from '../../src/types/farmer.dto'
import createFarmer from '../../src/services/create-farmer.service'

describe('createFarmer', () => {
  const sampleFarmer: Farmer = { id: 1, name: 'Ingrid Bergman', idCardNumber: '0123456789', birthDate: '1911-02-01'}
  let validateSpy: jest.SpyInstance

  beforeEach(() => {
    validateSpy = jest.spyOn(validator, 'default')
  })

  afterEach(() => {
    validateSpy.mockRestore()
  })

  it.each([
    ['James Stewart', 1],
    ['Humphrey Bogart', 0],
  ])('should create a new farmer and return success result', (name, arrayIndexAfterInsertion) => {
    // Prepare
    const validDto: FarmerDto = {
      name,
      idCardNumber: '1234567890',
      birthDate: '1990-05-15',
    }
    validateSpy.mockReturnValue(validDto)

    const farmers: Farmer[] = [sampleFarmer]

    // Execute
    const result = createFarmer(validDto, farmers, 4)

    // Assert
    expect(result).toStrictEqual({
      success: true,
      nextFarmerId: 5,
    })

    expect(farmers).toHaveLength(2)
    expect(farmers[arrayIndexAfterInsertion]).toStrictEqual({ ...validDto, id: 4 })

    expect(validateSpy).toHaveBeenCalledWith(validDto, farmers, null)
  })

  it('should return a failure result when validation fails', () => {
    // Prepare
    validateSpy.mockReturnValue(false)

    const requestBody = { key: 'value' }
    const farmers: Farmer[] = [sampleFarmer]

    // Execute
    const result = createFarmer(requestBody, farmers, 123)

    // Assert
    expect(result).toEqual({ success: false })
    expect(validateSpy).toHaveBeenCalledWith(requestBody, farmers, null)
    expect(farmers).toHaveLength(1)
  })
})
