"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Schema_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Schema"));
class OtpCodes extends Schema_1.default {
    constructor() {
        super(...arguments);
        this.tableName = 'otp_codes';
    }
    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');
            table.string('otp');
            table.integer('user_id').unsigned().references('users.id');
            table.timestamp('created_at', { useTz: true });
        });
    }
    async down() {
        this.schema.dropTable(this.tableName);
    }
}
exports.default = OtpCodes;
//# sourceMappingURL=1632453344051_otp_codes.js.map