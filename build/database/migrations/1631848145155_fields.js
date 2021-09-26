"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Fields extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'fields';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name');
            table.enu('type', ['futsal', 'mini soccer', 'basketball']);
            table.integer('venue_id').unsigned().index('venue_id');
            table.foreign('venue_id').references('venues.id').onDelete('CASCADE');
            table.timestamp('created_at', { useTz: true });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTableIfExists(this.tableName);
    }
}
exports.default = Fields;
//# sourceMappingURL=1631848145155_fields.js.map