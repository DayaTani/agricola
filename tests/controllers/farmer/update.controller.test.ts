import * as updateFarmerService from '../../../src/services/update-farmer.service'
import { InvalidRequestError, ResourceNotFoundError, UniqueConstraintViolationError } from '../../../src/types/errors'
import { Request, Response } from 'express'
import database from '../../../src/database'
import update from '../../../src/controllers/farmer/update.controller'

describe('update', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let updateFarmerSpy: jest.SpyInstance

  beforeEach(() => {
    mockRequest = {
      body: { name: 'Charlie Chaplin', idCardNumber: '1234567890', birthDate: '1889-04-16' },
      params: { id: '321' },
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
    updateFarmerSpy = jest.spyOn(updateFarmerService, 'default')
  })

  afterEach(() => {
    updateFarmerSpy.mockRestore()
  })

  it('responds with a 200 OK status for a successful update', () => {
    // Prepare
    updateFarmerSpy.mockReturnValue(undefined)

    // Execute
    update(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(updateFarmerSpy).toHaveBeenCalledWith(mockRequest.body, database.farmers, '321')
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })

  it.each([
    [new ResourceNotFoundError('not found.'), 404],
    [new InvalidRequestError('missing field'), 400],
    [new UniqueConstraintViolationError('ID already exists.'), 409],
  ])('handles raised Errors and returns an appropriate response', (error, statusCode) => {
    // Prepare
    updateFarmerSpy.mockImplementation(() => {
      throw error
    })

    // Execute
    update(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(updateFarmerSpy).toHaveBeenCalledWith(mockRequest.body, database.farmers, '321')
    expect(mockResponse.status).toHaveBeenCalledWith(statusCode)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })
})
