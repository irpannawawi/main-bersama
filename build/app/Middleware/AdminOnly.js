"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminOnly {
    async handle({ response, auth }, next) {
        const user = auth.user;
        if (user.role == 'admin') {
            await next();
        }
        else {
            return response.unauthorized({ message: 'You are not allowed to access tihs url', role: user.role });
        }
    }
}
exports.default = AdminOnly;
//# sourceMappingURL=AdminOnly.js.map