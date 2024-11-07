import { Routes } from '@angular/router';
import { ProduitsComponent } from './produits/produits.component';
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { RechercheByCategorieComponent } from './recherche-by-categorie/recherche-by-categorie.component';
import { RechercheByNomComponent } from './recherche-by-nom/recherche-by-nom.component';
import { ListeCategoriesComponent } from './liste-categories/liste-categories.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { produitGuard } from './guard/produit.guard';
import { RegisterComponent } from './register/register.component';
import { VerifEmailComponent } from './verif-email/verif-email.component';

export const routes: Routes = [
    {path: "", redirectTo: "produits", pathMatch: 'full'},
    {path: "produits", component: ProduitsComponent},
    {path: "add-produit", component: AddProduitComponent, canActivate:[produitGuard]},
    {path: "update-produit/:id", component: UpdateProduitComponent},
    {path: "rechercheParCategorie", component: RechercheByCategorieComponent},
    {path: "rechercheParnom", component: RechercheByNomComponent},
    {path: "listeCategories", component : ListeCategoriesComponent},
    {path: "login", component: LoginComponent},
    {path: 'app-forbidden', component: ForbiddenComponent},
    {path: 'register', component: RegisterComponent},
    { path: 'verifyEmail', component: VerifEmailComponent},
    
];
