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
exports.TicketsController = void 0;
const common_1 = require("@nestjs/common");
const tickets_service_1 = require("./tickets.service");
const ticket_entity_1 = require("./ticket.entity");
const swagger_1 = require("@nestjs/swagger");
let TicketsController = exports.TicketsController = class TicketsController {
    constructor(ticketsService) {
        this.ticketsService = ticketsService;
    }
    create(ticket) {
        return this.ticketsService.create(ticket);
    }
    findAll() {
        return this.ticketsService.findAll();
    }
    findOne(id) {
        return this.ticketsService.findOne(id);
    }
    update(id, ticket) {
        return this.ticketsService.update(id, ticket);
    }
    remove(id) {
        return this.ticketsService.remove(id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Criar um novo ticket' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Ticket criado com sucesso.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requisição inválida.' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ticket_entity_1.Ticket]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Listar todos os tickets' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Tickets listados' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Listar um ticket por ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket listado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requisição inválida.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Atualizar um ticket' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket atualizado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requisição inválida.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, ticket_entity_1.Ticket]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Deletar um ticket' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Ticket deletado com sucesso' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Requisição inválida.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Ticket não encontrado' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TicketsController.prototype, "remove", null);
exports.TicketsController = TicketsController = __decorate([
    (0, swagger_1.ApiTags)('tickets'),
    (0, common_1.Controller)('tickets'),
    __metadata("design:paramtypes", [tickets_service_1.TicketsService])
], TicketsController);
//# sourceMappingURL=tickets.controller.js.map