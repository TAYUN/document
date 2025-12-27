import type { HttpContext } from '@adonisjs/core/http'
import BasesController from './bases_controller.js'
import User from '#models/user'
import { loginValidator, registerValidator } from '#validators/auth'
// import hash from '@adonisjs/core/services/hash'

export default class AuthController extends BasesController {
  async login({ request, auth }: HttpContext) {
    // const { name, password } = request.all()
    // const user = await User.findBy('name', name)
    // if (!user) {
    //   return this.error('用户不存在')
    // }
    // if (!(await hash.verify(user.password, password))) {
    //   return this.error('密码错误')
    // }
    // const token = await User.accessTokens.create(user)
    // return { token, user }

    // try {
    //   const user = await User.verifyCredentials(name, password)
    //  //  const token = await User.accessTokens.create(user)
    //   const token = await auth.use('api').createToken(user)
    //   return { token, user }
    // } catch (error) {
    //   return this.error('用户名或密码错误')
    // }
    const payload = await loginValidator.validate({ request })
    const user = await User.findByOrFail('name', payload.name)
    const token = await auth.use('api').createToken(user)

    return { token, user }
  }

  async register({ request, auth }: HttpContext) {
    const payload = await registerValidator.validate({ request })
    const user = await User.create(payload)
    const token = await auth.use('api').createToken(user)
    return { token, user }
  }
}
