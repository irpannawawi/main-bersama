import { DateTime } from 'luxon'
import { BaseModel, column,
  hasOne,
  HasOne,
  HasMany,
  hasMany,
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'

import UserHasBooking from 'App/Models/UserHasBooking'
import user from 'App/Models/user'
import Field from 'App/Models/Field'

export default class Booking extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public field_id: number  

  @column()
  public players_count: number

  @column()
  public booking_user_id: number

  @column()
  public play_date_start: datetime

  @column()
  public play_date_end: datetime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @hasMany(() => UserHasBooking, { foreignKey: 'booking_id' })
  public UserHasBooking: HasMany<typeof UserHasBooking>

  @belongsTo(() => user, , { foreignKey: 'booking_user_id' })
  public users: BelongsTo<typeof user>

  @belongsTo(() => Field, { foreignKey: 'field_id' })
  public field: BelongsTo<typeof Field>

}
