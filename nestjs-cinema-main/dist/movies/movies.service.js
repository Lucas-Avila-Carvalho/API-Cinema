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
exports.MoviesService = void 0;
const common_1 = require("@nestjs/common");
const db_service_1 = require("../db/db.service");
let MoviesService = exports.MoviesService = class MoviesService {
    constructor(dbService) {
        this.dbService = dbService;
    }
    findAll() {
        return new Promise((resolve, reject) => {
            this.dbService.getMovieDatastore().find({}, (err, docs) => {
                if (err)
                    reject(err);
                else
                    resolve(docs);
            });
        });
    }
    findByTitle(title) {
        return new Promise((resolve, reject) => {
            this.dbService.getMovieDatastore().findOne({ title: title }, (err, doc) => {
                if (err)
                    reject(err);
                else
                    resolve(doc);
            });
        });
    }
    create(movie) {
        return new Promise((resolve, reject) => {
            this.dbService.getMovieDatastore().insert(movie, (err, newDoc) => {
                if (err)
                    reject(err);
                else
                    resolve(newDoc);
            });
        });
    }
    findOne(id) {
        return new Promise((resolve, reject) => {
            this.dbService.getMovieDatastore().findOne({ _id: id }, (err, doc) => {
                if (err)
                    reject(err);
                else if (!doc)
                    reject(new common_1.NotFoundException('Movie not found'));
                else
                    resolve(doc);
            });
        });
    }
    update(id, movie) {
        return new Promise((resolve, reject) => {
            this.dbService.getMovieDatastore().update({ _id: id }, { $set: movie }, {}, (err, numReplaced) => {
                if (err)
                    reject(err);
                else if (numReplaced === 0)
                    reject(new common_1.NotFoundException('Movie not found or not updated'));
                else
                    this.findOne(id).then(resolve).catch(reject);
            });
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            this.dbService.getMovieDatastore().remove({ _id: id }, {}, (err, numRemoved) => {
                if (err)
                    reject(err);
                else if (numRemoved === 0)
                    reject(new common_1.NotFoundException('Movie not found'));
                else
                    resolve();
            });
        });
    }
};
exports.MoviesService = MoviesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [db_service_1.DbService])
], MoviesService);
//# sourceMappingURL=movies.service.js.map