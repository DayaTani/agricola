import * as createFarmerService from '../../../src/services/create-farmer.service'
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
    createFarmerSpy.mockReturnValue({ success: true, nextFarmerId: 124 })

    const originalNextFarmerId = database.nextFarmerId

    // Execute
    create(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(database.nextFarmerId).toBe(124)

    expect(createFarmerSpy).toHaveBeenCalledWith(mockRequest.body, database.farmers, originalNextFarmerId)

    expect(mockResponse.status).toHaveBeenCalledWith(201)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)

    // Cleanup
    database.nextFarmerId = originalNextFarmerId
  })

  it('handles a failed farmer creation and returns a 400 response', () => {
    // Prepare
    createFarmerSpy.mockReturnValue({ success: false })

    const originalNextFarmerId = database.nextFarmerId

    // Execute
    create(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(database.nextFarmerId).toBe(originalNextFarmerId)

    expect(createFarmerSpy).toHaveBeenCalledWith(mockRequest.body, database.farmers, originalNextFarmerId)

    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })
})
