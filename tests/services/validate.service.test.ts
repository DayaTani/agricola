import { InvalidRequestError, UniqueConstraintViolationError } from '../../src/types/errors'
import Farmer from '../../src/types/farmer'
import FarmerDto from '../../src/types/farmer.dto'
import validate from '../../src/services/validate.service'

describe('validate function', () => {
  const farmers: Farmer[] = [
    { id: 3, name: 'Cary Grant', idCardNumber: '3456789012', birthDate: '1904-01-18' },
    { id: 1, name: 'Humphrey Bogart', idCardNumber: '1234567890', birthDate: '1899-12-25' },
    { id: 4, name: 'Ingrid Bergman', idCardNumber: '4567890123', birthDate: '1915-08-29' },
    { id: 5, name: 'James Stewart', idCardNumber: '5678901234', birthDate: '1908-05-20' },
    { id: 2, name: 'Katharine Hepburn', idCardNumber: '2345678901', birthDate: '1907-05-12' },
  ]

  test.each([
    // Valid inputs
    { name: 'Jane Russell', idCardNumber: '0123456789', birthDate: '1908-05-20' },
    { name: 'Miriam Hopkins', idCardNumber: '0345678901', birthDate: '1902-10-18' },
    { name: 'Donna Reed', idCardNumber: '4567835435', birthDate: '1915-12-25', extra: 'value' },

  ])('should return a valid FarmerDto for valid input for creation purpose', requestBody => {
    // Execute
    const farmerDto = validate(requestBody, farmers, null)

    // Assert
    expect(farmerDto).toEqual<FarmerDto>({
      name: requestBody.name,
      idCardNumber: requestBody.idCardNumber,
      birthDate: requestBody.birthDate,
    })
  })

  test.each([
    { requestBody: { name: 'Ingrid Bergman', idCardNumber: '4567890123', birthDate: '1915-08-30' }, farmerId: 4 },
    { requestBody: { name: 'James Stewardess', idCardNumber: '5678901234', birthDate: '1908-05-20' }, farmerId: 5 },
  ])('should return a valid FarmerDto for valid input for update purpose', ({ requestBody, farmerId }) => {
    // Execute
    const farmerDto = validate(requestBody, farmers, farmerId)

    // Assert
    expect(farmerDto).toEqual<FarmerDto>({
      name: requestBody.name,
      idCardNumber: requestBody.idCardNumber,
      birthDate: requestBody.birthDate,
    })
  })

  test.each([
    { idCardNumber: '0123456789', birthDate: '1908-05-20' },
    { name: 'Miriam Hopkins', birthDate: '1902-10-18' },
    { name: 'Humphrey Bogart', idCardNumber: '0456789012' },
    { name: 123, idCardNumber: '0123456789', birthDate: '1908-05-20' },
    { name: 'Humphrey Bogart', idCardNumber: 123456789, birthDate: '1908-05-20' },
    { name: 'Humphrey Bogart', idCardNumber: '123456789', birthDate: '1908-1-20' },
    { name: 'Humphrey Bogart', idCardNumber: 123456789, birthDate: false },
  ])('should throw InvalidRequestError for invalid or missing fields', requestBody => {
    // Execute & assert
    expect(() => validate(requestBody, farmers, null)).toThrow(InvalidRequestError)
  })

  test.each([
    '2022-00-15',
    '2022-13-15',
    '2022-02-00',
  ])('should return false for semantically invalid birth date', birthDate => {
    // Prepare
    const requestBody = {
      name: 'Ingrid Bergman',
      idCardNumber: '1234567890',
      birthDate,
    }

    // Execute & assert
    expect(() => validate(requestBody, farmers, null)).toThrow(InvalidRequestError)
  })

  test('should return false for future birth date', () => {
    // Prepare
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(today.getDate() + 1)

    const year = tomorrow.getFullYear()
    const month = String(tomorrow.getMonth() + 1).padStart(2, '0')
    const day = String(tomorrow.getDate()).padStart(2, '0')

    const tomorrowBirthDate = `${year}-${month}-${day}`

    // Prepare
    const requestBody = {
      name: 'Cary Grant',
      idCardNumber: '1234567890',
      birthDate: tomorrowBirthDate,
    }

    // Execute & assert
    expect(() => validate(requestBody, farmers, null)).toThrow(InvalidRequestError)
  })

  test.each([
    { idCardNumber: '1234567890', farmerId: null },
    { idCardNumber: '2345678901', farmerId: 1 },
    { idCardNumber: '3456789012', farmerId: 2 },
    { idCardNumber: '4567890123', farmerId: null },
    { idCardNumber: '5678901234', farmerId: null },
  ])('should return false for existing ID card number of another farmer', ({ idCardNumber, farmerId }) => {
    // Prepare
    const requestBody = {
      name: 'Shirley MacLaine',
      idCardNumber,
      birthDate: '1915-01-31',
    }

    // Execute & assert
    expect(() => validate(requestBody, farmers, farmerId)).toThrow(UniqueConstraintViolationError)
  })
})
