import { DateTime } from 'luxon'
import { BaseModel, column hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import user from 'App/Models/user'

export default class Otp extends BaseModel {
  public static table = 'otp_codes'

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public otp: string

  @column.dateTime({ autoCreate: true })
  public created_at: DateTime

  @hasOne(()=> user)
  public user: HasOne<typeof user>
}
