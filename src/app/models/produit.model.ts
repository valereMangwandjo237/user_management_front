import { Categorie } from "./categorie.model";
import { Image } from "./image.model";

export class Produit{
    id!: number;
    nom?: String;
    price?: number;
    created_at?: Date;
    categorie!: Categorie
    image!: Image
    imageStr!: string
}
