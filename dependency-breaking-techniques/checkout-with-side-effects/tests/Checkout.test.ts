import {Money} from "../src/Money";
import {Checkout} from "../src/Checkout";

describe("Checkout", () => {

    it("Fix me", async () => {
        const checkout = new Checkout();

        await checkout.createReceipt(new Money(12));

        expect(checkout).not.toBeNull();
    });

});
