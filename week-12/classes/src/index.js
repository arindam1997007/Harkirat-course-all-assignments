"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const helpful_decorators_1 = require("helpful-decorators");
class DateClass {
    constructor(timeZone) {
        this.timeZone = timeZone;
    }
    getTime() {
        const d = new Date();
        return d.getTime();
    }
    getMonth() {
        const d = new Date();
        return d.getMonth();
    }
    getTimezone() {
        return this.timeZone;
    }
}
__decorate([
    helpful_decorators_1.measure
], DateClass.prototype, "getMonth", null);
const dateObj = new DateClass("IST");
const response = dateObj.getMonth();
console.log({ response });
