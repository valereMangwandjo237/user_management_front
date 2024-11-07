import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { Produit } from '../models/produit.model';
import { CommonModule } from '@angular/common';
import { SearchFilterPipe } from '../search-filter.pipe';

@Component({
  selector: 'app-recherche-by-nom',
  standalone: true,
  imports: [
    FormsModule,
    RouterLink,
    CommonModule,
    SearchFilterPipe
  ],
  templateUrl: './recherche-by-nom.component.html',
})
export class RechercheByNomComponent {
  nomProduit!: String
  produits!: Produit[]
  allProduits!: Produit[]

  constructor(private produitService: ProduitService){}

  ngOnInit(): void {
    this.produitService.listeProduits().subscribe(
      prods => {this.allProduits = prods;});
  }
  onKeyUp(filterText : string){
    this.produits = this.allProduits.filter(
      item => item.nom!.toLowerCase().includes(filterText.toLowerCase())
    );
  }

}
