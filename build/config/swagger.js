"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    uiEnabled: true,
    uiUrl: 'docs',
    specEnabled: true,
    specUrl: '/swagger.json',
    middleware: [],
    options: {
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Application with swagger docs',
                version: '1.0.0',
                description: 'My application with swagger docs',
                servers: {
                    "url": "http://localhost:3333/"
                }
            }
        },
        apis: [
            'app/**/*.ts',
            'app/**/*.yml',
            'docs/swagger/**/*.yml',
            'start/routes.ts'
        ],
        basePath: '/'
    },
    mode: process.env.NODE_ENV === 'production' ? 'PRODUCTION' : 'RUNTIME',
    specFilePath: 'docs/swagger.json'
};
//# sourceMappingURL=swagger.js.map