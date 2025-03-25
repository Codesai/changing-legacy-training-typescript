import {MarketingCampaign} from "../src/MarketingCampaign";

describe("MarketingCampaign", () => {
    it("when will I pass?", () => {
        const campaign = new MarketingCampaign();

        const isCrazySalesDay = campaign.isCrazySalesDay();

        expect(isCrazySalesDay).toBe(true);
    });

    it("would I always pass?", () => {
        const campaign = new MarketingCampaign();

        const isActive = campaign.isActive();

        expect(isActive).toBe(true);
    });
});
