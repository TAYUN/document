import vine, { SimpleMessagesProvider } from '@vinejs/vine'
import { validateFields, validateMessage } from './zh/lang.js'

/**
 * Validator to validate the payload when creating
 * a new category.
 */
export const createCategoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(10),
  })
)

export const createCategoryMessagesValidator = new SimpleMessagesProvider(
  {
    ...validateMessage,
    maxLength: '{{ field }} 不能超过 {{ max }} 个字符!!!!!',
  },
  {
    ...validateFields,
    title: '栏目名称',
  }
)
/**
 * Validator to validate the payload when updating
 * an existing category.
 */
export const updateCategoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(50).optional(),
  })
)
