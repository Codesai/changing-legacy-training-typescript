import {Product} from "./Product";

export interface EmailService {
    subscribeUserFor(product: Product): void;
}