import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountImporterComponent } from './account-importer/account-importer.component'

const routes: Routes = [
  {
    path: "",
    component: AccountImporterComponent,
    children: [
      { path: '', redirectTo: 'dashboard' },
      { path: 'add-account-importer', loadChildren: () => import('./add-account-importer/add-account-importer.module').then(m => m.AddAccountImporterModule) },
      { path: 'edit-account-importer/:id', loadChildren: () => import('./edit-account-importer/edit-account-importer.module').then(m => m.EditAccountImporterModule) },
      
      { path: 'importing/:id', loadChildren: () => import('./import-status/import-status.module').then(m => m.ImportStatusModule) },
      { path: 'rollback/:id', loadChildren: () => import('./rollback-status/rollback-status.module').then(m => m.RollbackStatusModule) },
      { path: 'error/:id', loadChildren: () => import('./error-status/error-status.module').then(m => m.ErrorStatusModule) },
      { path: 'dashboard', loadChildren: () => import('./importer-dashboard/importer-dashboard.module').then(m => m.ImporterDashboardModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountImporterRoutingModule { }
