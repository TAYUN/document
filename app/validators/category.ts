import vine from '@vinejs/vine'
import { FormValidator } from './zh/form_validator.js'

const rules = {
  title: vine.string().trim().minLength(2).maxLength(5),
}

export const createCategoryValidator = FormValidator.rules(() => {
  return rules
})

export const updateCategoryValidator = FormValidator.rules(() => {
  return {
    title: vine
      .string()
      .trim()
      .minLength(2)
      .maxLength(5)
      .unique(async (db, value, field) => {
        const category = await db
          .from('categories')
          .where('title', value)
          .whereNot('id', field.data.params.id)
          .first()
        return !category
      }),
  }
})
