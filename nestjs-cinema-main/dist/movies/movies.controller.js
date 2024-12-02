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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const common_1 = require("@nestjs/common");
const movie_entity_1 = require("./movie.entity");
const movies_service_1 = require("./movies.service");
const swagger_1 = require("@nestjs/swagger");
let MoviesController = exports.MoviesController = class MoviesController {
    constructor(moviesService) {
        this.moviesService = moviesService;
    }
    async findAll() {
        return await this.moviesService.findAll();
    }
    async findOne(id) {
        const movie = await this.moviesService.findOne(id);
        if (!movie) {
            throw new common_1.NotFoundException('Movie not found');
        }
        return movie;
    }
    async update(id, movie) {
        const updatedMovie = await this.moviesService.update(id, movie);
        if (!updatedMovie) {
            throw new common_1.NotFoundException('Movie not found or not updated');
        }
        return updatedMovie;
    }
    async delete(id) {
        await this.moviesService.delete(id);
    }
    create(movie) {
        this.moviesService.create(movie);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Lista todos filmes' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filmes listados com sucesso' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Lista um filme' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Filme listado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requisição inválida.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Filme não encontrado.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualiza um filme' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Filme atualizado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requisição inválida.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Filme não encontrado.' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deleta um filme' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Filme excluído com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requisição inválida.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Filme não encontrado.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoviesController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo filme' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Filme criado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requisição inválida.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [movie_entity_1.Movie]),
    __metadata("design:returntype", void 0)
], MoviesController.prototype, "create", null);
exports.MoviesController = MoviesController = __decorate([
    (0, swagger_1.ApiTags)('movies'),
    (0, common_1.Controller)('movies'),
    __metadata("design:paramtypes", [movies_service_1.MoviesService])
], MoviesController);
//# sourceMappingURL=movies.controller.js.map