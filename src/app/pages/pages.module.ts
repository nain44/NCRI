import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages-component/pages.component';
import { SharedModule, Interceptor } from '../core';


@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    PagesRoutingModule,
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true }
  ]
})
export class PagesModule { }
