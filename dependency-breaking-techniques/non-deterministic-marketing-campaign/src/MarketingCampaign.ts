export class MarketingCampaign {
    public isActive(): boolean {
        return this.milliSeconds() % 2 === 0;
    }

    public isCrazySalesDay(): boolean {
        return this.dayOfTheWeek() === 5;
    }

    private milliSeconds(): number {
        return Date.now();
    }

    private dayOfTheWeek(): number {
        return new Date().getDay();
    }
}
