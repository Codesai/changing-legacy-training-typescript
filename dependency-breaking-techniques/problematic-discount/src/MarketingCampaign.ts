export class MarketingCampaign {
    isActive(): boolean {
        return Date.now() % 2 === 0;
    }

    isCrazySalesDay(): boolean {
        return new Date().getDay() === 5; // 5 represents Friday in JavaScript
    }
}
