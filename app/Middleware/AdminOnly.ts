import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AdminOnly {
  public async handle ({response, auth}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const user = auth.user

    if(user.role == 'admin'){
      await next()
    }else{
      return response.unauthorized({message: 'You are not allowed to access tihs url', role: user.role})
    }
  }
}
