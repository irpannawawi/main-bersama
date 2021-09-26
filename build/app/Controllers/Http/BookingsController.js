"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Booking_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Booking"));
const UserHasBooking_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UserHasBooking"));
const Field_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Field"));
class BookingsController {
    async index({ request, response }) {
        const bookingList = await Booking_1.default.query().preload('field').preload('users');
        response.ok({ message: 'berhasil get all bookings', data: bookingList });
    }
    async bookings({ request, response, auth }) {
        const bookingSchema = Validator_1.schema.create({
            field_id: Validator_1.schema.number(),
            play_date_start: Validator_1.schema.string(),
            play_date_end: Validator_1.schema.string()
        });
        const book = await request.validate({ schema: bookingSchema });
        const userId = auth.user?.id;
        const fieldId = request.param('id');
        const startDate = book.play_date_start;
        const endDate = book.play_date_end;
        const newBooking = {
            field_id: fieldId,
            booking_user_id: userId,
            play_date_end: endDate,
            play_date_start: startDate
        };
        try {
            const booking = await Booking_1.default.create(newBooking);
            let userBooked = {
                booking_id: booking.id,
                user_id: booking.booking_user_id
            };
            console.log(userBooked);
            const res = await booking.related('UserHasBooking').create(userBooked);
            response.ok({ message: "berhasil booking" });
        }
        catch (error) {
            response.badRequest({ message: error });
        }
    }
    async getField({ request, response }) {
        const fieldId = request.param('id');
        const fieldData = await Field_1.default
            .query()
            .where('id', fieldId)
            .select('id', 'name', 'type', 'venue_id')
            .preload('venue', (query) => {
            query.select(['name', 'address', 'phone']);
        })
            .preload('booking', (bookingQuery) => {
            bookingQuery.select(['id', 'field_id', 'play_date_start', 'play_date_end', 'booking_user_id']);
        });
        response.ok({ message: 'berhasil get data booking', data: fieldData });
    }
    async getBookings({ request, response }) {
        const bookingId = request.param('id');
        const bookings = await Booking_1.default
            .query()
            .where('bookings.id', bookingId)
            .select(['id', 'field_id', 'booking_user_id', 'play_date_start', 'play_date_end'])
            .withAggregate('UserHasBooking', (query) => {
            query.count('*').as('players_count');
        });
        const player_list = await UserHasBooking_1.default.query()
            .preload('users', (query) => {
            query.select('name', 'email');
        });
        const players = [];
        for (let i = 0; i < player_list.length; i++) {
            players[i] = player_list[i].users;
        }
        const pls = { players: players, ...bookings };
        const book = { id: bookings[0].id,
            field_id: bookings[0].field_id,
            booking_user_id: bookings[0].booking_user_id,
            play_date_start: bookings[0].play_date_start,
            play_date_end: bookings[0].play_date_end,
            players_count: bookings[0].players_count
        };
        const all_players = { ...book, players: players };
        response.ok({ message: "berhasil get data booking by id", data: all_players });
    }
    async joinBookings({ request, response, auth }) {
        const bookingId = request.param('id');
        const userId = auth.user?.id;
        const bookingData = await UserHasBooking_1.default.query()
            .where('user_id', userId)
            .where('booking_id', bookingId);
        if (bookingData.length >= 1) {
            return response.badRequest({ message: "you have already join tihs group" });
        }
        else {
            const newMember = await UserHasBooking_1.default.create({
                user_id: userId,
                booking_id: bookingId
            });
            response.ok({ message: "berhasil join booking" });
        }
    }
    async unjoinBookings({ request, response, auth }) {
        const bookingId = request.param('id');
        const userId = auth.user?.id;
        const bookingData = await UserHasBooking_1.default.query()
            .where('user_id', userId)
            .where('booking_id', bookingId)
            .delete();
        if (bookingData.length >= 1) {
            return response.ok({ message: "Berhasil unjoin" });
        }
        else {
            response.ok({ message: "berhasil join booking" });
        }
    }
    async schedules({ request, response, auth }) {
        const userId = auth.user.id;
        const schedules = await Booking_1.default.query().whereHas('UserHasBooking', (query) => {
            query.where('user_id', userId);
        }).preload('field');
        response.ok({ message: 'berhasil get schedules', user_id: userId, data: schedules });
    }
}
exports.default = BookingsController;
//# sourceMappingURL=BookingsController.js.map