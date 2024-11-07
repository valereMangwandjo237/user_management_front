import { Component, OnInit } from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { ProduitService } from '../services/produit.service';
import { CommonModule } from '@angular/common';
import { UpdateCategorieComponent } from '../update-categorie/update-categorie.component';

@Component({
  selector: 'app-liste-categories',
  standalone: true,
  imports: [
    CommonModule,
    UpdateCategorieComponent
  ],
  templateUrl: './liste-categories.component.html',
})
export class ListeCategoriesComponent implements OnInit{
  categories!: Categorie[]
  updatedCat: Categorie = {"id":0,"nom":""};
  addcat: boolean = true

  constructor(private produitService: ProduitService){}

  ngOnInit(): void {
    this.produitService.listeCategories().subscribe(
      cats => (this.categories = cats._embedded.categories)
    )
  }

  loadCategories(){
    this.produitService.listeCategories().subscribe(
      cats => {this.categories = cats._embedded.categories}
    )
  }

  categorieUpdated(cat: Categorie){
    console.log("Category updated event: ", cat)
    this.produitService.addCategorie(cat).subscribe(
      () => this.loadCategories()
    )
    this.addcat = true
  }

  updated(cat: Categorie){
    this.updatedCat = cat
    this.addcat = false
  }

  delete(cat: Categorie){
    let rep = confirm("Etes-vous sur?")

    if(rep){
      this.produitService.deleteCategorie(cat.id!).subscribe(() => {
        this.loadCategories();
      });
    }
  }



}
