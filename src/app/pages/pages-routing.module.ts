import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages-component/pages.component';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
        { path: '', redirectTo: 'client-dashboard' },
        // { path: 'updatepassword', loadChildren: () =>
        // import('./features/update_pass/update_password.module').then(m => m.UpdatePasswordModule) },
        { path: 'field-mapping', loadChildren: () => import('./features/field-mapping/field-mapping.module').then(m => m.FieldMappingModule) },
        { path: 'account-importer', loadChildren: () => import('./features/account-importer/account-importer.module').then(m => m.AccountImporterModule) },
        { path: 'user', loadChildren: () => import('./features/user/user.module').then(m => m.UserModule) },
        { path: 'role', loadChildren: () => import('./features/roles/roles.module').then(m => m.RolesModule) },
        { path: 'group', loadChildren: () => import('./features/groups/groups.module').then(m => m.GroupsModule) },
        { path: 'commission', loadChildren: () => import('./features/commission/commission.module').then(m => m.CommissionModule) }, 
        { path: 'account-settings', loadChildren: () =>
        import('./features/account-settings/account-settings.module').then(m => m.AccountSettingsModule) },
        { path: 'settings', loadChildren: () => import('./features/settings/settings.module').then(m => m.SettingsModule) },
        { path: 'profile', loadChildren: () => import('./features/profile/profile.module').then(m => m.ProfileModule) },
        { path: 'grade', loadChildren: () => import('./features/grade/grade.module').then(m => m.GradeModule) },
        {path: 'add-client', loadChildren: () =>
        import('./features/client-demographic/client-demographic.module').then(m => m.ClientDemographicModule) },
        {path: 'client-management/:id', loadChildren: () =>
        import('./features/client-management/client-management.module').then(m => m.ClientManagementModule) },
        {path: 'client-dashboard', loadChildren: () =>
        import('./features/client-dashboard/client-dashboard.module').then(m => m.ClientDashboardModule) },     
        {path: 'custom-fields', loadChildren: () =>
          import('./features/custom-fields/custom-fields.module').then(m => m.CustomFieldsModule)},
        {path: 'system-fields', loadChildren: () =>
          import('./features/system-fields/system-fields.module').then(m => m.SystemFieldsModule)},
        {path: 'user-teams', loadChildren: () => 
          import('./features/user-teams/user-teams.module').then(m => m.UserTeamsModule) }      
    ]
},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
