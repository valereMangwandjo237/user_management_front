import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Categorie } from '../models/categorie.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-categorie',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './update-categorie.component.html',
})
export class UpdateCategorieComponent implements OnInit{
  @Input()
  categorie!: Categorie

  @Input()
  addCategorie!: boolean

  @Output()
  categorieUpdated = new EventEmitter<Categorie>

  ngOnInit(): void {
    console.log("Composant transmis: ", this.categorie)
  }

  saveCategorie(): void{
    this.categorieUpdated.emit(this.categorie)
  }

}
