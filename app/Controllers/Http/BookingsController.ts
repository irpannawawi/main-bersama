import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Booking from 'App/Models/Booking'
import UserHasBooking from 'App/Models/UserHasBooking'
import Field from 'App/Models/Field'

export default class BookingsController {
	public async index({ request, response }: HttpContextContract){
		const bookingList = await Booking.query().preload('field').preload('users')

		response.ok({message: 'berhasil get all bookings', data: bookingList})
	}

	public async bookings({request, response, auth}: HttpContextContract){
		const bookingSchema = schema.create({
			field_id: schema.number(),
			play_date_start: schema.string(),
			play_date_end: schema.string()
		});

		const book = await request.validate({ schema: bookingSchema })
		
		const userId = auth.user?.id
		const fieldId = request.param('id')
		const startDate = book.play_date_start
		const endDate = book.play_date_end

		const newBooking = {
			field_id: fieldId,
			booking_user_id: userId,
			play_date_end: endDate,
			play_date_start: startDate 
		}

		try{
			const booking = await Booking.create(newBooking)
			let userBooked = {
				booking_id: booking.id, 
				user_id: booking.booking_user_id
			}
			console.log(userBooked)
			const res = await booking.related('UserHasBooking').create(userBooked)
			response.ok({ message: "berhasil booking" })
		}catch(error){
			response.badRequest({message: error})
		}

	}

	public async getField({  request, response }: HttpContextContract){
		const fieldId = request.param('id')
		const fieldData = await Field
								.query()
								.where('id',fieldId)
								.select('id', 'name','type','venue_id')
								.preload('venue',(query)=>{
									query.select(['name','address','phone'])
								})
								.preload('booking', (bookingQuery)=>{
									bookingQuery.select(['id','field_id', 'play_date_start', 'play_date_end', 'booking_user_id'])
								})

		response.ok({message: 'berhasil get data booking', data:fieldData})
	}

	public async getBookings({ request, response }: HttpContextContract){
		const bookingId = request.param('id')

		const bookings = await Booking
								.query()
								.where('bookings.id', bookingId)
								.select(['id','field_id','booking_user_id','play_date_start','play_date_end'])	
								.withAggregate('UserHasBooking', (query)=>{
									query.count('*').as('players_count')
								})

		const player_list = await UserHasBooking.query()
											.preload('users', (query)=>{
												query.select('name','email')
											})
		const players = []
		for(let i =0; i<player_list.length; i++){
			players[i] = player_list[i].users
		}
			
		const pls = { players: players, ...bookings }
		// bookings.players = players
		const book = { 	id: bookings[0].id,
			            field_id: bookings[0].field_id,
			            booking_user_id: bookings[0].booking_user_id,
			            play_date_start: bookings[0].play_date_start,
			            play_date_end: bookings[0].play_date_end,
			            players_count: bookings[0].players_count
        }
		const all_players = { ...book, players: players }
		response.ok({message: "berhasil get data booking by id", data: all_players})
	}

	public async joinBookings({ request, response, auth }: HttpContextContract){
		// get id booking
		const bookingId = request.param('id')
		const userId = auth.user?.id

		// check user already joined


		const bookingData = await UserHasBooking.query()
									.where('user_id',userId)
									.where('booking_id', bookingId)
		if(bookingData.length>=1){
			return response.badRequest({message: "you have already join tihs group"})
		}else{
			const newMember = await UserHasBooking.create({
				user_id: userId,
				booking_id: bookingId
			})
			response.ok({message: "berhasil join booking" })

		}
	}

	public async unjoinBookings({ request, response, auth }: HttpContextContract){
		// get id booking
		const bookingId = request.param('id')
		const userId = auth.user?.id

		// check user already joined


		const bookingData = await UserHasBooking.query()
									.where('user_id',userId)
									.where('booking_id', bookingId)
									.delete()
		if(bookingData.length>=1){
			return response.ok({message: "Berhasil unjoin"})
		}else{
			
			response.ok({message: "berhasil join booking" })

		}
	}

	public async schedules({ request, response, auth }: HttpContextContract){
		const userId = auth.user.id

		const schedules = await Booking.query().whereHas('UserHasBooking', (query)=>{
			query.where('user_id', userId)
		}).preload('field')
		// await UserHasBooking.query().where('user_id', userId).preload('bookings')

		response.ok({ message: 'berhasil get schedules', user_id: userId, data: schedules })
	}
}
