import { AfmuploadFileComponent } from './afmupload-file/afmupload-file.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AfmuploadFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AFMUploadFileRoutingModule { }
