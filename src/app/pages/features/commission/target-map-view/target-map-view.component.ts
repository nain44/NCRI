import { Component, OnInit } from '@angular/core';
import { CommissionService } from '../service';


declare var google;

@Component({
  selector: 'ncri-target-map-view',
  templateUrl: './target-map-view.component.html',
  styleUrls: ['./target-map-view.component.scss']
})

export class TargetMapViewComponent implements OnInit {
  uncheckableRadioModel: boolean = true;
  startDate = new Date();
  endDate = new Date();
  map: any;
  constructor(
    private service: CommissionService
  ) { 

    this.setDate();
  }

  ngOnInit(): void {
    this.getMapData();
  }

  setDate(){
    let end:any = new Date().setMonth(this.startDate.getMonth() + 1);
    this.endDate = new Date(end);
  }

  ngAfterViewInit(){
    this.initMap()
  }

  initMap(){
    this.map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8,
    });
  }

  addMarker(data:any){  
    var marker = new google.maps.Marker({
      position: data.coordinates,
      title:data.name,
      icon: '/assets/images/map-marker.png' 
  });
 

  marker.setMap(this.map);
  let html = "";
  for(var i = 0; i<data.branchList.length; i++){
    html += `<li><span>${data.branchList[i].branchName}</span> <span>${data.branchList[i].amount}</span></li>`;
  }
  const infowindow = new google.maps.InfoWindow({
    content: `
      <h4>${data.name}</h4>
      <ul>
        ${html}
      </ul>
    `,
  });

  marker.addListener("click", () => {
    infowindow.open(this.map, marker);
  });
  // this.map.setCenter(data.coordinates)
  }

  getMapData(){
    //debugger
    let start = this.startDate.getFullYear() + "-" + (this.startDate.getMonth() + 1) + "-" + this.startDate.getDate();
    let end = this.endDate.getFullYear() + "-" + (this.endDate.getMonth() + 1) + "-" + this.endDate.getDate();
    let obj = {
      start_date: start,
      end_date: end
    }
    this.service.fetchTargetMapData(obj).subscribe((res) => {
      //debugger
      if(res.status === "success"){
        let list = res.data;
        let lastLocation;
        list.country_codes.map(it => {
          let data:any = {};
          let arr = list.users.filter(u => u.country_code === it);
          const unique = [...new Set(arr.map(item => item.branch_location__address))];
          if(arr.length > 0){
            lastLocation = { lat: arr[0].country_coordinates[0], lng: arr[0].country_coordinates[1] }
            data.coordinates = lastLocation;
            data.name = it;
            let branchList = [];
            unique.map(b => {
              let branchData:any = {};
              let filteredList = arr.filter(a => a.branch_location__address === b);
              let total = filteredList.reduce((accum,item) => accum + item.target_amount, 0)
              branchData.branchName = b;
              branchData.amount = total;
              branchList.push(branchData);
            });
            data.branchList = branchList;
            this.addMarker(data);
          }
          // let obj = res.data.users.find(u => u.country_code === it);
          // obj ? this.addMarker({ lat: obj.country_coordinates[0], lng: obj.country_coordinates[1] }) : "";
        });

        if(lastLocation){
          this.map.setCenter(lastLocation)
        }
      }
    },(error) =>{
      //debugger
    })
  }

}
