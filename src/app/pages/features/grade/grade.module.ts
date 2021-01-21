import { PipesModule } from './pipes/pipes.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GradeRoutingModule } from './grade-routing.module';
import { GradeComponent } from './grade/grade.component';
import { CreateGradeComponent } from './create-grade/create-grade.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { GradeService } from './service';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { EditGradeComponent } from './edit-grade/edit-grade.component';
import { ViewGradeComponent } from './view-grade/view-grade.component';

@NgModule({
  declarations: [GradeComponent, CreateGradeComponent, EditGradeComponent, ViewGradeComponent],
  imports: [
    CommonModule,
    GradeRoutingModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    AccordionModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PipesModule
  ],
  providers:[GradeService]
})
export class GradeModule { }
