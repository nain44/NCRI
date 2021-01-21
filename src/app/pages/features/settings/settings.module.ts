import { DirectivesModule } from 'src/app/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SettingsRoutingModule } from './settings-routing.module';
import { ChangeLogoComponent } from './change-logo-component/change-logo.component';
import { IntegrationComponent } from './integration/integration.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SettingService } from './services';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [ChangeLogoComponent, IntegrationComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TooltipModule.forRoot(),
    TimepickerModule.forRoot(),
    PaginationModule.forRoot(),
    ModalModule.forRoot(),
    DirectivesModule,
    AccordionModule.forRoot(),
  ],
  providers:[SettingService]
})
export class SettingsModule { }
