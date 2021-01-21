import { Component } from '@angular/core'; 
// declare var $ :any;

@Component({
  selector: 'ncri-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor() {  
  } 
 
  // Method to dynamically load JavaScript 
  loadScripts() {  
       
 
    // This array contains all the files/CDNs 
    // const dynamicScripts = [ 
      //  'assets/vendors/jquery/dist/jquery.min.js',
      //  'assets/vendors/popper.js/dist/umd/popper.min.js',
      //  'assets/vendors/bootstrap/dist/js/bootstrap.min.js',
      //  'assets/dist/js/feather.min.js',
      //  'assets/dist/js/select2.min.js',
      //  'assets/dist/js/jquery.slimscroll.js',
      //  'assets/dist/js/dropdown-bootstrap-extended.js',
      //  'assets/vendors/jquery-toggles/toggles.min.js',
      //  'assets/dist/js/toggle-data.js',
      //  'assets/dist/js/init.js',
    //    'assets/dist/js/custom.js'
    // ]; 
    // for (let i = 0; i < dynamicScripts.length; i++) { 
    //   const node = document.createElement('script'); 
    //   node.src = dynamicScripts[i]; 
    //   node.type = 'text/javascript'; 
    //   node.async = false; 
    //   document.getElementsByTagName('body')[0].appendChild(node); 
    // } 
  
    // $(document).ready(function(){
    //   alert('call');
    //   $(".selectDropdown").change(function (el) {  
    //     if($(this.el.nativeElement).val() == "0") $(this).addClass("empty");
    //     else $(this.el.nativeElement).removeClass("empty")
    //   });
    //   $(".selectDropdown").change(); 
    // }); 
  } 
  ngAfterViewInit(){
    // this.loadScripts();
  }
}
