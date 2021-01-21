import { AddClientComponent } from './add-client/add-client.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AddClientComponent,
    children: [
      { path: '', redirectTo: 'client-info' },
      {
        path: 'client-info', loadChildren: () => import('./client-info/client-info.module').then(m =>
          m.ClientInfoModule)
      },
      {
        path: 'client-details', loadChildren: () => import('./client-details/client-details.module').then(m =>
          m.ClientDetailsModule)
      },
      {
        path: 'custom-fields', loadChildren: () => import('./custom-fields/custom-fields.module').then(m =>
          m.CustomFieldsModule)
      },
      {
        path: 'custom-fields-demo', loadChildren: () => import('./custom-fields-demo/custom-fields-demo.module').then(m =>
          m.CustomFieldsDemoModule)
      },
      {
        path: 'comments', loadChildren: () => import('./comments/comments.module').then(m =>
          m.CommentsModule)
      },
      {
        path: 'documents', loadChildren: () => import('./documents/documents.module').then(m =>
          m.DocumentsModule)
      },
      {
        path: 'portal-settings', loadChildren: () => import('./portal-settings/portal-settings.module').then(m =>
          m.PortalSettingsModule)
      },

    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientDemographicRoutingModule { }
