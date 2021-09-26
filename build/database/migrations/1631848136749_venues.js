"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Venues extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'venues';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('name');
            table.string('address');
            table.string('phone');
            table.timestamp('created_at', { useTz: false });
            table.timestamp('updated_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTableIfExists(this.tableName);
    }
}
exports.default = Venues;
//# sourceMappingURL=1631848136749_venues.js.map