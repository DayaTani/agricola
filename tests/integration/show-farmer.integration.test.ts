import app from '../../src/app'
import database from '../../src/database'
import request from 'supertest'

describe('GET /farmers/:id', () => {
  it('should return the details of a specific farmer', async () => {
    // Prepare
    const farmer = database.farmers[2]

    // Execute
    const response = await request(app)
      .get(`/farmers/${farmer.id}`)
      .expect(200)

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toStrictEqual(farmer)
  })
})
