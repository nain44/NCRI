
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard'
  },
  {
    path: 'dashboard', loadChildren: () =>
      import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'dropdown-details', loadChildren: () =>
      import('./dropdown-details/dropdown-details.module').then(m => m.DropdownDetailsModule)
  },
  {
    path: 'assign-dropdown-details', loadChildren: () =>
      import('./dropdown-details-assign/dropdown-details-assign.module').then(m => m.DropdownDetailsAssignModule)
  },
  {
    path: 'input-details', loadChildren: () =>
      import('./input-details/input-details.module').then(m => m.InputDetailsModule)
  },
  {
    path: 'assign-input-details', loadChildren: () =>
      import('./input-details-assign/input-details-assign.module').then(m => m.InputDetailsAssignModule)
  },
  {
    path: 'select-type', loadChildren: () =>
      import('./type-selection/type-selection.module').then(m => m.TypeSelectionModule)
  },
  {
    path: 'edit-input/:id', loadChildren: () =>
      import('./edit-input/edit-input.module').then(m => m.EditInputModule)
  },

  {
    path: 'edit-dropdown/:id', loadChildren: () =>
      import('./edit-dropdown/edit-dropdown.module').then(m => m.EditDropdownModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomFieldsRoutingModule { }
