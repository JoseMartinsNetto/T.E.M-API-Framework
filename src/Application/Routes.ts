import { Router } from 'express'
import AuthMiddleware from './Http/Middlewares/AuthMiddleware'
import UploadFileMiddleware from './Http/Middlewares/UploadFileMiddleware'
import AuthController from './Http/Controllers/AuthController'
import UserController from './Http/Controllers/UserController'
import UploadFileController from './Http/Controllers/UploadFileController'
import ErrorHandlingMiddleware from './Http/Middlewares/ErrorHandlingMiddleware'
import HttpCodes from './Http/HttpCodes'
import path from 'path'

const routes = Router()

routes.use(ErrorHandlingMiddleware)

/** Auth */
routes.post('/signup', AuthController.signup)
routes.post('/authenticate', AuthController.authenticate)
routes.post('/forgot-password', AuthController.forgotPassword)
routes.patch('/reset-password', AuthController.resetPassword)

/** User */
routes.get('/users', [AuthMiddleware], UserController.index)
routes.post('/users', [AuthMiddleware], UserController.store)
routes.put('/users/:id', [AuthMiddleware], UserController.edit)

/** Upload  for exemple */
routes.post('/upload', [AuthMiddleware, UploadFileMiddleware], UploadFileController.upload)
routes.get('/files', [AuthMiddleware, UploadFileMiddleware], UploadFileController.index)
routes.delete('/files/:id', [AuthMiddleware], UploadFileController.delete)

// routes.get()

export default routes
