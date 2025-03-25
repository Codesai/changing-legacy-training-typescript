import {PeopleSearcher} from "../src/PeopleSearcher";

describe('PeopleSearcher', () => {
    it('Test1', async () => {
        const peopleSearcher = new PeopleSearcher();

        const persons = await peopleSearcher.search('Pedro');

        expect(persons.length).toBe(2);
    });
});
