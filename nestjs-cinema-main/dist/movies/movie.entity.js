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
exports.Movie = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class Movie {
}
exports.Movie = Movie;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Título do filme' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Título do filme é mandatório' }),
    (0, class_validator_1.IsString)({ message: 'Título deve ser do tipo String' }),
    __metadata("design:type", String)
], Movie.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Descrição do filme' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Descrição do filme é mandatória' }),
    (0, class_validator_1.IsString)({ message: 'Descrição deve ser do tipo String' }),
    __metadata("design:type", String)
], Movie.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Data de lançamento do filme' }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Data de lançamento é mandatória' }),
    __metadata("design:type", Date)
], Movie.prototype, "launchdate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Datas em que o filme será apresentado' }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Array)
], Movie.prototype, "showtimes", void 0);
//# sourceMappingURL=movie.entity.js.map