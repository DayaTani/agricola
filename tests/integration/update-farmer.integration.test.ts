const TEST_PASSWORD = 'si-tani'
process.env.PASSWORD = TEST_PASSWORD

import FarmerDto from '../../src/types/farmer.dto'
import { USERNAME } from '../../src/middlewares/basic-auth'
import app from '../../src/app'
import database from '../../src/database'
import request from 'supertest'

describe('PUT /farmers/:id', () => {
  it('should update the details of a specific farmer', async () => {
    // Prepare
    const farmerToUpdate = database.farmers[4]

    const originalName = farmerToUpdate.name

    const updatedFarmerDto: FarmerDto = {
      name: 'Victor Seastorm',
      idCardNumber: farmerToUpdate.idCardNumber,
      birthDate: farmerToUpdate.birthDate,
    }

    const basicCredentials = Buffer.from(`${USERNAME}:${TEST_PASSWORD}`).toString('base64')

    // Execute
    await request(app)
      .put(`/farmers/${farmerToUpdate.id}`)
      .set('Authorization', `Basic ${basicCredentials}`)
      .send(updatedFarmerDto)
      .expect(200)

    // Assert
    const updatedFarmerIndex = database.farmers.findIndex(farmer => farmer.id === farmerToUpdate.id)
    expect(database.farmers[updatedFarmerIndex]).toStrictEqual({ ...updatedFarmerDto, id: farmerToUpdate.id })

    // Cleanup
    database.farmers[updatedFarmerIndex].name = originalName
    database.farmers.sort((a, b) => (a.name < b.name ? -1 : 1))

    delete process.env.PASSWORD
  })
})
