import * as getFarmerService from '../../../src/services/get-farmer.service'
import { Request, Response } from 'express'
import { ResourceNotFoundError } from '../../../src/types/errors'
import database from '../../../src/database'
import show from '../../../src/controllers/farmer/show.controller'

describe('show', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let getFarmerSpy: jest.SpyInstance

  beforeEach(() => {
    mockRequest = { params: { id: '123' } }
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
    getFarmerSpy = jest.spyOn(getFarmerService, 'default')
  })

  afterEach(() => {
    getFarmerSpy.mockRestore()
  })

  it('responds with a JSON farmer object if found', () => {
    // Prepare
    const farmer = { id: 123, name: 'Jean Harlow', idCardNumber: '4567890123', birthDate: '1911-03-03' }

    getFarmerSpy.mockReturnValue(farmer)

    // Execute
    show(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(getFarmerSpy).toHaveBeenCalledWith(database.farmers, '123')
    expect(mockResponse.json).toHaveBeenCalledWith(farmer)
    expect(mockResponse.status).not.toHaveBeenCalled()

  })

  it('responds with a 404 status if ResourceNotFoundError is raised', () => {
    // Prepare
    getFarmerSpy.mockImplementation(() => {
      throw new ResourceNotFoundError('Not Found.')
    })

    // Execute
    show(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(getFarmerSpy).toHaveBeenCalledWith(database.farmers, '123')
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })
})
