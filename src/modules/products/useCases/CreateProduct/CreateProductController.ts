import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateProductUseCase } from "./CreateProductUseCase"

class CreateProductController {

    async handle(request: Request, response: Response) {
        const {
            name,
            gtin,
            brand,
            thumbnail
        } = request.body


        const createProductUseCase = container.resolve(CreateProductUseCase);

        await createProductUseCase.execute({
            name,
            gtin,
            brand,
            thumbnail
        })

        return response.status(201).send();

    }
}
export { CreateProductController }