import {Money} from "./Money";
import {MarketingCampaign} from "./MarketingCampaign";

export class Discount {
    private readonly marketingCampaign: MarketingCampaign;

    constructor() {
        this.marketingCampaign = new MarketingCampaign();
    }

    public discountFor(netPrice: Money): Money {
        if (this.marketingCampaign.isCrazySalesDay()) {
            return netPrice.reduceBy(15);
        }
        if (netPrice.moreThan(Money.oneThousand)) {
            return netPrice.reduceBy(10);
        }
        if (netPrice.moreThan(Money.oneHundred) && this.marketingCampaign.isActive()) {
            return netPrice.reduceBy(5);
        }
        return netPrice;
    }
}
