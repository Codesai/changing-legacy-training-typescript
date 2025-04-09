import mysql, {ConnectionOptions} from 'mysql2/promise';

import {Receipt} from "./Receipt";

export class ReceiptRepository {
    private static databaseName = "myshop";
    private static user = "store";
    private static password = "123456";

    static async store(receipt: Receipt): Promise<void> {

        const access: ConnectionOptions = {
            host: "localhost",
            user: this.user,
            password: this.password,
            database: this.databaseName,
        };

        const conn = await mysql.createConnection(access);

        try {
            const sql = 'INSERT INTO `RECEIPT`(`AMOUNT`, `TAX`, `TOTAL`) VALUES (?, ?, ?)';
            const values = [
                receipt.amount.value(),
                receipt.tax.value(),
                receipt.total.value(),
            ];
            await conn.execute(sql, values);
        } catch (err) {
            throw err;
        }
    }
}