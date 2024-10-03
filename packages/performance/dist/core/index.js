"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("./src/config");
const catch_error_1 = require("./src/catch-error");
const collect_pv_1 = require("./src/collect-pv");
// let baseConfigInfo
class Monitor {
    // private customErrOptions
    constructor(options) {
        this.options = options;
        const { config } = this.options;
        this.config = config; //基础配置
        // baseConfigInfo = config
        // this.customErrOptions = customErrOptions //自定义错误上报
    }
    init() {
        (0, config_1.setConfig)(this.config, config_1.config);
        (0, catch_error_1.catchError)();
        (0, collect_pv_1.getPV)();
    }
    handleCustomError(options) {
        (0, catch_error_1.errorCapture)(options);
    }
}
// export const baseConfig = baseConfigInfo
exports.default = Monitor;
