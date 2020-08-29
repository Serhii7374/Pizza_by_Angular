import { ICategory } from "../interfaces/category.interface";

export class Category implements ICategory {
    constructor(public id: string,
                public nameEN: string,
                public nameUA: string) {}

}