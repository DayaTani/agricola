import BasicAuth from 'express-basic-auth'

/** The username for Basic Authentication. */
const USERNAME = 'dayatani'

/** The realm used in the Basic Authentication challenge. */
const REALM = 'agricola'

/** Express middleware for Basic Authentication. */
const basicAuth = BasicAuth({
  users: { [USERNAME]: process.env.PASSWORD as string },
  challenge: true,
  realm: REALM,
})

export default basicAuth
