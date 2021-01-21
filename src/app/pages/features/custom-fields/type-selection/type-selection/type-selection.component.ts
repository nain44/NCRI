import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StoreService } from '../../service/store.service';

@Component({
  selector: 'ncri-type-selection',
  templateUrl: './type-selection.component.html',
  styleUrls: ['./type-selection.component.scss']
})
export class TypeSelectionComponent implements OnInit {

  constructor(
    public store: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  selectType(type: string) {
    this.store.customFieldForm.controls.field_type.setValue(type);
  }

  redirectToPage() {
    if (this.store.customFieldForm.controls.field_type.value === "input") {
      this.router.navigate(['/custom-fields/input-details']);
    } else {
      this.router.navigate(['/custom-fields/dropdown-details']);
    }
  }

}
