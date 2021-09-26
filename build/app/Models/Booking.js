"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const luxon_1 = require("luxon");
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const UserHasBooking_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/UserHasBooking"));
const user_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/user"));
const Field_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Field"));
class Booking extends Orm_1.BaseModel {
}
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], Booking.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Booking.prototype, "field_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Booking.prototype, "players_count", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], Booking.prototype, "booking_user_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", typeof (_a = typeof datetime !== "undefined" && datetime) === "function" ? _a : Object)
], Booking.prototype, "play_date_start", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", typeof (_b = typeof datetime !== "undefined" && datetime) === "function" ? _b : Object)
], Booking.prototype, "play_date_end", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Booking.prototype, "createdAt", void 0);
__decorate([
    Orm_1.column.dateTime({ autoCreate: true, autoUpdate: true }),
    __metadata("design:type", luxon_1.DateTime)
], Booking.prototype, "updatedAt", void 0);
__decorate([
    Orm_1.hasMany(() => UserHasBooking_1.default, { foreignKey: 'booking_id' }),
    __metadata("design:type", Object)
], Booking.prototype, "UserHasBooking", void 0);
__decorate([
    Orm_1.belongsTo(() => user_1.default, { foreignKey: 'booking_user_id' }),
    __metadata("design:type", Object)
], Booking.prototype, "users", void 0);
__decorate([
    Orm_1.belongsTo(() => Field_1.default, { foreignKey: 'field_id' }),
    __metadata("design:type", Object)
], Booking.prototype, "field", void 0);
exports.default = Booking;
//# sourceMappingURL=Booking.js.map