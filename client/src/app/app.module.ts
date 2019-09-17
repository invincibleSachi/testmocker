import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { CookieService } from 'ngx-cookie-service';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MockComponent } from './components/mock/mock.component';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { TabViewModule } from 'primeng/tabview';
import { FileUploadModule } from 'primeng/fileupload';
import { ButtonModule } from 'primeng/button';
import { AccordionModule } from 'primeng/accordion';
import { EditMockComponent } from './components/edit-mock/edit-mock.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'service-mock',
    component: MockComponent
  },
  {
    path: 'edit-mock',
    component: EditMockComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }]
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MockComponent,
    EditMockComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    TabViewModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(routes),
    OverlayPanelModule,
    FileUploadModule,
    ButtonModule,
    AccordionModule,
    TabViewModule
  ],
  providers: [DatePipe, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
