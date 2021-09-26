"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
class UserValidator {
    constructor(ctx) {
        this.ctx = ctx;
        this.schema = Validator_1.schema.create({
            name: Validator_1.schema.string({}, [
                Validator_1.rules.minLength(6)
            ]),
            email: Validator_1.schema.string({}, [
                Validator_1.rules.email(),
                Validator_1.rules.unique({ table: 'users', column: 'email' })
            ]),
            password: Validator_1.schema.string({}, [
                Validator_1.rules.minLength(8)
            ]),
            role: Validator_1.schema.string.optional({}, [
                Validator_1.rules.minLength(4)
            ])
        });
        this.messages = {};
    }
}
exports.default = UserValidator;
//# sourceMappingURL=UserValidator.js.map