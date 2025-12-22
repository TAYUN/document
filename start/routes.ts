/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

const CategoriesController = () => import('#controllers/categories_controller')
import router from '@adonisjs/core/services/router'

router.get('/', async () => 'welcome')

router.resource('category', CategoriesController).apiOnly()
