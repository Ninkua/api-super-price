import { ICreateSupermarketDTO } from "@modules/supermarkets/dtos/ICreateSupermarketDTO";
import { ISupermarketsRepository } from "@modules/supermarkets/repositories/ISupermarketsRepository";
import { getRepository, Repository } from "typeorm";
import { Supermarket } from "../entities/Supermarket";

class SupermarketsRepository implements ISupermarketsRepository {

    private repository: Repository<Supermarket>

    constructor() {
        this.repository = getRepository(Supermarket)
    }

    async create({
        name
    }: ICreateSupermarketDTO): Promise<void> {
        const supermarket = this.repository.create({
            name
        })

        await this.repository.save(supermarket)
    }


    async findById(id: string): Promise<Supermarket> {
        const supermarket = await this.repository.findOne(id)
        return supermarket;
    }


    async findByName(name: string): Promise<Supermarket> {
        const supermarket = await this.repository.findOne({ name })
        return supermarket;
    }

    async list(): Promise<Supermarket[]> {
        const supermarkets = await this.repository.find();
        return supermarkets
    }

}
export { SupermarketsRepository }