import type { HttpContext } from '@adonisjs/core/http'
import BasesController from './bases_controller.js'
import User from '#models/user'

export default class AuthController extends BasesController {
  async login({ request, auth }: HttpContext) {
    const { name, password } = request.all()
    console.log('name', name)
    const user = await User.findBy('name', name)
    if (!user) {
      return this.error()
    }
    return name
  }

  async register({ request, auth }: HttpContext) {
    const { name, password } = request.all()
    console.log('name', name)
    return name
  }
}
