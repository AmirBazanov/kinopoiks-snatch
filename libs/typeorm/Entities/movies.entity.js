"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesEntity = void 0;
var typeorm_1 = require("typeorm");
var countries_entity_1 = require("./countries.entity");
var MoviesEntity = /** @class */ (function () {
    function MoviesEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], MoviesEntity.prototype, "movie_id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: false })
    ], MoviesEntity.prototype, "title", void 0);
    __decorate([
        (0, typeorm_1.Column)()
    ], MoviesEntity.prototype, "orig_title", void 0);
    __decorate([
        (0, typeorm_1.Column)('year')
    ], MoviesEntity.prototype, "production_year", void 0);
    __decorate([
        (0, typeorm_1.Column)()
    ], MoviesEntity.prototype, "tagline", void 0);
    __decorate([
        (0, typeorm_1.Column)('int')
    ], MoviesEntity.prototype, "budget", void 0);
    __decorate([
        (0, typeorm_1.Column)('int')
    ], MoviesEntity.prototype, "marketing", void 0);
    __decorate([
        (0, typeorm_1.Column)('date')
    ], MoviesEntity.prototype, "dvd_release", void 0);
    __decorate([
        (0, typeorm_1.Column)('date')
    ], MoviesEntity.prototype, "blueray_release", void 0);
    __decorate([
        (0, typeorm_1.Column)('int2')
    ], MoviesEntity.prototype, "age_limit", void 0);
    __decorate([
        (0, typeorm_1.Column)('int2')
    ], MoviesEntity.prototype, "mpaa_rating", void 0);
    __decorate([
        (0, typeorm_1.Column)('int2')
    ], MoviesEntity.prototype, "duration_min", void 0);
    __decorate([
        (0, typeorm_1.Column)()
    ], MoviesEntity.prototype, "film_description", void 0);
    __decorate([
        (0, typeorm_1.Column)()
    ], MoviesEntity.prototype, "language", void 0);
    __decorate([
        (0, typeorm_1.Column)({ default: false })
    ], MoviesEntity.prototype, "is_serial", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return countries_entity_1.CountriesEntity; }, function (county) { return county.country_id; }),
        (0, typeorm_1.Column)()
    ], MoviesEntity.prototype, "production_country_id", void 0);
    MoviesEntity = __decorate([
        (0, typeorm_1.Entity)('Movies')
    ], MoviesEntity);
    return MoviesEntity;
}());
exports.MoviesEntity = MoviesEntity;
