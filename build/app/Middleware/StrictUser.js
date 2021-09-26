"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class StrictUser {
    async handle({ response, auth }, next) {
        const user = auth.user;
        if (user.role == 'admin' || user.role == 'owner') {
            await next();
        }
        else {
            return response.unauthorized({ message: 'You are not allowed to access tihs url', role: user.role });
        }
    }
}
exports.default = StrictUser;
//# sourceMappingURL=StrictUser.js.map