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
exports.TicketsService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
let TicketsService = exports.TicketsService = class TicketsService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    async create(ticket) {
        return new Promise((resolve, reject) => {
            this.dbService.getTicketDatastore().insert(ticket, (err, newDoc) => {
                if (err)
                    reject(err);
                resolve(newDoc);
            });
        });
    }
    async findAll() {
        return new Promise((resolve, reject) => {
            this.dbService.getTicketDatastore().find({}, (err, docs) => {
                if (err)
                    reject(err);
                resolve(docs);
            });
        });
    }
    async findOne(id) {
        return new Promise((resolve, reject) => {
            this.dbService.getTicketDatastore().findOne({ _id: id }, (err, doc) => {
                if (err) {
                    return reject(err);
                }
                if (!doc) {
                    return reject(new common_1.NotFoundException(`Ticket with ID ${id} not found.`));
                }
                resolve(doc);
            });
        });
    }
    async update(id, ticket) {
        return new Promise((resolve, reject) => {
            this.dbService.getTicketDatastore().update({ _id: id }, ticket, {}, (err, numReplaced) => {
                if (err) {
                    return reject(err);
                }
                if (numReplaced === 0) {
                    return reject(new common_1.NotFoundException(`Ticket with ID ${id} not found.`));
                }
                resolve(ticket);
            });
        });
    }
    async remove(id) {
        return new Promise((resolve, reject) => {
            this.dbService.getTicketDatastore().remove({ _id: id }, {}, (err, numRemoved) => {
                if (err) {
                    return reject(err);
                }
                if (numRemoved === 0) {
                    return reject(new common_1.NotFoundException(`Ticket with ID ${id} not found.`));
                }
                resolve();
            });
        });
    }
};
exports.TicketsService = TicketsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], TicketsService);
//# sourceMappingURL=tickets.service.js.map