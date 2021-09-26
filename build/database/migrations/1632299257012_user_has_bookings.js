"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class UserHasBookings extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'user_has_bookings';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('user_id').unsigned().references('users.id');
            table.integer('booking_id').unsigned().references('bookings.id');
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = UserHasBookings;
//# sourceMappingURL=1632299257012_user_has_bookings.js.map