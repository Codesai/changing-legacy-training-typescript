import {PersonsRepository} from "./PersonsRepository";
import {Person} from "./Person";

export class PeopleSearcher {
    async search(name: string): Promise<Person[]> {
        return await PersonsRepository.query(`select *
                                              from Person
                                              where Name like '%${name}%'`);
    }
}
