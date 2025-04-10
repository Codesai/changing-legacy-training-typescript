import {Product} from "../src/Product";
import {EmailService} from "../src/EmailService";
import {Checkout} from "../src/CheckOut";

describe("Checkout", () => {
    it("order confirmation fails if user does not accept terms of service", () => {
        // note for tester:
        // Accept Newsletter
        // Do not Accept Terms
        const emailService: jest.Mocked<EmailService> = {
            subscribeUserFor: jest.fn(),
        };
        const polkaDotSocks = new Product("Polka-dot Socks");
        const checkout = new Checkout(polkaDotSocks, emailService);

        expect(() => {
            checkout.confirmOrder()
        }).toThrow();
    });
});
