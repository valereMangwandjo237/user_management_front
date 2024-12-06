import { APP_ID, inject, Injectable } from '@angular/core';
import { Produit } from '../models/produit.model';
import { Categorie } from '../models/categorie.model';
import { Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL, apiURLCat } from '../app.config';
import { CategorieWrapper } from '../models/categorieWarpped.model';
import { AuthService } from './auth/auth.service';
import { Image } from '../models/image.model';

const httpOption = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  produits!: Produit[]
  produit!: Produit
  categories!: Categorie[]

  constructor(private http: HttpClient, private auhtService: AuthService) { }

  listeProduits(): Observable<Produit[]>{
    let jwt = this.auhtService.getToken()
    jwt = "Bearer " + jwt
    let httpHeaders = new HttpHeaders({"Authorization": jwt})

    return this.http.get<Produit[]>(apiURL+"/all")
  }

  listeCategories(): Observable<CategorieWrapper>{
    let jwt = this.auhtService.getToken()
    jwt = "Bearer " + jwt
    let httpHeaders = new HttpHeaders({"Authorization": jwt})

    return this.http.get<CategorieWrapper>(apiURLCat, {headers: httpHeaders})
  }

  consulterCategorie(id:number): Categorie{
    return this.categories.find(cat => cat.id == id)!;
  }

  deleteCategorie(id: number){
    const url = `${apiURLCat}/${id}`;
    return this.http.delete<Categorie>(url, httpOption)
  }

  addCategorie(cat: Categorie): Observable<Categorie>{
    return this.http.post<Categorie>(apiURLCat, cat, httpOption)
  }

  addProduit(produit: Produit){
    let jwt = this.auhtService.getToken()
    jwt = "Bearer " + jwt
    let httpHeaders = new HttpHeaders({"Authorization": jwt})

    return this.http.post<Produit[]>(apiURL+"/addprod", produit, {headers: httpHeaders})
  }

  deleteProduit(id: number){
    const url = `${apiURL}/deleteprod/${id}`;
    let jwt = this.auhtService.getToken()
    jwt = "Bearer " + jwt
    let httpHeaders = new HttpHeaders({"Authorization": jwt})

    return this.http.delete<Produit[]>(url, {headers: httpHeaders})
  }

  consulterProduit(id:number): Observable<Produit>{
    const url = `${apiURL}/getbyid/${id}`;
    let jwt = this.auhtService.getToken()
    jwt = "Bearer " + jwt
    let httpHeaders = new HttpHeaders({"Authorization": jwt})

    return this.http.get<Produit>(url, {headers: httpHeaders})
  }

  trierProduits(){
    this.produits = this.produits.sort((n1,n2) => {
      if (n1.id! > n2.id!) {
        return 1;
      }
      if (n1.id! < n2.id!) {
        return -1;
      }
      return 0;
    });
  }

  updateProduit(produit: Produit): Observable<Produit>{
    const id = produit.id
    const url = `${apiURL}/updateprod/${id}`;
    let jwt = this.auhtService.getToken()
    jwt = "Bearer " + jwt
    let httpHeaders = new HttpHeaders({"Authorization": jwt})

    return this.http.put<Produit>(url, produit, {headers: httpHeaders})
  }

  rechercherByCategorie(idCat: number):Observable<Produit[]> {
    const url = `${apiURL}/prodcats/${idCat}`;
    return this.http.get<Produit[]>(url);
  }

  rechercherByName(nom: String):Observable<Produit[]> {
    const url = `${apiURL}/prodsByName/${nom}`;
    return this.http.get<Produit[]>(url);
  }

  uploadImage(file: File, filename: string): Observable<Image>{
    const url = `${apiURL + '/image/upload'}`;
    const imageFormData = new FormData()
    imageFormData.append("image", file, filename)

    return this.http.post<Image>(url, imageFormData);
  }

  loadImage(id: number): Observable<Image>{
    const url = `${apiURL + 'image/get/info'}/${id}`;
    return this.http.get<Image>(url);
  }
}

