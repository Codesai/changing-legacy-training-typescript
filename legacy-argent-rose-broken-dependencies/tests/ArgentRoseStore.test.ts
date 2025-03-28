import {ArgentRoseStore} from "../src/ArgentRoseStore";
import {Product} from "../src/Product";

describe("ArgentRoseStore", () => {
    it("Expired Theatre Passes' quality drops to zero", async () => {
        const store = storeIncluding(theatrePasses(0, 5));

        await store.update();

        expect(store.getSavedInventory()).toEqual(inventoryIncluding(theatrePasses(-1, 0)));
    });

    function theatrePasses(sellIn: number, quality: number): Product {
        return new Product("Theatre Passes", sellIn, quality);
    }

    function storeIncluding(...products: Product[]): ArgentRoseStoreForTesting {
        return new ArgentRoseStoreForTesting(products);
    }

    function inventoryIncluding(...products: Product[]): Product[] {
        return products;
    }
});

export class ArgentRoseStoreForTesting extends ArgentRoseStore {
    private savedInventory: Product[];
    private readonly initialInventory: Product[];

    constructor(initialInventory: Product[]) {
        super();
        this.savedInventory = [];
        this.initialInventory = initialInventory;
    }

    getSavedInventory(): Product[] {
        return this.savedInventory;
    }

    protected async saveInventoryToDb(inventory: Product[]): Promise<void> {
        this.savedInventory = inventory;
    }

    protected async getInventoryFromDB(): Promise<Product[]> {
        return this.initialInventory;
    }
}