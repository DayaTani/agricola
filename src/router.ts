import { Router } from 'express'
import basicAuth from './middlewares/basic-auth'
import create from './controllers/farmer/create.controller'
import destroy from './controllers/farmer/destroy.controller'
import index from './controllers/farmer/index.controller'
import show from './controllers/farmer/show.controller'
import update from './controllers/farmer/update.controller'

/** Express Router for managing the API routes. */
const router = Router()

router.get('/', index)
router.post('/', basicAuth, create)
router.get('/:id', show)
router.put('/:id', basicAuth, update)
router.delete('/:id', basicAuth, destroy)

export default router
