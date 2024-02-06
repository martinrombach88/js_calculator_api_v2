"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDateString() {
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    const now = new Date();
    const day = days[now.getDay()];
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const dateString = `It is ${day}, and the time is ${hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
    return dateString;
}
exports.default = getDateString;
//# sourceMappingURL=getDateString.js.map