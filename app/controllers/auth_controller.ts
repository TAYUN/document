import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request, auth }: HttpContext) {
    const { name, password } = request.all()
    console.log('name', name)
    return name
  }

  async register({ request, auth }: HttpContext) {
    const { name, password } = request.all()
    console.log('name', name)
    return name
  }
}
