import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserValidator from 'App/Validators/UserValidator'
import user from 'App/Models/user'
import Otp from 'App/Models/Otp'
import Mail from '@ioc:Adonis/Addons/Mail'
var otpGenerator = require('otp-generator')

export default class AuthController {
	public async register({request, response}: HttpContextContract){

		try{
			// vaidate user input 
			const data = await request.validate(UserValidator)

			let otp_code = otpGenerator.generate(6,{alphabets: false, specialChars: false, upperCase: false})
			
			// send otp 
			const mail = await Mail.send((message) => {
		    	message
			        .from('irpan@nawawisoft.xyz')
			        .to(data.email)
			        .subject('Welcome Onboard!')
			        .htmlView('mail_otp', { code: otp_code, name: data.name })
		    })

			
			const newUser = await user.create(data)
			const resData = {
				message: `Email ${data.email} registered, we have sent you a email with the OTP code. please verify your account to complete the registration`,
				emailResult: mail
			}

			const otpId = await Otp.create({ user_id: newUser.id, otp: otp_code })
			
			return response.ok(resData)
			
		}catch(error){
			return response.badRequest(error)
		}

	}

	public async login({ request, response, auth }: HttpContextContract){
		try{
			const email 	= request.input('email')
			const password 	= request.input('password')
			const role 		= request.input('role')!=''?request.input('role'):'user';
			const token 	= await auth.use('api').attempt(email, password)

			return response.ok({ message: "Login Success!!", auth: token }) 
		}
	}

	public async verify({ request, response }: HttpContextContract){
		
		const email = request.input('email')
		const otp = request.input('otp_code')

		// find user with by their email
		const userData = await user.findBy('email', email)
		if(userData != null){
			// user found
			// verify otp
			let validOtp = await userData.related('otp').query()
			if(validOtp.otp == otp || userData.verified == true){
				// otp valid 
				// update user verified status
				userData.verified = true
				userData.save()
				response.ok(userData) 
			}else{
				response.badRequest({message: "invalid otp code", otp, validOtp})
			}
		}else{
				response.badRequest({message: "invalid email address"})
		}
	}

}
