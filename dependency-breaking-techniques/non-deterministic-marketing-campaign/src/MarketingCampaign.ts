export class MarketingCampaign {
    isActive(): boolean {
        return this.milliSeconds() % 2 === 0;
    }

    isCrazySalesDay(): boolean {
        return this.dayOfTheWeek() === 5;
    }

    private milliSeconds(): number {
        return Date.now();
    }

    private dayOfTheWeek(): number {
        return new Date().getDay();
    }
}
