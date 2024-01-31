import CreateFarmerDto from '../src/types/create-farmer.dto'
import validate from '../src/validate'

describe('validate function', () => {
  test.each([
    { name: 'James Stewart', idCardNumber: '0123456789', birthDate: '1908-05-20' },
    { name: 'Miriam Hopkins', idCardNumber: '0345678901', birthDate: '1902-10-18' },
    { name: 'Humphrey Bogart', idCardNumber: '0456789012', birthDate: '1899-12-25', extra: 'value' },
  ])('should return a valid CreateFarmerDto for valid input', requestBody => {
    const result = validate(requestBody)

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

    const result = validate(requestBody)

    expect(result).toBe(false)
  })

  test.each([
    '2022-00-15',
    '2022-13-15',
    '2022-02-00',
  ])('should return false for semantically invalid birthdate', birthDate => {
    const requestBody = {
      name: 'Jane Doe',
      idCardNumber: '1234567890',
      birthDate,
    }

    const result = validate(requestBody)

    expect(result).toBe(false)
  })
})
