"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserValidator_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Validators/UserValidator"));
const user_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/user"));
const Otp_1 = __importDefault(global[Symbol.for('ioc.use')]("App/Models/Otp"));
const Mail_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Addons/Mail"));
var otpGenerator = require('otp-generator');
class UsersController {
    async index({ request, response }) {
        const users = await user_1.default.all();
        response.ok({ message: "Ok", data: users });
    }
    async store({ request, response }) {
        try {
            const data = await request.validate(UserValidator_1.default);
            let otp_code = otpGenerator.generate(6, { alphabets: false, specialChars: false, upperCase: false });
            await Mail_1.default.send((message) => {
                message
                    .from('irpan@nawawisoft.xyz')
                    .to(data.email)
                    .subject('Welcome Onboard!')
                    .htmlView('mail_otp', { code: otp_code, name: data.name });
            });
            const newUser = await user_1.default.create(data);
            const resData = {
                message: `Email ${data.email} registered, we have sent you a message in email with the OTP code. please verify your account to complete the registration`
            };
            const otpId = await Otp_1.default.create({ user_id: newUser.id, otp: otp_code });
            return response.created(resData);
        }
        catch (error) {
            return response.badRequest(error);
        }
    }
    async update({ request, response }) {
        const newData = request.body();
        const userId = request.param('id');
        const userData = await user_1.default.find(userId);
        userData.merge(newData);
        await userData.save();
        response.ok({ message: 'User updated', data: userData });
    }
}
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map