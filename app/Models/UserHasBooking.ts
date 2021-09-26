import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import user from 'App/Models/user'
import Booking from 'App/Models/Booking'

export default class UserHasBooking extends BaseModel {
  public static table = 'user_has_bookings'

  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number

  @column()
  public booking_id: number

  @belongsTo(() => user, {foreignKey: 'user_id'})
  public users: BelongsTo<typeof user>

  @belongsTo(() => Booking,{ foreignKey: 'booking_id' })
  public bookings: BelongsTo<typeof Booking>
}
