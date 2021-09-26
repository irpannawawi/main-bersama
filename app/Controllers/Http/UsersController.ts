import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import user from 'App/Models/user'
import Otp from 'App/Models/Otp'
import Mail from '@ioc:Adonis/Addons/Mail'
var otpGenerator = require('otp-generator')


export default class UsersController {

	public async index({request, response}: HttpContextContract){
		const users = await user.all()
		response.ok({ message: "Ok", data: users })
	}
	public async store({request, response}: HttpContextContract){

		try{
			// vaidate user input 
			const data = await request.validate(UserValidator)

			let otp_code = otpGenerator.generate(6,{alphabets: false, specialChars: false, upperCase: false})
			
			// send otp 
			await Mail.send((message) => {
		    	message
			        .from('irpan@nawawisoft.xyz')
			        .to(data.email)
			        .subject('Welcome Onboard!')
			        .htmlView('mail_otp', { code: otp_code, name: data.name })
		    })

			const newUser = await user.create(data)
			const resData = {
				message: `Email ${data.email} registered, we have sent you a message in email with the OTP code. please verify your account to complete the registration`
			}

			const otpId = await Otp.create({ user_id: newUser.id, otp: otp_code })
			
			return response.created(resData)
		}catch(error){
			return response.badRequest(error)
		}

	}

	public async update({ request, response }: HttpContextContract){
		const newData = request.body()
		const userId = request.param('id')
		const userData = await user.find(userId)
		userData.merge(newData)
		await userData.save()
		response.ok({message: 'User updated', data: userData})
	}



}
