# MathemDelivery

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.6.

## Pages/Services layout

The pages consume three main services:
- `DeliveryHTTPService` for having the available data from Mathem (available dates and times). It also has the responsibility of returning all the data sorted as requested.
- `DeliveryCacheService` which consumes the delivery data from the user into the `LocalStorage`, to persist between reloads.
- `DeliveryStateService` for subscribing to the selected data by the user (dates, times and home delivery), and also pushing changes to the data. This service consumes the `DeliveryCacheService` to get/update the data.

Also, each page is managed by the `router-outlet` from the `RoutingModule`, also being `/delivery-details` url's page the default one when navigating.
<img width="799" alt="image" src="https://user-images.githubusercontent.com/9503826/199574224-86d0fbd0-2228-4d79-bd1f-0186ca2f83e1.png">

## Run development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Unit tests

Unit tests have been implemented for **components** and **services**, but not for pages since it might be appropiate to do E2E tests.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
