"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./src/config");
const catch_error_1 = require("./src/catch-error");
class Monitor {
    // private customErrOptions
    constructor(options) {
        this.options = options;
        const { config, customErrOptions } = this.options;
        this.config = config; //基础配置
        // this.customErrOptions = customErrOptions //自定义错误上报
    }
    init() {
        (0, config_1.setConfig)(this.config);
        (0, catch_error_1.catchError)();
    }
    handleCustomError(options) {
        (0, catch_error_1.errorCapture)(options);
    }
}
exports.default = Monitor;
