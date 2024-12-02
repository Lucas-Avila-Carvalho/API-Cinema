"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ticket = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class Ticket {
}
exports.Ticket = Ticket;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do filme' }),
    __metadata("design:type", String)
], Ticket.prototype, "movieId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID do usuário' }),
    __metadata("design:type", String)
], Ticket.prototype, "userId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Número do assento' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Número do assento é mandatório' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Valor do assento deve ser maior ou igual a 0' }),
    (0, class_validator_1.Max)(99, { message: 'Valor do assento deve ser menor ou igual a 100' }),
    __metadata("design:type", Number)
], Ticket.prototype, "seatNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Preço do ingresso' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Preço do ingresso é mandatório' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0, { message: 'Preço deve ser maior ou igual a 0' }),
    (0, class_validator_1.Max)(60, { message: 'Preço deve ser menor ou igual a 60' }),
    __metadata("design:type", Number)
], Ticket.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de apresentação' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Data de apresentação é mandatória' }),
    __metadata("design:type", Date)
], Ticket.prototype, "showtime", void 0);
//# sourceMappingURL=ticket.entity.js.map