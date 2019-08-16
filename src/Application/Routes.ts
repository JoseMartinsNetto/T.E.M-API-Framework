import { Router } from 'express'
import AuthMiddleware from './Middlewares/AuthMiddleware'
import UploadFileMiddleware from './Middlewares/UploadFileMiddleware'
import AuthController from './Controllers/AuthController'
import UserController from './Controllers/UserController'
import HomeController from './Controllers/HomeController'
import UploadFileController from './Controllers/UploadFileController'

const routes = Router()

/** Auth */
routes.post('/signup', AuthController.signup)
routes.post('/authenticate', AuthController.authenticate)
routes.post('/forgot-password', AuthController.forgotPassword)
routes.patch('/reset-password', AuthController.resetPassword)

/** User */
routes.get('/users', AuthMiddleware, UserController.index)
routes.post('/users', AuthMiddleware, UserController.store)
routes.put('/users/:id', AuthMiddleware, UserController.edit)

/** Upload  for exemple */
routes.post('/upload', AuthMiddleware, UploadFileMiddleware, UploadFileController.upload)
routes.get('/files', AuthMiddleware, UploadFileMiddleware, UploadFileController.index)
routes.delete('/files/:id', AuthMiddleware, UploadFileController.delete)

/** Home */
routes.get('*', HomeController.index)

export default routes
