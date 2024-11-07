import { Categorie } from "./categorie.model";

export class Produit{
    id!: number;
    nom?: String;
    price?: number;
    created_at?: Date;
    categorie!: Categorie
}