import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from '../services/produit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Categorie } from '../models/categorie.model';
import { Image } from '../models/image.model';

@Component({
  selector: 'app-update-produit',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './update-produit.component.html'
})
export class UpdateProduitComponent implements OnInit{
  currentProduit!: Produit
  categories!: Categorie[]
  newIdCat!: number
  myImage!: string

  constructor(private activatedRoute: ActivatedRoute,
              private produitService: ProduitService,
              private router: Router
            ){}

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(
      cats => {
        this.categories = cats._embedded.categories;
      }
    )
    this.produitService.consulterProduit(this.activatedRoute.snapshot.params['id']).subscribe(
      prod =>{
        this.currentProduit = prod
        this.newIdCat = this.currentProduit.categorie.id!
        this.produitService.loadImage(this.currentProduit.image.idImage).subscribe(
          (img: Image) => {
            this.myImage = "data:" + img.type + ";base64," + img.image;
            alert(this.myImage)
          }
        )
      }
    )
  }

  updateProduit(){
    this.currentProduit.categorie = this.categories.find(cat => cat.id == this.newIdCat)!;
    this.produitService.updateProduit(this.currentProduit).subscribe(
      prod => {
        this.router.navigate(['produits']);
      }
    );
  }

}
