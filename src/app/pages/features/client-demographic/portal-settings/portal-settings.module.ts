import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortalSettingsRoutingModule } from './portal-settings-routing.module';
import { PortalSettingsComponent } from './portal-settings/portal-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [PortalSettingsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ModalModule.forRoot(),
    PortalSettingsRoutingModule,
    AccordionModule.forRoot(),
  ]
})
export class PortalSettingsModule { }
