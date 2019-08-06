import { Router } from 'express'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import UploadFileMiddleware from './Middlewares/UploadFileMiddleware'
import AuthController from './Controllers/AuthController'
import UserController from './Controllers/UserController'
import HomeController from './Controllers/HomeController'
import UploadFileController from './Controllers/UploadFileController';

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

/** Upload  for exemple */
routes.post('/api/upload', AuthMiddleware, UploadFileMiddleware, UploadFileController.upload)
routes.get('/api/files', AuthMiddleware, UploadFileMiddleware, UploadFileController.index)

/** Home */
routes.get('*', HomeController.index)

export default routes
