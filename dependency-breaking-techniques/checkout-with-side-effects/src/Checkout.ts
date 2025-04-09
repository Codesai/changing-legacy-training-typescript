import {Money} from "./Money";
import {Receipt} from "./Receipt";
import {ReceiptRepository} from "./ReceiptRepository";

export class Checkout {
    async createReceipt(amount: Money): Promise<Receipt> {
        const vat = amount.percentage(20);

        const receipt = new Receipt(amount, vat, amount.add(vat));

        await ReceiptRepository.store(receipt);

        return receipt;
    }
}
