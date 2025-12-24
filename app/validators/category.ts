import vine from '@vinejs/vine'
import { FormValidator } from './zh/form_validator.js'

const rules = {
  title: vine.string().trim().minLength(2).maxLength(10),
}

/**
 * Validator to validate the payload when creating
 * a new category.
 */
// export const createCategoryValidator = formValidator({ ...rules }, {}, fields)
export const createCategoryValidator = FormValidator.rules(rules).fields({
  title: '栏目名称@@@@@',
})

/**
 * Validator to validate the payload when updating
 * an existing category.
 */
// export const updateCategoryValidator = formValidator(
//   {
//     ...rules,
//   },
//   {},
//   fields
// )
