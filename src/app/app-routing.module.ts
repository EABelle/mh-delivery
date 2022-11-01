import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveryConfirmationPageComponent } from './pages/delivery-confirmation-page/delivery-confirmation-page.component';
import { DeliveryDetailsPageComponent } from './pages/delivery-details-page/delivery-details-page.component';

export enum RoutePath {
  DeliveryDetails = 'delivery-details',
  DeliveryConfirmation = 'delivery-confirmation',
}

const routes: Routes = [
  {
    path: RoutePath.DeliveryDetails,
    component: DeliveryDetailsPageComponent
  },
  {
    path: RoutePath.DeliveryConfirmation,
    component: DeliveryConfirmationPageComponent
  },
  {
    path: '**',
    redirectTo: RoutePath.DeliveryDetails
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
