import { Router } from 'express'
import AuthController from './Controllers/AuthController'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import UserController from './Controllers/UserController'
import HomeController from './Controllers/HomeController'

const routes = Router()

/** Auth */
routes.post('/api/signup', AuthController.signup)
routes.post('/api/authenticate', AuthController.authenticate)
routes.post('/api/forgot-password', AuthController.forgotPassword)
routes.patch('/api/reset-password', AuthController.resetPassword)

/** User */
routes.get('/api/users', AuthMiddleware, UserController.index)
routes.post('/api/users', AuthMiddleware, UserController.store)
routes.put('/api/users/:id', AuthMiddleware, UserController.edit)

/** Home */
routes.get('*', HomeController.index)

export default routes
