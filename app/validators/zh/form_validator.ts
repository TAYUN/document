import type { HttpContext } from '@adonisjs/core/http'
import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'
import { validateFields, validateMessage } from './lang.js'

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

type CtxType = Partial<Omit<HttpContext, 'request'>> & Pick<HttpContext, 'request'>
export class FormValidator<T extends Record<string, any>> {
  private validateMessage: Record<string, any> = {}
  private validateFields: Record<string, any> = {}

  constructor(protected callback: (ctx: CtxType) => T) {}

  static rules<D extends Record<string, any>>(callback: (ctx: CtxType) => D) {
    return new FormValidator(callback)
  }

  execute<Schema extends Record<string, any>>(rules: Schema) {
    const vineSchema = vine.object(rules)
    const validator = vine.compile(vineSchema)
    // type DataType = Infer<typeof vineSchema>
    return validator
  }

  message(message: Record<string, any>) {
    this.validateMessage = message
    return this
  }

  fields(fields: Record<string, any>) {
    this.validateFields = fields
    return this
  }

  async validate(ctx: CtxType) {
    const rules = this.callback(ctx)
    const compile = this.execute(rules)
    const messageProvider = validateMessageProvider(this.validateMessage, this.validateFields)
    const result = await ctx.request!.validateUsing(compile, messageProvider as any)
    return result as Infer<typeof compile>
  }
}
