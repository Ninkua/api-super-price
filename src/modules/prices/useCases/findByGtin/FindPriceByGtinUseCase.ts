import { AppError } from "@errors/AppError";
import { Price } from "@modules/prices/infra/typeorm/entities/Price";
import { IPricesRepository } from "@modules/prices/repositories/IPricesRepository";
import { IProductsRepository } from "@modules/products/repositories/IProductsRepository";
import { IValidateProvider } from "@shared/container/providers/ValidateProvider/IValidateProvider";
import { inject, injectable } from "tsyringe";

@injectable()
class FindPriceByGtinUseCase {

    constructor(
        @inject("PricesRepository")
        private pricesRepository: IPricesRepository,

        @inject("ProductsRepository")
        private productsRepository: IProductsRepository,

        @inject("ValidateProvider")
        private validateProvider: IValidateProvider
    ) { }

    async execute(gtin: string): Promise<Price[]> {

        if (gtin.length > 50) {
            throw new AppError("Character limit exceeded", 400)
        }

        const isValidGtin = await this.validateProvider.validateGtin(gtin);

        if (isValidGtin === false) {
            throw new AppError("Invalid Gtin", 400)
        }

        const product = await this.productsRepository.findByGtin(gtin)
        if (!product) {
            throw new AppError("Product not found!", 404);
        }

        const prices = await this.pricesRepository.findByProductId(product.id);

        if (prices.length === 0) {
            throw new AppError("Price not found", 404);
        }

        return prices;

    }
}
export { FindPriceByGtinUseCase };