import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';  
import { FieldMappingComponent } from './field-mapping/field-mapping.component';

const routes: Routes = [
  {
    path: '',
    component: FieldMappingComponent,
    children: [
      { path: '', redirectTo: 'dashboard'},
      { path: 'edit-field-mapping/:id', loadChildren: () => import('./afm-edit-field-mapping/afm-edit-field-mapping.module').then(m => m.AFMEditFieldMappingModule) },
      { path: 'edit-file-info', loadChildren: () => import('./afm-edit-file-info/afm-edit-file-info.module').then(m => m.AFMEditFileInfoModule) },
      { path: 'map', loadChildren: () => import('./afmfield-mapping/afmfield-mapping.module').then(m => m.AFMFieldMappingModule) },
      { path: 'file-info', loadChildren: () => import('./afmfile-info/afmfile-info.module').then(m => m.AFMFileInfoModule) },
      { path: 'upload-file', loadChildren: () => import('./afmupload-file/afmupload-file.module').then(m => m.AFMUploadFileModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FieldMappingRoutingModule { }
