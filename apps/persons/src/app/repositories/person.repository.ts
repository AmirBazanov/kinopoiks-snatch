import {
  AddRoleContract,
  CreatePersonContract,
  IdPersonContract,
  UpdatePersonContract
} from "@kinopoisk-snitch/contracts";
import {AwardsEntity, MoviesPersonsRolesEntity, PersonsEntity, RolesEntity} from "@kinopoisk-snitch/typeorm";
import {HttpStatus, Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";

@Injectable()
export class PersonRepository {
  constructor(
    @InjectRepository(PersonsEntity)
    private readonly personRepository: Repository<PersonsEntity>,
    @InjectRepository(AwardsEntity)
    private readonly awardsRepository: Repository<AwardsEntity>,
    @InjectRepository(MoviesPersonsRolesEntity)
    private readonly moviesPersonsRolesRepository: Repository<MoviesPersonsRolesEntity>,
    @InjectRepository(RolesEntity)
    private readonly rolesRepository: Repository<RolesEntity>
  ) {
  }

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

      return {HttpStatus: HttpStatus.OK, ...arrayPersons};
    } catch (e) {
      return {HttpStatus: HttpStatus.NOT_FOUND};
    }
  }

  async getPersonsOfMovie(id: number) {
    return this.moviesPersonsRolesRepository.createQueryBuilder('personsRoles').leftJoin('personsRoles.person', 'person')
      .leftJoin('personsRoles.role', 'role').addSelect(['role.name', 'person.name', "person.sur_name", 'role.role_id'])
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

  async createPerson(personDto: CreatePersonContract.Request) {
    try {
      const person = await this.personRepository.create({
        ...personDto
      });

      await this.personRepository.save(person);
      return {
        httpStatus: HttpStatus.OK,
        message: 'Person crated successfully',
      };
    } catch (e) {
      return {
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };
    }
  }

  async deletePerson(person_id: number) {
    try {
      const person = await this.personRepository.findOne({
        where: {
          person_id: person_id,
        },
      });
      await this.personRepository.remove(person);
      return {
        httpStatus: HttpStatus.OK,
        message: 'Person deleted successfully',
      };
    } catch (e) {
      return {
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Could not delete person',
      };
    }
  }

  async updatePerson(personDto: UpdatePersonContract.Request) {
    try {
      const person = await this.personRepository.update(
        {person_id: personDto.person_id},
        {...personDto}
      );
      return {
        httpStatus: HttpStatus.OK,
        person
      };
    } catch (e) {
      return {
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      };
    }
  }

  async addRole(addRoleDto: AddRoleContract.Request) {
    try {
      let role = await this.rolesRepository.findOne({ where: {name: addRoleDto.role_name} });

      if (!role) {
        role = await this.rolesRepository.create({
          name: addRoleDto.role_name,
          is_eng: addRoleDto.is_eng,
        });
        await this.rolesRepository.save(role);
      }

      const personRole = await this.moviesPersonsRolesRepository.create({
        movie: {movie_id: addRoleDto.movie_id},
        role: {role_id: role.role_id},
        person: {person_id: addRoleDto.person_id}
      });

      await this.moviesPersonsRolesRepository.save(personRole);

      return {
        httpStatus: HttpStatus.OK,
        role: personRole,
      };
    } catch (e) {
      return {
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal Server Error',
      }
    }
  }

  async removeRole(persons_role_id: number) {
    try {
      const personsRole = await this.moviesPersonsRolesRepository.findOne({
        where: {
          movies_persons_roles_id: persons_role_id,
        },
      });
      await this.moviesPersonsRolesRepository.remove(personsRole);
      return {
        httpStatus: HttpStatus.OK,
        message: "Person's role deleted successfully",
      };
    } catch (e) {
      return {
        httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
        message: "Could not delete person's role",
      };
    }
  }
}
