import { Component, OnInit } from '@angular/core';
import { Produit } from '../models/produit.model';
import { FormsModule } from '@angular/forms';
import { ProduitService } from '../services/produit.service';
import { Categorie } from '../models/categorie.model';
import { Router } from '@angular/router';
import { Image } from '../models/image.model';

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
  imgSelect!: number
  categories!: Categorie[]
  uploadedImage!: File
  imagePath: any

  constructor(private produitService: ProduitService, private router: Router){ }

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(
      cats => {
        this.categories = cats._embedded.categories;
        console.log(cats);
      }
    )
  }

  onImageUpload(event: any){
    this.uploadedImage = event.target.files[0]
    this.imgSelect = 1

    var reader = new FileReader()
    reader.readAsDataURL(this.uploadedImage)
    reader.onload = (_event) => {this.imagePath = reader.result}
  }

  addProduit(){
    this.produitService
        .uploadImage(this.uploadedImage, this.uploadedImage.name).subscribe(
          (img: Image) => {
          this.newProduit.image = img
          this.newProduit.categorie = this.categories.find(cat => cat.id == this.newIdCat)!;
          this.produitService.addProduit(this.newProduit).subscribe(
            () =>{
              this.router.navigate(["produits"])
            }
          )
        }
      )

  }

}
