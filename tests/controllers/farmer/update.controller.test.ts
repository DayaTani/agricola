import * as updateFarmerService from '../../../src/services/update-farmer.service'
import { Request, Response } from 'express'
import UpdateFarmerResult from '../../../src/types/update-farmer-result'
import database from '../../../src/database'
import update from '../../../src/controllers/farmer/update.controller'
import updateFarmer from '../../../src/services/update-farmer.service'

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
    updateFarmerSpy.mockReturnValue(UpdateFarmerResult.Success)

    // Execute
    update(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(updateFarmerSpy).toHaveBeenCalledWith(mockRequest.body, database.farmers, '321')
    expect(mockResponse.status).toHaveBeenCalledWith(200)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })

  it('responds with a 404 status if farmer is not found', () => {
    // Prepare
    updateFarmerSpy.mockReturnValue(UpdateFarmerResult.NotFound)

    // Execute
    update(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(updateFarmerSpy).toHaveBeenCalledWith(mockRequest.body, database.farmers, '321')
    expect(mockResponse.status).toHaveBeenCalledWith(404)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })

  it('responds with a 400 status for an invalid update', () => {
    // Prepare
    updateFarmerSpy.mockReturnValue(UpdateFarmerResult.Invalid)

    // Execute
    update(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(updateFarmer).toHaveBeenCalledWith(mockRequest.body, database.farmers, '321')
    expect(mockResponse.status).toHaveBeenCalledWith(400)
    expect(mockResponse.send).toHaveBeenCalledTimes(1)
  })
})
