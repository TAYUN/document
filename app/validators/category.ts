import vine from '@vinejs/vine'
import { validateMessageProvider } from './zh/formValidator.js'

/**
 * Validator to validate the payload when creating
 * a new category.
 */
export const createCategoryValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(10),
  })
)

export const createCategoryMessagesValidator = validateMessageProvider(
  {},
  {
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
