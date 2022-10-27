import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryDetailsPageComponent } from './pages/delivery-details-page/delivery-details-page.component';

const routes: Routes = [
  {
    path: 'delivery-details',
    component: DeliveryDetailsPageComponent
  },
  {
    path: '**',
    redirectTo: 'delivery-details'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
