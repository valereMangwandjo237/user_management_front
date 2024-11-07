import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit.model';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../models/categorie.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-produit',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './add-produit.component.html',
  styleUrl: './add-produit.component.css'
})
export class AddProduitComponent implements OnInit{
  newProduit = new Produit();
  newCategorie!: Categorie
  newIdCat!: number
  categories!: Categorie[]

  constructor(private produitService: ProduitService, private router: Router){ }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(
      cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      }
    )
  }

  addProduit(){
    this.newProduit.categorie = this.categories.find(cat => cat.id == this.newIdCat)!;
    this.produitService.addProduit(this.newProduit).subscribe(
      prod =>{
        this.router.navigate(["produits"])
      }
    )
  }
  

}
