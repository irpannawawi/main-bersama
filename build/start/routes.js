"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Core/Route"));
Route_1.default.get('/', async () => {
    return { hello: 'world' };
});
Route_1.default.group(() => {
    Route_1.default.group(() => {
        Route_1.default.resource('venues', 'VenuesController').only(['show', 'store', 'update']);
        Route_1.default.resource('venues.fields', 'FieldsController').apiOnly();
        Route_1.default.group(() => {
            Route_1.default.resource('users', 'UsersController').only(['index', 'show', 'store', 'update']);
        }).middleware('adminOnly');
    }).middleware('strictUser');
    Route_1.default.get('/fields/:id', 'BookingsController.getField');
    Route_1.default.get('/schedules', 'BookingsController.schedules');
    Route_1.default.get('/bookings', 'BookingsController.index');
    Route_1.default.put('/bookings/:id/join', 'BookingsController.joinBookings');
    Route_1.default.put('/bookings/:id/unjoin', 'BookingsController.unjoinBookings');
    Route_1.default.get('/bookings/:id', 'BookingsController.getBookings');
    Route_1.default.post('/venues/:id/bookings', 'BookingsController.bookings');
    Route_1.default.get('/venues', 'VenuesController.index');
}).middleware(['auth', 'verify']);
Route_1.default.get('/mail', 'AuthController.mail');
Route_1.default.post('/register', 'AuthController.register');
Route_1.default.post('/login', 'AuthController.login');
Route_1.default.post('/otp-confirmation', 'AuthController.verify');
//# sourceMappingURL=routes.js.map