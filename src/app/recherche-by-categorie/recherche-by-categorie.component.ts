import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Produit } from '../models/produit.model';
import { Categorie } from '../models/categorie.model';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../services/produit.service';

@Component({
  selector: 'app-recherche-by-categorie',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    RouterLink,
    FormsModule
  ],
  templateUrl: './recherche-by-categorie.component.html',
})
export class RechercheByCategorieComponent implements OnInit {
  produits! : Produit[];
  idCategorie! : number;
  categories! : Categorie[];

  constructor(private produitService: ProduitService){}

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(
      cats => {this.categories = cats._embedded.categories;}
    );
  }

  onChange(): void{
    this.produitService.rechercherByCategorie(this.idCategorie).subscribe(
      prods => {this.produits = prods}
      
    )
    
  }

}
