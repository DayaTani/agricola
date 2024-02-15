import * as listFarmersService from '../../../src/services/list-farmers.service'
import { Request, Response } from 'express'
import database from '../../../src/database'
import index from '../../../src/controllers/farmer/index.controller'

describe('index', () => {
  it('responds with a JSON list of farmers', () => {
    // Preparee
    const farmers = [
      { id: 2, name: 'Clark Gable', idCardNumber: '2345678901', birthDate: '1901-02-01' },
      { id: 1, name: 'Greta Garbo', idCardNumber: '1234567890', birthDate: '1905-09-18' },
      { id: 4, name: 'Jean Harlow', idCardNumber: '4567890123', birthDate: '1911-03-03' },
    ]
    const listFarmersSpy = jest.spyOn(listFarmersService, 'default')
    listFarmersSpy.mockReturnValue(farmers)

    const mockRequest: Partial<Request> = {
      query: { skip: '100', limit: '10' },
    }
    const mockResponse: Partial<Response> = { json: jest.fn() }

    // Execute
    index(mockRequest as Request, mockResponse as Response)

    // Assert
    expect(listFarmersSpy).toHaveBeenCalledWith(database.farmers, mockRequest.query)
    expect(mockResponse.json).toHaveBeenCalledWith({ farmers })

    // Cleanup
    listFarmersSpy.mockRestore()
  })
})
