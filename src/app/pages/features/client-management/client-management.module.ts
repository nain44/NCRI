import { ClientManagementService } from './services/client-management.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientManagementRoutingModule } from './client-management-routing.module';
import { ClientManagementComponent } from './client-management/client-management.component';
import { ClientDemographicService } from '../client-demographic/services/client-demographic.service';



@NgModule({
  declarations: [ClientManagementComponent],
  imports: [
    CommonModule,
    ClientManagementRoutingModule
  ],
  providers: [ClientManagementService, ClientDemographicService]
})
export class ClientManagementModule { }
