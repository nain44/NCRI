import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentsRoutingModule } from './documents-routing.module';
import { DocumentsComponent } from './documents/documents.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
// import { DndDirective } from 'src/app/core/directives/dnd.directive';
import { DirectivesModule } from 'src/app/core';
import { AccordionModule } from 'ngx-bootstrap/accordion';





@NgModule({
  declarations: [DocumentsComponent],
  imports: [
    CommonModule,
    DocumentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DirectivesModule,
    AccordionModule.forRoot(),
  ]
})
export class DocumentsModule { }
