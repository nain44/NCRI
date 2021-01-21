import { ClientDemographicService } from './services/client-demographic.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientDemographicRoutingModule } from './client-demographic-routing.module';
import { AddClientComponent } from './add-client/add-client.component';


@NgModule({
  declarations: [AddClientComponent],
  imports: [
    CommonModule,
    ClientDemographicRoutingModule
  ],
  providers:[ClientDemographicService]
})
export class ClientDemographicModule { }
