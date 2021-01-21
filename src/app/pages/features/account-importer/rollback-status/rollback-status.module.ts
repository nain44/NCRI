import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RollbackStatusRoutingModule } from './rollback-status-routing.module';
import { RollbackStatusComponent } from './rollback-status/rollback-status.component';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [RollbackStatusComponent],
  imports: [
    CommonModule,
    RollbackStatusRoutingModule,
    AccordionModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class RollbackStatusModule { }
