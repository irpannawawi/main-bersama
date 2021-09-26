"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Bookings extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'bookings';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.integer('field_id').unsigned();
            table.integer('booking_user_id').unsigned();
            table.datetime('play_date_start');
            table.datetime('play_date_end');
            table.foreign('field_id').references('fields.id');
            table.foreign('booking_user_id').references('users.id');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = Bookings;
//# sourceMappingURL=1632295926842_bookings.js.map