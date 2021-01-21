import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AfmStoreTempService {
  public editFieldMappingForm: FormGroup;

  constructor(
    private fb: FormBuilder,) { }

    initEditFieldMappingForm(){
      this.editFieldMappingForm = this.fb.group({
        
      })
    }

}
