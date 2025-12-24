import Category from '#models/category'
import { createCategoryValidator, updateCategoryValidator } from '#validators/category'
import type { HttpContext } from '@adonisjs/core/http'

export default class CategoriesController {
  /**
   * Display a list of resource
   */
  async index({}: HttpContext) {
    return Category.all()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await createCategoryValidator.validate({ request })
    const category = await Category.create(payload)
    return category
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return category
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const payload = await updateCategoryValidator.validate({ request })
    const category = await Category.findOrFail(params.id)
    category.merge(payload)
    await category.save()
    return category
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
  }
}
