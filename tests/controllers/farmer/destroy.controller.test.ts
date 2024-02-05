import * as deleteFarmerService from '../../../src/services/delete-farmer.service'
import { Request, Response } from 'express'
import database from '../../../src/database'
import destroy from '../../../src/controllers/farmer/destroy.controller'

describe('destroy', () => {
  let mockRequest: Partial<Request>
  let mockResponse: Partial<Response>
  let deleteFarmerSpy: jest.SpyInstance

  beforeEach(() => {
    mockRequest = {
      params: { id: '666' },
    }
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    }
    deleteFarmerSpy = jest.spyOn(deleteFarmerService, 'default')
  })

  afterEach(() => {
    deleteFarmerSpy.mockRestore()
  })

  it('responds with a 200 OK status for a successful deletion', () => {
    // Prepare
    deleteFarmerSpy.mockReturnValue(true)

    // Execute
    destroy(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(deleteFarmerSpy).toHaveBeenCalledWith(database.farmers, '666')
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })

  it('responds with a 404 status if farmer is not found', () => {
    // Prepare
    deleteFarmerSpy.mockReturnValue(false)

    // Execute
    destroy(mockRequest as Request, mockResponse as Response)

    // Expectations
    expect(deleteFarmerSpy).toHaveBeenCalledWith(database.farmers, '666')
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })
})
