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
// ReturnType<typeof validator.validate> 的问题 ：
// 正如我之前提到的， validator.validate 返回的是 Promise<Data> 。如果你把它作为泛型 T 传给 FormValidator ，那么 validate 方法返回的 Promise<T> 就会变成 Promise<Promise<Data>> ，这通常是不对的。你需要提取 Promise 内部的类型。
export class FormValidator<Output extends Record<string, any>> {
  private validateMessage: Record<string, any> = {}
  private validateFields: Record<string, any> = {}

  constructor(private validator: VineValidator<any, Output>) {}

  static rules<Schema extends Record<string, any>>(rules: Schema) {
    const vineSchema = vine.object(rules)
    const validator = vine.compile(vineSchema)
    type DataType = Infer<typeof vineSchema>
    return new FormValidator<DataType>(validator)
  }

  message(message: Record<string, any>) {
    this.validateMessage = message
    return this
  }

  fields(fields: Record<string, any>) {
    this.validateFields = fields
    return this
  }

  async validate(request: Request): Promise<Output> {
    const messageProvider = validateMessageProvider(this.validateMessage, this.validateFields)
    const result = await request.validateUsing(this.validator, messageProvider as any)
    return result
  }
}
