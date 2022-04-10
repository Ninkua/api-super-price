import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListProductsUseCase } from "./ListProductsUseCase";


class LitsProductsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const listProductsUseCase = container.resolve(ListProductsUseCase)

        const products = await listProductsUseCase.execute()

        return response.json(products);
    }

}
export { LitsProductsController }