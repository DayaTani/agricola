import * as getFarmerService from '../../../src/services/get-farmer.service'
import { Request, Response } from 'express'
import database from '../../../src/database'
import show from '../../../src/controllers/farmer/show.controller'

describe('show', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>

  beforeEach(() => {
    mockRequest = { params: { id: '123' } }
    mockResponse = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
  })

  it('responds with a JSON farmer object if found', () => {
    // Prepare
    const farmer = { id: 123, name: 'Jean Harlow', idCardNumber: '4567890123', birthDate: '1911-03-03' }

    const getFarmerSpy = jest.spyOn(getFarmerService, 'default')
    getFarmerSpy.mockReturnValue(farmer)

    // Execute
    show(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(getFarmerSpy).toHaveBeenCalledWith(database.farmers, '123')
    expect(mockResponse.json).toHaveBeenCalledWith(farmer)
    expect(mockResponse.status).not.toHaveBeenCalled()

    // Cleanup
    getFarmerSpy.mockRestore()
  })

  it('responds with a 404 status if farmer is not found', () => {
    // Prepare
    const getFarmerSpy = jest.spyOn(getFarmerService, 'default')
    getFarmerSpy.mockReturnValue(null)

    // Execute
    show(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(getFarmerSpy).toHaveBeenCalledWith(database.farmers, '123')
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)

    // Cleanup
    getFarmerSpy.mockRestore()
  })
})
