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
Object.defineProperty(exports, "__esModule", { value: true });
const Orm_1 = global[Symbol.for('ioc.use')]("Adonis/Lucid/Orm");
const user_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/user"));
const Booking_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Booking"));
class UserHasBooking extends Orm_1.BaseModel {
}
UserHasBooking.table = 'user_has_bookings';
__decorate([
    Orm_1.column({ isPrimary: true }),
    __metadata("design:type", Number)
], UserHasBooking.prototype, "id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], UserHasBooking.prototype, "user_id", void 0);
__decorate([
    Orm_1.column(),
    __metadata("design:type", Number)
], UserHasBooking.prototype, "booking_id", void 0);
__decorate([
    Orm_1.belongsTo(() => user_1.default, { foreignKey: 'user_id' }),
    __metadata("design:type", Object)
], UserHasBooking.prototype, "users", void 0);
__decorate([
    Orm_1.belongsTo(() => Booking_1.default, { foreignKey: 'booking_id' }),
    __metadata("design:type", Object)
], UserHasBooking.prototype, "bookings", void 0);
exports.default = UserHasBooking;
//# sourceMappingURL=UserHasBooking.js.map