"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Verify {
    async handle({ response, auth }, next) {
        const status = auth.user?.verified;
        if (status == true) {
            await next();
        }
        else {
            return response.unauthorized({ message: "This account not verified" });
        }
    }
}
exports.default = Verify;
//# sourceMappingURL=Verify.js.map