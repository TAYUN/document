import { CategoryFactory } from '#database/factories/category_factory'
import Category from '#models/category'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await CategoryFactory.createMany(3)
    // const category = await Category.find(1)
    // console.log('category', category)
  }
}
