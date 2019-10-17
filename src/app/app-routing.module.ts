import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from '../app/page-not-found/page-not-found.component'
import { ClientListComponent } from '../app/client-list/client-list.component'
import { FeatureListComponent } from './feature-list/feature-list.component';


const routes: Routes = [
  {
    path: 'clients',
    component: ClientListComponent,
    //pathMatch: 'full'
  },
  {
    path: 'features',
    component: FeatureListComponent,
    //pathMatch: 'full'
  },
  // {
  //   path: 'signatures/:id',
  //   component: SignatureDetailViewComponent,
  //   //pathMatch: 'full'
  // },
  // {
  //   path: ':eventId',
  //   component: NewSignatureComponent,
  //   //pathMatch: 'full'
  // },
  { path: '', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
