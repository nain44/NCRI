import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments/comments.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TagInputModule } from 'ngx-chips';
import { AccordionModule } from 'ngx-bootstrap/accordion';



@NgModule({
  declarations: [CommentsComponent],
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    CommentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BsDatepickerModule.forRoot(),
    TagInputModule,
    AccordionModule.forRoot(),
  ]
})
export class CommentsModule { }
