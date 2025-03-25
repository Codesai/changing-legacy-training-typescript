import {Discount} from "../src/Discount";
import {Money} from "../src/Money";

describe("Discount", () => {
    it("should apply discount on crazy sales day", () => {
        const discount = new Discount();

        const total = discount.discountFor(new Money(100.0));

        expect(total).toEqual(new Money(85.0));
    });
});
