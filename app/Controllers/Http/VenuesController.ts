import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database'
import Venue from '../../Models/Venue'
import Field from '../../Models/Field'

export default class VenuesController {
	
	//show all data 
	public async index({response}: HttpContextContract){
		const venues = await Venue.all()

		for(let i in venues){
			venues[i].fields = await venues[i].related('fields').query()
		}
		// venues.fields = await venues.related('fields').query()
		response.send(venues);
	}

	//show specific data 
	public async show({request, response}: HttpContextContract){
		let id: number;
		id = request.param('id') 

		const venue = await Venue.find(id)
		venue.fields = await venue.related('fields').query()
		if (!venue) {
		  return
		}
		response.ok({message: "berhasil get data venue by id", venue});
	}

	public async store({request, response}: HttpContextContract){
		const venueSchema = schema.create({
			name: schema.string({
				trim: true
			}),
			address: schema.string({
				trim: true
			}),
			phone: schema.string({},[
				rules.mobile({
					locales: ['id-ID'],
					strict: true
				}),
			])
		});

		const data 		= await request.validate({schema: venueSchema});
		const insertId 	= await Venue.create(data)
		
		let resData = {
			status: 'ok',
			newData: insertId
		}
		
		response.json(resData)

	}

	public async update({request, response}: HttpContextContract){
		let id: number;
		id = request.param('id') 
		const venueSchema = schema.create({
			name: schema.string.optional({
				trim: true
			}),
			address: schema.string.optional({
				trim: true
			}),
			phone: schema.string.optional({},[
				rules.mobile({
					locales: ['id-ID'],
					strict: true
				}),
			]),
			updated_at: schema.string.optional({trim:true})
		});

		const data = await request.validate({schema: venueSchema});

		const vn = await Venue.find(id)
		vn.merge(data)
		vn.save()
		let resData = {
			status: 'ok',
			venueId: id,
			updateData: data 
		}
		response.send(resData);
	}

	//show specific data 
	public async destroy({request, response}: HttpContextContract){
		let id: number;
		id = request.param('id') 

		const venues = await Venue.findOrFail(id)
		await venues.delete()
		let resData = {
			status: 'ok',
			venueId: id,
			message: "Data deleted" 
		}
		response.send(resData);
	}

}
