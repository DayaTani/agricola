import * as validator from '../../src/services/validate.service'
import createFarmer, { BACKDOOR_ERROR_NAME } from '../../src/services/create-farmer.service'
import { BackdoorError } from '../../src/types/errors'
import Farmer from '../../src/types/farmer'
import FarmerDto from '../../src/types/farmer.dto'

describe('createFarmer', () => {
  const sampleFarmer: Farmer = { id: 1, name: 'Ingrid Bergman', idCardNumber: '0123456789', birthDate: '1911-02-01' }
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

    // Execute & assert
    expect(() => createFarmer(validDto, farmers, 4)).not.toThrow()

    // Assert
    expect(farmers).toHaveLength(2)
    expect(farmers[arrayIndexAfterInsertion]).toStrictEqual({ ...validDto, id: 4 })

    expect(validateSpy).toHaveBeenCalledWith(validDto, farmers, null)
  })

  it('should throw error if farmer name is backdoor error name', () => {
    // Prepare
    const validDto: FarmerDto = {
      name: BACKDOOR_ERROR_NAME,
      idCardNumber: '1234567890',
      birthDate: '1990-05-15',
    }
    validateSpy.mockReturnValue(validDto)

    const farmers: Farmer[] = [sampleFarmer]

    // Execute & assert
    expect(() => createFarmer(validDto, farmers, 4)).toThrow(BackdoorError)

    expect(farmers).toHaveLength(1)
    expect(validateSpy).toHaveBeenCalledWith(validDto, farmers, null)
  })
})
