import CreateFarmerDto from '../src/types/create-farmer.dto'
import Farmer from '../src/types/farmer'
import validate from '../src/validate'

describe('validate function', () => {
  const farmers: Farmer[] = [
    { id: 3, name: 'Cary Grant', idCardNumber: '3456789012', birthDate: '1904-01-18' },
    { id: 1, name: 'Humphrey Bogart', idCardNumber: '1234567890', birthDate: '1899-12-25' },
    { id: 4, name: 'Ingrid Bergman', idCardNumber: '4567890123', birthDate: '1915-08-29' },
    { id: 5, name: 'James Stewart', idCardNumber: '5678901234', birthDate: '1908-05-20' },
    { id: 2, name: 'Katharine Hepburn', idCardNumber: '2345678901', birthDate: '1907-05-12' },
  ]

  test.each([
    { name: 'James Stewart', idCardNumber: '0123456789', birthDate: '1908-05-20' },
    { name: 'Miriam Hopkins', idCardNumber: '0345678901', birthDate: '1902-10-18' },
    { name: 'Humphrey Bogart', idCardNumber: '0456789012', birthDate: '1899-12-25', extra: 'value' },
  ])('should return a valid CreateFarmerDto for valid input', requestBody => {
    // Execute
    const result = validate(requestBody, farmers)

    // Assert
    expect(result).toEqual<CreateFarmerDto>({
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
  ])('should return false for invalid or missing fields', requestBody => {
    // Execute
    const result = validate(requestBody, farmers)

    // Assert
    expect(result).toBe(false)
  })

  test.each([
    '2022-00-15',
    '2022-13-15',
    '2022-02-00',
  ])('should return false for semantically invalid birth date', birthDate => {
    // Prepare
    const requestBody = {
      name: 'Jane Doe',
      idCardNumber: '1234567890',
      birthDate,
    }

    // Execute
    const result = validate(requestBody, farmers)

    // Assert
    expect(result).toBe(false)
  })

  test.each([
    '1234567890',
    '2345678901',
    '3456789012',
    '4567890123',
    '5678901234',
  ])('should return false for existing ID card number', idCardNumber => {
    // Prepare
    const requestBody = {
      name: 'Jane Doe',
      idCardNumber,
      birthDate: '1915-01-34',
    }

    // Execute
    const result = validate(requestBody, farmers)

    // Assert
    expect(result).toBe(false)
  })
})
