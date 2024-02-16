const TEST_PASSWORD = 'pak-dayat'
process.env.PASSWORD = TEST_PASSWORD

import FarmerDto from '../../src/types/farmer.dto'
import { USERNAME } from '../../src/middlewares/basic-auth'
import app from '../../src/app'
import database from '../../src/database'
import request from 'supertest'

describe('POST /farmers', () => {
  it('should create a new farmer', async () => {
    // Prepare
    const newFarmer: FarmerDto = {
      name: 'Harrison Ford',
      idCardNumber: '1234567890',
      birthDate: '1990-05-15',
    }

    const nextFarmerId = database.nextFarmerId

    const initialNumFarmers = database.farmers.length

    const basicCredentials = Buffer.from(`${USERNAME}:${TEST_PASSWORD}`).toString('base64')

    // Execute
    await request(app)
      .post('/farmers')
      .set('Authorization', `Basic ${basicCredentials}`)
      .send(newFarmer)
      .expect(201)

    // Assert
    expect(database.farmers.length).toBe(initialNumFarmers + 1)

    const newFarmerIndex = database.farmers.findIndex(farmer => farmer.id === nextFarmerId)

    expect(database.farmers[newFarmerIndex]).toStrictEqual({
      ...newFarmer,
      id: nextFarmerId,
    })

    // Cleanup
    database.farmers.splice(newFarmerIndex, 1)
    delete process.env.PASSWORD
  })
})
