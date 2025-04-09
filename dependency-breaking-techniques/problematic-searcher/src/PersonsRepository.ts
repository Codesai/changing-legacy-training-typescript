import mysql, {ConnectionOptions} from 'mysql2/promise';

import {Logger} from './Logger';
import {Person} from './Person';

export class PersonsRepository {
    private static readonly databaseName: string = 'myshop';
    private static readonly user: string = 'store';
    private static readonly password: string = '123456';

    static async query(sql: string): Promise<Person[]> {
        Logger.log(sql);

        const access: ConnectionOptions = {
            host: "localhost",
            user: this.user,
            password: this.password,
            database: this.databaseName,
        };

        const conn = await mysql.createConnection(access);

        const persons: Person[] = [];

        try {
            let [results] = await conn.query<any[]>(sql);
            for (let result of results) {
                persons.push(new Person(result.name, result.surname));
            }
            persons.forEach((person) => Logger.log(person.toString()));
        } catch (err) {
            throw err;
        }
        return persons;
    }
}
