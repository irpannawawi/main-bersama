import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Field from '../../Models/Field'
import Venue from '../../Models/Venue'

export default class FieldsController {
	//show all data 
	public async index({request, response, auth}: HttpContextContract){
		
		const venueId: number = request.param('venue_id');
		const fields = await Field.findBy('venue_id', venueId)
		let resData = {
			status: 'ok',
			data: fields 
		}
		response.send(resData);
	}

	//show specific data 
	public async show({request, response}: HttpContextContract){
		const venueId: number = request.param('venue_id')
		const fieldId: number = request.param('id')

		const field = await Field.findOrFail(fieldId)

		let resData = {
			status: 'ok',
			// fields: insertId,
			data: field 
		}
		response.send(resData);
	}


	public async store({request, response}: HttpContextContract){
		const venuesId = request.param('venue_id')

		const fieldsSchema = schema.create({
			name: schema.string({
				trim: true
			}),
			type: schema.string({
				trim: true
			})
		});

		const data = await request.validate({schema: fieldsSchema});

		const dataToInsert = {
			name: data.name,
			type: data.type
		}

		let venues = await Venue.find(venuesId)
		let insertId = await venues.related('fields').create(dataToInsert)
		let resData = {
			status: 'ok',
			insertId: insertId,
			newData: dataToInsert 
		}
		response.ok({ "message": "berhasil menambahkan data field baru", data: resData })

	}

	public async update({request, response}: HttpContextContract){
		const fieldId = request.param('id')

		const fieldsSchema = schema.create({
			name: schema.string.optional({
				trim: true
			}),
			type: schema.string.optional({
				trim: true
			}),
			venue_id: schema.number.optional()
		});

		const data = await request.validate({schema: fieldsSchema});
		const date = new Date();

		const datetime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
		data.updated_at = datetime
		

		let updateId = await Database.from('fields').where('id',fieldId).update(data)
		let resData = {
			status: 'ok',
			newData: data 
		}
		response.json(resData)

	}


	public async destroy({request, response}: HttpContextContract){
		const fieldId = request.param('id')

		let updateId = await Database.from('fields').where('id',fieldId).delete()
		let resData = {
			status: 'ok',
			message: "Field was deleted" 
		}
		response.json(resData)

	}
}
