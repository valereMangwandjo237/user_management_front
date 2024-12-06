import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ProduitService } from '../services/produit.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Image } from '../models/image.model';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    RouterLink
  ],
  templateUrl: './produits.component.html',
  styleUrl: './produits.component.css'
})
export class ProduitsComponent implements OnInit{
  produits!: Produit[];

  constructor(private produitService: ProduitService, public authService: AuthService){
  }
  ngOnInit(): void {
    this.loadProduits();
  }


  private loadProduits() {
    this.produitService.listeProduits().subscribe(
      prods => {
        this.produits = prods;
        console.log(this.produits)
        this.produits.forEach((prod) => {
          this.produitService.loadImage(prod.image.idImage).subscribe(
            (img: Image) => { prod.imageStr = "data:" + img.type + ";base64," + img.image }
          )
        })
      }
    );
  }

  deleteProduit(p: Produit){
    let rep = confirm("Etes-vous sur?")

    if(rep){
      this.produitService.deleteProduit(p.id).subscribe(() => {
        this.loadProduits();
      });
    }
  }

}
