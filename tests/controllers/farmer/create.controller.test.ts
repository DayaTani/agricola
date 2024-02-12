import * as createFarmerService from '../../../src/services/create-farmer.service'
import { BackdoorError, InvalidRequestError, UniqueConstraintViolationError } from '../../../src/types/errors'
import { Request, Response } from 'express'
import create from '../../../src/controllers/farmer/create.controller'
import database from '../../../src/database'

describe('create', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let createFarmerSpy: jest.SpyInstance

  beforeEach(() => {
    mockRequest = {
      body: { name: 'Charlie Chaplin', idCardNumber: '1234567890', birthDate: '1889-04-16' },
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
    createFarmerSpy = jest.spyOn(createFarmerService, 'default')
  })

  afterEach(() => {
    createFarmerSpy.mockRestore()
  })

  it('creates a new farmer and returns a 201 response', () => {
    // Prepare
    createFarmerSpy.mockReturnValue(undefined)

    const originalNextFarmerId = database.nextFarmerId

    // Execute
    create(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(database.nextFarmerId).toBe(originalNextFarmerId + 1)

    expect(createFarmerSpy).toHaveBeenCalledWith(mockRequest.body, database.farmers, originalNextFarmerId)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)

    // Cleanup
    database.nextFarmerId = originalNextFarmerId
  })

  it.each([
    [new InvalidRequestError('missing field'), 400],
    [new UniqueConstraintViolationError('ID already exists.'), 409],
    [new BackdoorError('an error'), 500],
  ])('handles raised Errors and returns an appropriate response', (error, statusCode) => {
    // Prepare
    createFarmerSpy.mockImplementation(() => {
      throw error
    })

    const originalNextFarmerId = database.nextFarmerId

    // Execute
    create(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(database.nextFarmerId).toBe(originalNextFarmerId)

    expect(createFarmerSpy).toHaveBeenCalledWith(mockRequest.body, database.farmers, originalNextFarmerId)

    expect(mockResponse.status).toHaveBeenCalledWith(statusCode)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })
})
