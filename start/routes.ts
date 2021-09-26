/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})
Route.group(()=>{
  Route.group(()=>{
    Route.resource('venues', 'VenuesController').only(['show', 'store', 'update'])
    Route.resource('venues.fields', 'FieldsController').apiOnly()
    Route.group(()=>{
      Route.resource('users', 'UsersController').only(['index', 'show', 'store', 'update'])
    }).middleware('adminOnly') // Only admin 
  }).middleware('strictUser') // Only admin or venue_owner
  Route.get('/fields/:id', 'BookingsController.getField')
  
  Route.get('/schedules', 'BookingsController.schedules')
  Route.get('/bookings', 'BookingsController.index')
  Route.put('/bookings/:id/join', 'BookingsController.joinBookings')
  Route.put('/bookings/:id/unjoin', 'BookingsController.unjoinBookings')
  Route.get('/bookings/:id', 'BookingsController.getBookings')
  Route.post('/venues/:id/bookings', 'BookingsController.bookings')
  Route.get('/venues', 'VenuesController.index')
}).middleware(['auth', 'verify'])

Route.get('/mail', 'AuthController.mail')
Route.post('/register', 'AuthController.register')
Route.post('/login', 'AuthController.login')
Route.post('/otp-confirmation', 'AuthController.verify')