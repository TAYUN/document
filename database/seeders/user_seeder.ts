import { UserFactory } from '#database/factories/user_factory'
import { Role } from '#enums/role'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const users = await UserFactory.createMany(3)
    const user = users[0]
    user.name = 'admin'
    user.role = Role.ADMIN
    await user.save()
    const user1 = users[1]
    user1.name = 'user'
    await user1.save()
  }
}
