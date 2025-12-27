import vine from '@vinejs/vine'
import { FormValidator } from './zh/form_validator.js'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export const loginValidator = FormValidator.rules(() => {
  let userInstance: User | null = null
  return {
    name: vine
      .string()
      .minLength(3)
      .maxLength(20)
      .exists(async (_db, value, _field) => {
        userInstance = await User.query().where('name', value).first()
        return !!userInstance
      }),
    password: vine
      .string()
      .minLength(6)
      .maxLength(20)
      .exists(async (_db, value, _field) => {
        if (userInstance) {
          return !!(await hash.verify(userInstance?.password, value))
        }
        return true
      }),
  }
})
  .fields({
    name: '用户名',
  })
  .message({
    'password.database.exists': '用户名或密码错误',
  })

export const registerValidator = FormValidator.rules(() => ({
  name: vine
    .string()
    .minLength(3)
    .maxLength(20)
    .unique(async (_db, value, _field) => {
      const user = await User.query().where('name', value).first()
      return !user
    }),
  password: vine
    .string()
    .minLength(6)
    .maxLength(20)
    .confirmed({ confirmationField: 'passwordConfirmation' }),
}))
  .fields({ name: '用户名' })
  .message({ 'name.database.unique': '用户名已存在' })
