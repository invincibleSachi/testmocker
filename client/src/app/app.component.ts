
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'Mocker';
  private subscription: Subscription;
  constructor(
    private cookieService: CookieService
  ) {
    if (this.cookieService.get('isLoggedIn') !== 'false') {
      this.cookieService.set('employeeId', '');
      this.cookieService.set('token', '');
      this.cookieService.set('isLoggedIn', 'false');
    }
  }

  isLoggedIn = true;

  ngOnInit() {
    this.isLoggedIn = (this.cookieService.get('isLoggedIn') === 'true');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
