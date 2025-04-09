import {Product} from "./Product";
import {EmailService} from "./EmailService";
import {UserConfirmation} from "./UserConfirmation";
import {OrderCancelledException} from "./OrderCancelledException";

export class Checkout {
    private readonly emailService: EmailService;
    private readonly newsLetterSubscribed: UserConfirmation;
    private readonly product: Product;
    private readonly termsAndConditionsAccepted: UserConfirmation;

    constructor(product: Product, emailService: EmailService) {
        this.product = product;
        this.emailService = emailService;
        this.newsLetterSubscribed = new UserConfirmation(
            "Subscribe to our product " + product + " newsletter?"
        );
        this.termsAndConditionsAccepted = new UserConfirmation(
            "Accept our terms and conditions?\n" + //
            "(Mandatory to place order for " + product + ")");
    }

    confirmOrder(): void {
        if (!this.termsAndConditionsAccepted.wasAccepted()) {
            throw new OrderCancelledException(this.product);
        }
        if (this.newsLetterSubscribed.wasAccepted()) {
            this.emailService.subscribeUserFor(this.product);
        }
    }
}
