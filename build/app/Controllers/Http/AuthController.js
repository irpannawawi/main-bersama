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
class AuthController {
    async register({ request, response }) {
        try {
            const data = await request.validate(UserValidator_1.default);
            let otp_code = otpGenerator.generate(6, { alphabets: false, specialChars: false, upperCase: false });
            const mail = await Mail_1.default.send((message) => {
                message
                    .from('irpan@nawawisoft.xyz')
                    .to(data.email)
                    .subject('Welcome Onboard!')
                    .htmlView('mail_otp', { code: otp_code, name: data.name });
            });
            const newUser = await user_1.default.create(data);
            const resData = {
                message: `Email ${data.email} registered, we have sent you a email with the OTP code. please verify your account to complete the registration`,
                emailResult: mail
            };
            const otpId = await Otp_1.default.create({ user_id: newUser.id, otp: otp_code });
            return response.ok(resData);
        }
        catch (error) {
            return response.badRequest(error);
        }
    }
    async login({ request, response, auth }) {
        try {
            const email = request.input('email');
            const password = request.input('password');
            const role = request.input('role') != '' ? request.input('role') : 'user';
            const token = await auth.use('api').attempt(email, password);
            return response.ok({ message: "Login Success!!", auth: token });
        }
        finally {
        }
    }
    async verify({ request, response }) {
        const email = request.input('email');
        const otp = request.input('otp_code');
        const userData = await user_1.default.findBy('email', email);
        if (userData != null) {
            let validOtp = await userData.related('otp').query();
            if (validOtp.otp == otp || userData.verified == true) {
                userData.verified = true;
                userData.save();
                response.ok(userData);
            }
            else {
                response.badRequest({ message: "invalid otp code", otp, validOtp });
            }
        }
        else {
            response.badRequest({ message: "invalid email address" });
        }
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map