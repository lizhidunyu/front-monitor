"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.setConfig = setConfig;
const config = {
    url: '',
    appId: '',
    userId: '',
    reportConfig: {
        isImgReport: false, // 是否采用图片上报
        isImmediate: false // 是否延迟上报
    }
    // reportUrl: ''
    // TODO:此处省略其他配置
};
exports.config = config;
function setConfig(options, target = config) {
    for (const key in options) {
        if (options[key] !== undefined) {
            if (typeof options[key] === 'object' && options[key] !== null) {
                target[key] = target[key] || {};
                setConfig(options[key], target[key]);
            }
            else {
                target[key] = options[key];
            }
        }
    }
}
