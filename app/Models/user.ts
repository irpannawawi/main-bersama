import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  column,
  beforeSave,
  BaseModel,
  HasMany,
  hasMany,
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'
import Booking from 'App/Models/Booking'
import Otp from 'App/Models/Otp'

export default class user extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public email: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string
  
  @column()
  public role: string

  @column()
  public verified: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => Booking, {foreignKey: 'booking_user_id'})
  public booking: HasMany<typeof Booking>

  @hasOne(()=> Otp, {foreignKey: 'user_id'})
  public otp: HasOne<typeof Otp>

  @beforeSave()
  public static async hashPassword (user: user) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}
