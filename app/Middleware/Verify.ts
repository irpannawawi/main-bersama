import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import user from 'App/Models/user'


export default class Verify {
  public async handle ({ response, auth }: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const status = auth.user?.verified
    if(status == true){
      await next()
    }else{
      return response.unauthorized({message: "This account not verified"})
    }
  }
}
