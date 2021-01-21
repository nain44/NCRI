import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ncri-client-management',
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.scss']
})
export class ClientManagementComponent implements OnInit {
  id:string = "";
  constructor(
    private route: ActivatedRoute
  ) { 
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id)
  }

  ngOnInit(): void {
  }

}
