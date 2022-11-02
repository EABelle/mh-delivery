import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { RoutePath } from './app-routing.module';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'mathem-delivery';
  urlPath: string = '';
  urlSubscription: Subscription;
  backButtonUrl: string = '';

  constructor(
    private router: Router
  ) {}

  ngOnInit() {
    this.urlSubscription = this.router.events.subscribe(events => {
      if (events instanceof NavigationEnd) {
        this.urlPath = events.url;
        this.backButtonUrl = this.getBackButtonUrl();
      }
    })
  }

  ngOnDestroy(): void {
    this.urlSubscription?.unsubscribe();
  }

  private getBackButtonUrl(): string {
    return this.urlPath === `/${RoutePath.DeliveryConfirmation}` ? RoutePath.DeliveryDetails : '';
  }
}
