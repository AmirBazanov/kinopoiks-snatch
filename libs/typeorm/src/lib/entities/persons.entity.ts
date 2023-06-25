import {
  Column,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { AwardsEntity } from './awards.entity';
import { MoviesPersonsRolesEntity } from './movies-persons-roles.entity';
import { ApiProperty } from "@nestjs/swagger";

@Entity('Persons')
@Unique(['name', 'sur_name', 'date_birth', 'place_birth'])
export class PersonsEntity {
  @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
  @PrimaryGeneratedColumn()
  person_id: number;

  @ApiProperty({example: 'Майкл', description: 'Имя человека'})
  @Column()
  name: string;

  @ApiProperty({example: 'Бэй', description: 'Фамилия человека'})
  @Column()
  sur_name: string;

  @ApiProperty({example: 185, description: 'Рост'})
  @Column('int2', { nullable: true })
  height: number;

  @ApiProperty({example: '01.02.1965', description: 'Дата рождения'})
  @Column({
    type: 'date',
    transformer: {
      from: (value: string) => new Date(value),
      to: (value: Date) => value.toISOString().slice(0, 10), // format the Date to YYYY-MM-DD
    },
    nullable: true,
  })
  date_birth: Date;

  @ApiProperty({example: 'Лос-Анджелес, Калифорния, США', description: 'Место рождения'})
  @Column({ nullable: true })
  place_birth: string;

  @ApiProperty({example: 'NULL', description: 'ФИ супруга'})
  @Column({ nullable: true })
  spouse: string;

  @ApiProperty({example: 'Ссылка на фотографию', description: 'https://www.kinopoisk.ru/1S70ZD129/96965bkF5/uPS-hMGXzc7_RSt8pu6p3Au3pQmpYvzTdEZbFseyyOCKEXWEaKH_MS3wRqSwg08sL4CrphCrcgtvstp4VaN5IIn975zI6uWrkhBSXMeOlJwWh80htFfZ8il2L1uyw7RcSrG9IaA5A5GtQcO9iY8uUV7dqodh7zoyR-6bsLi77IlUGDLwSX_YUvftXpTKKlFAw54tebUT8Bc4x1vSByqwtGbpGQXEGYc5vSlHsXESzlnK1YZP5Qve36fi48RZd_hRCHSCXBEXxNYv9bb09u61KFvu9aFVA1TvWFfDJqeaZPSyqZX1VKWrDQV1NwldHl6dci1eDw3furd3bkecBXdg5YjEdvARY2Q-3z1q8PIymawrZn09batEV8RfMxKHWiwQqonxmdChY3G1PaeF_da6zaIxGhPB--LX977j_An3zB2YAL4YcZs4aue9ughq-gH0R0rN5Smf-ENYh6ei38Lg9Arx0WFUGYfR-YGvxWnmvs3SPfLbaX9ON2sq-0hB-6iFNJS2YPWXSGqvHSYc0s75CMt-XaWNj6DvZMP3kkfu7LiKjek1gK2PVY0pJ8k9ajqdzvl2B0Uf1jt3bgPE3T-U6dT0GmAhx5Q6AxnK3BLitcAD5hkprSPc10SHi6rbyvA8Kn09CXSxE6mpgds1jR6eORK9cks596KXM37ncBnj3CF8TAa8ZTfITuuRgggizvl4m_55NQ0P8EP4L2dm98Z4kKY5Ea3IrWvhodH_0fVaillicZKjHWs-t8uOe-AV69wF4GBSbFlrLJJTZSqUfqp1DCf6KSVl41RjuI_zUku-WMSO0d3NhBkPhf1B0wlpDtI5oqHyS1njbiufzi_UeV9EwVS4ooRhTxyS122--JKKJdyzmpm54QeoY0xTTzbLBkDkmp3tPYyp052pbZMFveZWVWYtxteNw64He7ar7PkvJImAMH4Mec-0XlsNbqyizvGYfwoVCbWnyBO4d4u-u45YCJ4JiX3w0Udl0SVrUQluMk3WpYKnDffKM8M6q6yBYziNmJiCvB1nYHrbeSLUlsIdfMOS1RUl2yCDABPbflsiUOwSoS0VZLHXKVn5a3UVZpod4k12I5Hvznfb4kd07X-gcdSgqkTRS1iS-81-4N56ldgjkpG5rYdMw9gDx9IjsrRkAr09HQy9Y-kZKZ-xYRqK5X7JUu95V0IXJ_pneBXzzPGwdBYUVQdkqneNthTeUlkkW2pRbfG36BfIyy8iUz4s-HIlGTGICUPtpblTVbVKEql26Yqb-ZdKu-dy0-xdm5z9dAi2PNULYL5P8TZg1g6pZL8O9dmd83QrPCOjpic-wLQK4bVB7MVbneG17-kN7k61tu0ew32LJk87zgckDedI8TT8iox9jygmC0VW2AIm2aRXchWtrZdUr6RPiyLfRvxsYqU1EWRlewUlVVvNkeImQeqtnl9hA0r3X2KfhNnzFHWQOKKEeZ9Qttf1gmgCevkcK3JFIWW_8JN8j6eud6owML5VKYn4iaOdkXnXhcEGRlX2bUpbyePmq-_yy1j1p_CZqPCeYFF_yEZrPUp0qnKF9L9mrVmlF-ir1BPHhrteXJCCGY2taJ1DURFNn6lZxrp5ToEOr40Txltvdt_geeN4lSA00nQdDwgy_x1qQBr2QaRPbintoS9MB7QvL35_UsyA1t3p4QzN950Vee9FlQaO8cZVAvdhe9rXT8IPRAH3wJF49DJMgesgYptdXnRGqo1Ii16tCbnbzFv4m3Mi1y6UdIolXc3U7SOpEc1H0bHqqtnWrXJT6Wv-hz9CG6jl86glsLD2kFlTPHpTRd58Eip1XPeSXbkNl9R7OIsLYsue6Bzmvell4LGv-R1tt9k1GqpJbjHSZ-2XIvvvTvNkmV94YXy4nrwNO5zmR-nyCIJihcSv2lV5ob8kU1Qvy-InMjTkGtEZadgpZ715Vf8JUULOlUK9BudBxzo3G87f7E13cI04oFJ4pZtgfoexdmR-YtnYM8ohDV0jFENQI1eq5-qcHDqt3bkUNQ-t_bVD1ZEyKjXe3Rov7V-2f-_yc1TlZ9DN2MQWfO3jmEZH7b74mqZZdP9CFfm5uwibPAvzmv9CsDCObSlhlDlTqWUBt3kJXl7RIt1aY52XwiObiqcUcT_A4YiYPnD9l8T-h9muePq-XcB7Nr1lMe8Um-gPQ46n2iDA8mHRrejJc4UtLW8lCe52qSJNKpORF26jW3qH7FGv5AEUKJ4c3cPEqi9pWpByeg1Ep35FhfHn_ItE2_cu56pkhNIp5W005e9l5W3zrTFWwtUisTqbDWfG959qE-BRq1zR8ATmnGkf6L5_7c6IRrqZgDPy_aWFC9ALoDMHtu-qKCwuvYWVnJFbKWnRq7lJyo5xwo3GTxXHMjNrDl_YgfMwLXTwWhRVU2RC2_E-ZOZGGUAnnvkdFffY--gDTybTvjCA4iFxwdixR11t1btJFe5-TTaB9kvx69aP-zbX-MELTP2kjG7IQYOo8p-9AnBGqq1Yx5IV5Z33mEcwn09SqzIouAKhmW3oEaOdKQ1_1fXmGm3GRZLT8fsezz-uFyx1F8StdJj-YIE71NZbDSoMgt6x6FO-wYWha_R_6DenblMW7Bi-3T1lWLHPuYl5c10Rir611lFC5wUDOl9vEov0QYdMfWzwFjQBGxSe8wn23Cpeteg3grm5oYfMFwR3y6oHOmTA4j1pzQwBFyF1PccB5YLy5fL1ipfZg8pLL7bbdC2rbAEY-KLweYcclvNRKmySxjXgww7FCTWjVAuoJ8NSUxZI_P4RtYVIEU_18VW_UX0ygiW2TSKX0UeWM0vGR3xB2zyRsDTqEMlnRKrzscLcKsLN7APSDTUxg9AfuDcLHndKNEguAR3xWGV7bZ1hQ6V5RgIZGj02e2nv_qendn9EHVvgWaTo2vwFj0Qqn4mmdFLagfSvSqH5qQdIh_g3j-qn1lgcmvHpifyZf4k5SSfNAW5WSbYxvp8FW5aX37Z0'})
  @Column({ nullable: true })
  photo: string;

  @ApiProperty({example: 'false', description: 'Булевое значение английского значения'})
  @Column({ default: false })
  is_eng: boolean;

  @OneToMany(() => AwardsEntity, (award) => award.person)
  @JoinTable()
  awards: AwardsEntity[];

  @OneToMany(
    () => MoviesPersonsRolesEntity,
    (moviesPersonsRole) => moviesPersonsRole.person
  )
  moviesPersonsRole: MoviesPersonsRolesEntity[];
}
