const TEST_PASSWORD = 'bu-dayat'
process.env.PASSWORD = TEST_PASSWORD

import { USERNAME } from '../../src/middlewares/basic-auth'
import app from '../../src/app'
import database from '../../src/database'
import request from 'supertest'

describe('DELETE /farmers/:id', () => {
  it('should delete a specific farmer', async () => {
    // Prepare
    const originalFarmers = [...database.farmers]

    const farmerToBeDeleted = database.farmers[7]
    const basicCredentials = Buffer.from(`${USERNAME}:${TEST_PASSWORD}`).toString('base64')

    // Execute
    await request(app)
      .delete(`/farmers/${farmerToBeDeleted.id}`)
      .set('Authorization', `Basic ${basicCredentials}`)
      .expect(200)

    // Assert
    const deletedFarmer = database.farmers.find(farmer => farmer.id === farmerToBeDeleted.id)
    expect(deletedFarmer).toBeUndefined()

    // Cleanup
    database.farmers = [...originalFarmers]
    delete process.env.PASSWORD
  })
})
