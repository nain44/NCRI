import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemFieldsRoutingModule } from './system-fields-routing.module';
import { SystemFieldsComponent } from './system-fields/system-fields.component';
import { SystemFieldService } from './service';
import { AccordionModule } from 'ngx-bootstrap/accordion';

@NgModule({
  declarations: [SystemFieldsComponent],
  imports: [
    CommonModule,
    SystemFieldsRoutingModule,
    AccordionModule.forRoot(),
  ],
  providers:[SystemFieldService]
})
export class SystemFieldsModule { }
