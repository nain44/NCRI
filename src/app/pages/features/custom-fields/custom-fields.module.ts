import { AccordionModule } from 'ngx-bootstrap/accordion';

import { CustomFieldsComponent } from './custom-fields/custom-fields.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomFieldsRoutingModule } from './custom-fields-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreService, CustomFieldService } from './service';
import { DirectivesModule } from '../../../core';


@NgModule({
  declarations: [CustomFieldsComponent],
  imports: [
    CommonModule,
    CustomFieldsRoutingModule,
    ReactiveFormsModule,
    DirectivesModule,
    AccordionModule.forRoot(),

  ],
  providers: [StoreService, CustomFieldService]
})
export class CustomFieldsModule { }
