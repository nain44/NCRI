import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TagInputModule } from 'ngx-chips';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { NgxBootstrapMultiselectModule } from 'ngx-bootstrap-multiselect';



@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    CommentsRoutingModule,
    BsDatepickerModule.forRoot(),
    TagInputModule,
    TypeaheadModule.forRoot(),
    AccordionModule.forRoot(),
    NgxBootstrapMultiselectModule
  ]
})
export class CommentsModule { }
