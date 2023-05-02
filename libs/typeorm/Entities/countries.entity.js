"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CountriesEntity = void 0;
var typeorm_1 = require("typeorm");
var movies_entity_1 = require("./movies.entity");
var CountriesEntity = /** @class */ (function () {
    function CountriesEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], CountriesEntity.prototype, "country_id", void 0);
    __decorate([
        (0, typeorm_1.Column)()
    ], CountriesEntity.prototype, "name_ru", void 0);
    __decorate([
        (0, typeorm_1.Column)()
    ], CountriesEntity.prototype, "name_eng", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return movies_entity_1.MoviesEntity; }, function (movie) { return movie.production_country_id; })
    ], CountriesEntity.prototype, "movies", void 0);
    CountriesEntity = __decorate([
        (0, typeorm_1.Entity)('Countries')
    ], CountriesEntity);
    return CountriesEntity;
}());
exports.CountriesEntity = CountriesEntity;
