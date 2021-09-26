import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Venue from 'App/Models/Venue'
import Booking from 'App/Models/Booking'

export default class Field extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public type: string

  @column()
  public venue_id: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => Venue, { foreignKey: 'venue_id', })
  public venue: BelongsTo<typeof Venue>

  @hasMany(()=> Booking,{foreignKey: 'field_id'})
  public booking: HasMany<typeof Booking>
}
