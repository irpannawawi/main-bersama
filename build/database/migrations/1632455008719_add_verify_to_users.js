"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class Users extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'users';
    }
    async up() {
        this.schema.table(this.tableName, (table) => {
            table.boolean('verified').defaultTo(false);
        });
    }
    async down() {
        this.schema.table(this.tableName, (table) => {
            table.boolean('verified').defaultTo(false);
        });
    }
}
exports.default = Users;
//# sourceMappingURL=1632455008719_add_verify_to_users.js.map