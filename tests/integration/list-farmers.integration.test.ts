import app from '../../src/app'
import database from '../../src/database'
import request from 'supertest'

describe('GET /farmers', () => {
  it('should return a subset of farmers based on pagination parameters', async () => {
    const response = await request(app).get('/farmers?offset=2&limit=3').expect(200)
    expect(response.body.farmers).toHaveLength(3)

    const expectedFarmers = database.farmers.slice(2, 5)
    expect(response.body.farmers).toStrictEqual(expectedFarmers)

  })

  it('should return a subset of farmers based on default pagination if no parameters specified', async () => {
    const response = await request(app).get('/farmers').expect(200)
    expect(response.body.farmers).toHaveLength(10)

    const expectedFarmers = database.farmers.slice(0, 10)
    expect(response.body.farmers).toStrictEqual(expectedFarmers)
  })
})
