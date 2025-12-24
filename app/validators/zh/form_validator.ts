import vine, { SimpleMessagesProvider, VineValidator } from '@vinejs/vine'
import { validateFields, validateMessage } from './lang.js'
import type { Request } from '@adonisjs/core/http'
import { Infer } from '@vinejs/vine/types'

export const validateMessageProvider = (message = {}, fields = {}) => ({
  messagesProvider: new SimpleMessagesProvider(
    {
      ...validateMessage,
      ...message,
    },
    {
      ...validateFields,
      ...fields,
    }
  ),
})

// export const formValidator = <T extends Record<string, any>>(
//   rules: T,
//   message = {},
//   fields = {}
// ) => {
//   const validator = vine.compile(vine.object(rules))
//   type SchemaType = ReturnType<typeof validator.validate>
//   const messageProvider = validateMessageProvider(message, fields)
//   return async (request: Request): Promise<SchemaType> => {
//     const result = request.validateUsing(validator, messageProvider)
//     return result as SchemaType
//   }
// }

// export const formValidator = <T extends Record<string, any>>(
//   rules: T,
//   message = {},
//   fields = {}
// ) => {
//   // 1. 创建 Schema
//   const schema = vine.object(rules)

//   // 2. 编译验证器
//   const validator = vine.compile(schema)

//   // 3. 推导数据类型（注意：这里推导出来的是纯数据类型，不是 Promise）
//   type DataType = Infer<typeof schema>

//   const messageProvider = validateMessageProvider(message, fields)

//   // 4. 返回处理函数
//   // 这个函数接收 Request，返回 Promise<DataType>
//   return async (request: Request): Promise<DataType> => {
//     // validateUsing 会自动返回 DataType 类型的数据
//     return request.validateUsing(validator, messageProvider)
//   }
// }

export class FormValidator<T extends Record<string, any>> {
  private validateMessage: Record<string, any> = {}
  private compile?: VineValidator<any, Record<string, any> | undefined>
  private validateFields: Record<string, any> = {}
  static rules<D extends Record<string, any>>(rules: D) {
    const validator = vine.compile(vine.object(rules))
    const instance = new FormValidator<ReturnType<typeof validator.validate>>()
    instance.compile = validator
    return instance
  }
  message(message: Record<string, any>) {
    this.validateMessage = message
    return this
  }

  fields(fields: Record<string, any>) {
    this.validateFields = fields
    return this
  }
  async validate(request: Request): Promise<T> {
    const messageProvider = validateMessageProvider(this.validateMessage, this.validateFields)
    const result = request.validateUsing(this.compile!, messageProvider)
    return result as T
  }
}
