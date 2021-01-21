import { ClientManagementComponent } from './client-management/client-management.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: ClientManagementComponent,
    children: [
      { path: '', redirectTo: 'client-summary' },
      {
        path: 'client-summary', loadChildren: () => import('./client-summary/client-summary.module').then(m =>
          m.ClientSummaryModule)
      },
      {
        path: 'client-details', loadChildren: () => import('./client-details/client-details.module').then(m =>
          m.ClientDetailsModule)
      },
      {
        path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then(m =>
          m.TransactionsModule)
      },
      {
        path: 'comments', loadChildren: () => import('./comments/comments.module').then(m =>
          m.CommentsModule)
      },

    ]
  },

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientManagementRoutingModule { }
