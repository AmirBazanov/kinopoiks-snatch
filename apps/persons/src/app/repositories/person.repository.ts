import {IdPersonContract} from "@kinopoisk-snitch/contracts";
import {AwardsEntity, MoviesPersonsRolesEntity, PersonsEntity} from "@kinopoisk-snitch/typeorm";
import {HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

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
      return this.personRepository.findOne({
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
      return  this.moviesPersonsRolesRepository.createQueryBuilder('personsRoles').leftJoin('personsRoles.person', 'person')
        .leftJoin('personsRoles.role', 'role').addSelect(['role.name','person.name', "person.sur_name", 'role.role_id'])
        .getMany()

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

        for (let i = 0; i < (arrayIdsMoviesForPerson).length; i++) {
            arrayIdsMovies[i] = arrayIdsMoviesForPerson[i].movie.movie_id;
        }

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

        const arrayCarrier = [];

        for (let i = 0; i < arrayIdsRolesForPerson.length; i++) {
            if (arrayCarrier.includes(arrayIdsRolesForPerson[i].role.name))
                continue;

            arrayCarrier.push(arrayIdsRolesForPerson[i].role.name);
        }

        return arrayCarrier;
    }
}
