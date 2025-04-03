export class Product {
    private static readonly MINIMUM_QUALITY = 0;
    private static readonly MAXIMUM_QUALITY = 50;

    readonly description: string;
    sellIn: number;
    quality: number;

    constructor(description: string, sellIn: number, quality: number) {
        this.description = description;
        this.sellIn = sellIn;
        this.quality = quality;
    }

    decreaseQualityBy(decrement: number): void {
        for (let i = 0; i < decrement; i++) {
            if (this.quality > Product.MINIMUM_QUALITY) {
                this.quality -= 1;
            }

            if (this.sellIn < 0) {
                if (this.quality > Product.MINIMUM_QUALITY) {
                    this.quality -= 1;
                }
            }
        }
    }

    increaseQualityBy(increment: number): void {
        for (let i = 0; i < increment; i++) {
            if (this.quality < Product.MAXIMUM_QUALITY) {
                this.quality += 1;
            }

            if (this.sellIn < 0) {
                if (this.quality < Product.MAXIMUM_QUALITY) {
                    this.quality += 1;
                }
            }
        }
    }

    dropQualityToMinimum(): void {
        this.quality = Product.MINIMUM_QUALITY;
    }

    decreaseSellIn(): void {
        this.sellIn -= 1;
    }

    isTheatrePasses(): boolean {
        return this.description === "Theatre Passes";
    }
}