import mysql2 from 'mysql2/promise';
import {Product} from "./Product";

type ConnectionOptions = { password: string; database: string; host: string; user: string };

export class ArgentRoseStore {
    private inventory: Product[];

    constructor() {
        this.inventory = [];
    }

    async update(): Promise<void> {
        await this.getInventory();
        this.updateInventory();
        await this.saveInventory();
    }

    protected async getInventoryFromDB(): Promise<Product[]> {
        let inventory: Product[] = [];

        const connectionOptions = this.getConnectionOptions();

        try {
            const connection = await mysql2.createConnection(connectionOptions);

            try {
                const [rows] = await connection.execute("SELECT sellIn, quality, description FROM Products");

                inventory = (rows as any[]).map(row => {
                    return new Product(row.description, row.sellIn, row.quality);
                });

                await connection.end();
            } catch (error) {
                console.error(error);
                await connection.end();
            }
        } catch (error) {
            console.error(error);
        }
        return inventory;
    }
    private updateInventory(): void {
        this.inventory.forEach(this.updateProduct.bind(this));
    }

    private updateProduct(product: Product): void {
        product.decreaseSellIn();
        this.updateQuality(product);
    }

    private updateQuality(product: Product): void {
        if (product.isTheatrePasses()) {
            if (product.sellIn < 0) {
                product.dropQualityToMinimum();
            } else if (product.sellIn < 5) {
                product.increaseQualityBy(3);
            } else {
                product.increaseQualityBy(1);
            }
        } else if (product.isLanzaroteWine()) {
            product.increaseQualityBy(2);
        } else {
            product.decreaseQualityBy(2);
        }
    }

    private async getInventory(): Promise<void> {
        this.inventory = [];

        const connectionOptions = this.getConnectionOptions();

        try {
            const connection = await mysql2.createConnection(connectionOptions);

            try {
                const [rows] = await connection.execute("SELECT sellIn, quality, description FROM Products");

                this.inventory = (rows as any[]).map(row => {
                    return new Product(row.description, row.sellIn, row.quality);
                });

                await connection.end();
            } catch (error) {
                console.error(error);
                await connection.end();
            }
        } catch (error) {
            console.error(error);
        }
    }

    private async saveInventory(): Promise<void> {
        const connectionOptions = this.getConnectionOptions();

        try {
            const connection = await mysql2.createConnection(connectionOptions);
            connection.beginTransaction();

            try {

                for (const product of this.inventory) {
                    await connection.execute(
                        "INSERT INTO Products (sellIn, quality, description) VALUES (?, ?, ?)",
                        [product.sellIn, product.quality, product.description]
                    );
                }

                await connection.commit();
                console.log("Products saved successfully.");
                await connection.end();
            } catch (error) {
                await connection.rollback();
                console.error("An error occurred while saving inventory: " + error.message);
                await connection.end();
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    private getConnectionOptions(): ConnectionOptions {
        return {
            host: "localhost",
            user: "user",
            password: "123456",
            database: "inventory"
        };
    }
}
