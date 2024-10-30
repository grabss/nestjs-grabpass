"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.grabpassProvider = void 0;
const grabpass_1 = require("grabpass");
exports.grabpassProvider = {
    provide: 'GRABPASS',
    useFactory: (args) => {
        return new grabpass_1.Grabpass({
            config: args.config
        });
    },
    inject: ['GRABPASS_ARGS']
};
//# sourceMappingURL=grabpass.provider.js.map