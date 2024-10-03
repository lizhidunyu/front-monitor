"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.originalSend = exports.originalOpen = void 0;
exports.generateUniqueId = generateUniqueId;
exports.isSupportSendBeacon = isSupportSendBeacon;
const uuid_1 = require("uuid");
// 生成唯一id
function generateUniqueId(type, time) {
    return `${type}-${time}-${(0, uuid_1.v4)()}`;
}
// 判断是否支持sendBeacon上报
function isSupportSendBeacon() {
    return !!window.navigator.sendBeacon;
}
// 改写requestIdleCallback、cancelIdleCallback函数
window.requestIdleCallback =
    window.requestIdleCallback ||
        function (handler, options) {
            let startTime = Date.now();
            const timeout = (options && options.timeout) || 0; // 获取超时值
            return setTimeout(function () {
                const elapsedTime = Date.now() - startTime;
                const didTimeout = elapsedTime >= timeout; // 检查是否超时
                handler({
                    didTimeout: didTimeout,
                    timeRemaining: function () {
                        return Math.max(0, 50.0 - elapsedTime);
                    }
                });
            }, 1);
        };
window.cancelIdleCallback =
    window.cancelIdleCallback ||
        function (id) {
            clearTimeout(id);
        };
exports.originalOpen = XMLHttpRequest.prototype.open;
exports.originalSend = XMLHttpRequest.prototype.send;
