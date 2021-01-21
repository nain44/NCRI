import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RollbackStatusComponent } from './rollback-status/rollback-status.component';

const routes: Routes = [
  {
    path: '',
    component: RollbackStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RollbackStatusRoutingModule { }
