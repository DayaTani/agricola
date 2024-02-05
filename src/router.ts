import { Router } from 'express'
import create from './controllers/farmer/create.controller'
import destroy from './controllers/farmer/destroy.controller'
import index from './controllers/farmer/index.controller'
import show from './controllers/farmer/show.controller'
import update from './controllers/farmer/update.controller'

/** Express Router for managing the API routes. */
const router = Router()

router.get('/', index)
router.post('/', create)
router.get('/:id', show)
router.put('/:id', update)
router.delete('/:id', destroy)

export default router
