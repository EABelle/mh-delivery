import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DeliveryDetailsPageComponent } from './pages/delivery-details-page/delivery-details-page.component';
import { DeliveryConfirmationPageComponent } from './pages/delivery-confirmation-page/delivery-confirmation-page.component';
import { SlotsContainerComponent } from './components/slots-container/slots-container.component';
import { DatesContainerComponent } from './components/dates-container/dates-container.component';
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [
    AppComponent,
    DeliveryDetailsPageComponent,
    DeliveryConfirmationPageComponent,
    SlotsContainerComponent,
    DatesContainerComponent,
    ButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
