export class MarketingCampaign {
    public isActive(): boolean {
        return Date.now() % 2 === 0;
    }

    public isCrazySalesDay(): boolean {
        return new Date().getDay() === 5; // 5 represents Friday in JavaScript
    }
}
