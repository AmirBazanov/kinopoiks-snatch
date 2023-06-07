import { IdPersonContract } from "@kinopoisk-snitch/contracts";
import { AwardsEntity, MoviesPersonsRolesEntity, PersonsEntity } from "@kinopoisk-snitch/typeorm";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PersonRepository {
    constructor (
        @InjectRepository(PersonsEntity)
        private readonly personRepository: Repository<PersonsEntity>,
        @InjectRepository(AwardsEntity)
        private readonly awardsRepository: Repository<AwardsEntity>,
        @InjectRepository(MoviesPersonsRolesEntity)
        private readonly moviesPersonsRolesRepository: Repository<MoviesPersonsRolesEntity>
    ) {}

    async getPersonById(personDto: IdPersonContract.Request) {
        const person = await this.personRepository.findOne({
            where: {
                person_id: personDto.person_id,
            },
            relations: {
                awards: true,
            },
            select: {
                awards: {
                    name: true,
                    nomination: true,
                    year: true,
                }
            }
        });

        return person;
    }

    async getPersonByName(fullName: string) {
        try {
            const arrayPersons: PersonsEntity[] = [];

            const person: PersonsEntity[] = await 
                this.personRepository
                    .createQueryBuilder('person')
                    .where(
                    `CONCAT(person.name, ' ', person.sur_name) LIKE :personFullName`, 
                    { 
                        personFullName: `%${fullName}%`
                    },
                    )
                    .getMany();

            for (let i = 0; i < person.length; i++) {
                const currentPerson = await this.personRepository.findOne({
                    where: {
                        person_id: person[i].person_id
                    }, 
                    select: {
                        person_id: true,
                        name: true,
                        sur_name: true,
                        photo: true,
                        date_birth: true,
                    }
                });
                
                arrayPersons.push(currentPerson);
            }

            return { HttpStatus: HttpStatus.OK, ...arrayPersons };
        }
        catch (e) {
            return { HttpStatus: HttpStatus.NOT_FOUND };
        }
    }

    async getPersonsOfMovie(id: number) {
        const arrayIdsPersons = [];
        const arrayPersons = [];

        const arrayIdsPersonsOfMovie = await this.moviesPersonsRolesRepository.find({
            where: {
                movie: {
                    movie_id: id,
                }},
                relations: {
                    person: true,
                },
                select: {
                    person: {
                        person_id: true,
                    }
                }
        });

        for (let i = 0; i < arrayIdsPersonsOfMovie.length; i++) {
            if (arrayIdsPersons.includes(arrayIdsPersonsOfMovie[i].person.person_id))
                continue;

            arrayIdsPersons.push(arrayIdsPersonsOfMovie[i].person.person_id);
        }

        for (let j = 0; j < arrayIdsPersons.length; j++) {
            const curPerson = await this.moviesPersonsRolesRepository.findOne({
                where: {
                    person: {
                        person_id: arrayIdsPersons[j],
                    }
                },
                relations: {
                    person: true,
                    role: true,
                },
                select: {
                    person: {
                        person_id: true,
                        name: true,
                        sur_name: true,
                    },
                    role: {
                        name: true,
                    },
                }
            });

            const person = {
                person_id: curPerson.person.person_id,
                name: curPerson.person.name,
                surname: curPerson.person.sur_name,
                role: curPerson.role.name,
            }

            arrayPersons.push(person);
        }     

        return arrayPersons;        
    }

    async getArrayIdsMoviesForGenresPersons(person: PersonsEntity) {
        const arrayIdsMovies = [];

        const arrayIdsMoviesForPerson = await this.moviesPersonsRolesRepository.find({
            where: {
                person: {
                    person_id: person.person_id
                }
            },
            relations: {
                movie: true
            },
            select: {
                movie: {
                    movie_id: true,
                }
            }
        });
      
        for (let i = 0; i < (await arrayIdsMoviesForPerson).length; i++) {
            arrayIdsMovies[i] = arrayIdsMoviesForPerson[i].movie.movie_id;
        };

        return arrayIdsMovies;
    }

    async getCareerOfPerson(person: PersonsEntity) {
        const arrayIdsRolesForPerson = await this.moviesPersonsRolesRepository.find({
            where: {
                person: {
                    person_id: person.person_id,
                }
            },
            relations: {
                role: true,
            },
            select: {
                role: {
                    name: true,
                    }
            }
        });
      
        const arrayCarrer = [];
      
        for (let i = 0; i < arrayIdsRolesForPerson.length; i++) {
            if (arrayCarrer.includes(arrayIdsRolesForPerson[i].role.name))
                continue;
      
            arrayCarrer.push(arrayIdsRolesForPerson[i].role.name);
        }

        return arrayCarrer;
    }
}