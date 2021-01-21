import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateGradeComponent } from './create-grade/create-grade.component';
import { EditGradeComponent } from './edit-grade/edit-grade.component';
import { GradeComponent } from './grade/grade.component';
import { ViewGradeComponent } from './view-grade/view-grade.component';

const routes: Routes = [
  {path:'', component: GradeComponent},
  {path:'create-grade', component: CreateGradeComponent},
  {path:'edit-grade', component: EditGradeComponent},
  {path:'view-grade', component: ViewGradeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GradeRoutingModule { }
