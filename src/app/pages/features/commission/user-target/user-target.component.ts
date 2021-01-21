import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { CommissionService } from '../service';

@Component({
  selector: 'ncri-user-target',
  templateUrl: './user-target.component.html',
  styleUrls: ['./user-target.component.scss']
})
export class UserTargetComponent implements OnInit {
  treeData: any;
  targetAmount: any = 0;
  assignedTotalAmount: any = 0;
  amountLeft: number = 0;
  @ViewChild('amount') limitModal: TemplateRef<any>;
  @ViewChild('errorModal') errorModal: TemplateRef<any>;
  modalRef: BsModalRef;
  responseText: any[] = [];
  loader: boolean;
  mainLoader: boolean = false;
  isDisabled: boolean = true;
  previousLoader: boolean = false;
  currentUserID: string = "";
  currentUserGrade: number = 0;
  branchList: any = [];
  selectedBranch: any;
  countryList: any = [];
  selectedCountry: any;
  copyData: any;
  currentUserName: string = "";
  toolTipMessage: string = "";
  amountError: string;
  currentScreen: number = 2;
  dataConfig = {
    "start_date": "2020-10-02",
    "end_date": "2020-11-02",
    "current_viewable_screen_num": this.currentScreen,
    "last_reporting_to_ids": [
    ]
  }
  screenViewed: number = 0;
  nextScreenIDS: any;
  nextLoader: boolean = false;

  config = {
    animated: true,
    keyboard: false,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'add-comment add-comment--delete'
  };

  screensIDS:any = {
    screenOne: [],
    screenTwo:[],
    screenThree:[]
  };
  
  constructor(
    private service: CommissionService,
    private modalService: BsModalService,
    private router: Router
  ) {

    let data = localStorage.getItem('details');
    if (data) {
      let detail = JSON.parse(data).user;
      this.currentUserID = detail.id;
      this.currentUserGrade = detail.grade;
      this.currentUserName = detail.first_name + " " + detail.last_name;
      this.dataConfig.last_reporting_to_ids = [detail.id];
      this.screensIDS.screenOne = [detail.id];
      this.screenViewed = detail.employee_type__viewable_screen_count;
      // this.currentScreen = this.screenViewed;
      // this.dataConfig.current_viewable_screen_num = this.currentScreen;
    }
  }
  target: string = "set";
  targetDate: any = {
    startDate: new Date(),
    endDate: new Date()
  }
  ngOnInit(): void {
    if(this.currentUserGrade === 0){
      this.currentScreen = 1;
      this.dataConfig.current_viewable_screen_num = 1;
    }else if(this.currentUserGrade >= 1 && this.currentUserGrade<= 3){
      this.currentScreen = 2;
      this.dataConfig.current_viewable_screen_num = 2;
    }else if(this.currentUserGrade === 4){
      this.currentScreen = 3;
      this.dataConfig.current_viewable_screen_num = 3;
    }
    // this.getTargetRecords();
    // this.fetchTargetAmount();
    // if (this.currentUserGrade !== 0) {
    //   this.fetchTargetAmount();
    // } else {
    //   this.getTargetRecords();
    // }
  }

  assignExistingAmount() {
    this.treeData.map(it => {

      if (it.target_data.length > 0) {
        it.amount = 0;
        it.amount = it.target_data[0].target_amount;
      }

      it.children.map(two => {

        if (two.target_data.length > 0) {
          two.amount = 0;
          two.amount = two.target_data[0].target_amount;
        }

        two.children.map(three => {

          if (three.target_data.length > 0) {
            three.amount = 0;
            three.amount = three.target_data[0].target_amount;
          }

          three.children.map(four => {
            if (four.target_data.length > 0) {
              four.amount = 0;
              four.amount = four.target_data[0].target_amount;
            }
          })
        })
      })
    })

    this.copyData.map(it => {

      if (it.target_data.length > 0) {
        it.amount = 0;
        it.amount = it.target_data[0].target_amount;
      }

      it.children.map(two => {

        if (two.target_data.length > 0) {
          two.amount = 0;
          two.amount = two.target_data[0].target_amount;
        }

        two.children.map(three => {

          if (three.target_data.length > 0) {
            three.amount = 0;
            three.amount = three.target_data[0].target_amount;
          }

          three.children.map(four => {
            if (four.target_data.length > 0) {
              four.amount = 0;
              four.amount = four.target_data[0].target_amount;
            }
          })
        })
      })
    })
  }

  setTargetAmountFromExisting() {
    this.targetAmount = 0;
        this.assignedTotalAmount = 0;
    this.treeData.map(it => {
      // if (it.children.length > 0) {
        
        this.targetAmount += it.amount ? parseFloat(it.amount) : 0;
        this.assignedTotalAmount += it.amount ? parseFloat(it.amount) : 0;
      // }

    })
  }

  getTargetRecords() {
    this.dataConfig.start_date = this.targetDate.startDate.getFullYear() + "-" + (this.targetDate.startDate.getMonth() + 1) + "-" + this.targetDate.startDate.getDate(),
    this.dataConfig.end_date = this.targetDate.endDate.getFullYear() + "-" + (this.targetDate.endDate.getMonth() + 1) + "-" + this.targetDate.endDate.getDate(),
    this.service.fetchTreeData(this.dataConfig).subscribe((res) => {
      //
      this.responseText = [];
      
      this.mainLoader = false;
      this.nextLoader = false;
      this.loader = false;
      this.previousLoader = false;
      if (res.status === "success") {
        this.targetAmount = 0;
          this.amountLeft = 0;
          // if(this.currentScreen === 2){

          //   this.tempIDs = [...res.data.last_reporting_to_ids];
          // }if(this.currentScreen === 1){
          //   this.targetAmount = 3000;
          // }
          res.data.branch_location__addresses.push("All")
        this.branchList = res.data.branch_location__addresses;
        this.branchList.sort((a, b) => a.localeCompare(b));
        

        this.countryList = res.data.country_codes;
        
       

        this.treeData = res.data.users_hierarchy;
        this.copyData = res.data.users_hierarchy;

        //saving list of ids for next screen
        this.nextScreenIDS = res.data.last_reporting_to_ids;
        

        //filtering data with branch //find solution
        // if(this.currentScreen === 2){
        //   this.selectedBranch = this.branchList[0];
        //   this.changeBranch(this.selectedBranch);
        // }
        
        // if(this.currentScreen === 1){
        //   this.selectedCountry = this.countryList[0];
        //   this.changeCountry(this.selectedCountry);
        // }
        
        this.assignExistingAmount();
        this.setTargetAmountFromExisting();

        // let obj = Object.assign({}, this.treeData[0]);
        // let obj1 = {
        //   branch_location__address: "Branch Location A",
        //   children: [],
        //   country_code: "PK",
        //   employee_type__name: "Collection Supervisor",
        //   first_name: "Muhammad",
        //   grade: 3,
        //   id: "73752032-7626-486a-a8ee-9b0e848c0949",
        //   last_name: "Usman",
        //   reporting_to_id: "f2b8eb06-0cba-4924-b25a-41732e8d3386",
        // }
        // let obj = {
        //   branch_location__address: "Branch Location A",
        //   children: [],
        //   country_code: "PK",
        //   employee_type__name: "Collection Supervisor",
        //   first_name: "Muhammad",
        //   grade: 3,
        //   id: "73752032-7626-486a-a8ee-9b0e848c0949",
        //   last_name: "Usman",
        //   reporting_to_id: "f2b8eb06-0cba-4924-b25a-41732e8d3386",
        // }
        // this.treeData[0].children[0].children.push(obj);
        // this.treeData[0].children[0].children.push(obj1);

        // this.treeData.map(it => {
        //   it.amount = 0;
        //   it.children.map(two => {
        //     two.amount = 0;
        //     two.children.map(three => {
        //       three.amount = 0;
        //       three.children.map(four => {
        //         four.amount = 0;
        //       })
        //     })
        //   })
        // })
        if (this.treeData.length === 0) {
          this.isDisabled = false;
          this.toolTipMessage = "No users to assign target";
        } else {
          this.isDisabled = true;
          this.toolTipMessage = "";

          //switching view
          if (this.currentScreen === 1) {
            this.target = "one";
            this.screensIDS.screenTwo = this.nextScreenIDS;
          } else if (this.currentScreen === 2) {
            this.target = "two";
            this.screensIDS.screenThree = this.nextScreenIDS;
          } else if (this.currentScreen === 3) {
            this.target = "three";
            
          }
          // this.remainingAmount(this.targetAmount)
          this.amountChanged();
        }
      } else {
        if (res.errors) {
          for (var key in res.errors) {
            let obj = { name: key, list: res.errors[key].toString() };
            this.responseText.push(obj);
          }
        } else {
          this.responseText.push({ name: "Error", list: res.code });
        }

        this.openErrorModal();
      }

      
    }, (error) => {
      this.mainLoader = false;
      this.nextLoader = false;
      this.previousLoader = false;
      this.loader = false;
      this.responseText = [];
      this.responseText.push({ name: "Error", list: error.message });
      this.openErrorModal();
    })
  }

  nextScreen(screen: any) {
    
    if(this.addTarget() === true){
      this.nextLoader = true;
      this.loader = false;
      this.mainLoader;
      this.currentScreen = screen;
      
      this.dataConfig.last_reporting_to_ids = this.nextScreenIDS;
      this.dataConfig.current_viewable_screen_num = screen;
    }

    
    
    
    // this.getTargetRecords();
  }

  modelChanged(one: any) {
    //
    console.log(one)
  }

  changeAmount(check?: any) {
    // if (!check && this.targetAmount) {
    //   return
    // }
    // alert(this.currentScreen)
    if (!check && !this.amountLeft) {
      return
    }
    this.assignedTotalAmount = this.targetAmount;
    // this.treeData[0].amount = 500;
    // let total = 0;
    this.treeData.map(it => {
      let amountOne: any = 0;
      // if (this.currentScreen === 3) {
      if (this.currentScreen === 1) {
        amountOne = parseFloat(this.targetAmount ? this.targetAmount : 0) / it.children.length;
        // it.amount = amountOne ? amountOne.toFixed(2) : 0;
      } else {
        amountOne = parseFloat(it.amount ? it.amount : 0) / it.children.length;
      }
      // let amountOne = parseFloat(this.targetAmount ? this.targetAmount : 0) / this.treeData.length;
      // let amountOne = parseFloat(it.amount ? it.amount : 0) / this.treeData.length;

      it = Object.assign({}, it);
      // total += amountOne;
      if (it.children.length > 0) {
        it.children.map(two => {
          let amountTwo: any = parseFloat(amountOne ? amountOne : 0) / two.children.length;
          two.amount = amountOne ? amountOne.toFixed(2) : 0;
          two = Object.assign({}, two);
          // total += amountTwo;
          if (two.children.length > 0) {
            two.children.map(three => {
              let amountThree = parseFloat(amountTwo ? amountTwo : 0) / three.children.length;;
              three.amount = amountTwo ? amountTwo.toFixed(2) : 0;
              three = Object.assign({}, three);
              // total += amountThree;
              if (three.children.length > 0) {
                three.children.map(four => {
                  let amountFour = amountThree;
                  four.amount = amountFour ? amountFour.toFixed(2) : 0;
                  four = Object.assign({}, four);
                  // total += amountFour;
                })
              }
            })
          }

        })
      }
    });

    // this.remainingAmount(Math.round(total));
    this.amountChanged();
  }

  testfunction(parent){
    let parentTotal = parent.amount ? parent.amount : 0;
    let childTotal:any = 0;
    parent.children.map(it =>{
      childTotal += it.amount ? it.amount : 0;
    });

    this.amountLeft = parseFloat(parentTotal) - parseFloat(childTotal)
    if(this.amountLeft < 0){
      this.amountError = "The amount you have entered exceeds your target limit. Please check your target amount and try again."
      this.openLimitModal();
    }else{
      let total = 0;
      this.treeData.map(it => {
        if (it.children.length === 0) {
          total += parseFloat(it.amount ? it.amount : 0);
        } else {
          it.children.map(two => {
            if (two.children.length === 0) {
              total += parseFloat(two.amount ? two.amount : 0);
            } else {
              two.children.map(three => {
                if (three.children.length === 0) {
                  total += parseFloat(three.amount ? three.amount : 0);
                } else {
                  three.children.map(four => {
                    total += parseFloat(four.amount ? four.amount : 0);
                  })
                }
  
  
              })
            }
  
  
          })
        }
  
  
      })
      this.remainingAmount(Math.round(total));
    }
    // this.amountChanged();
  }

  amountChanged(obj?: any) {
    
    let total = 0;
    this.treeData.map(it => {
      if (it.children.length === 0) {
        total += parseFloat(it.amount ? it.amount : 0);
      } else {
        it.children.map(two => {
          if (two.children.length === 0) {
            total += parseFloat(two.amount ? two.amount : 0);
          } else {
            two.children.map(three => {
              if (three.children.length === 0) {
                total += parseFloat(three.amount ? three.amount : 0);
              } else {
                three.children.map(four => {
                  total += parseFloat(four.amount ? four.amount : 0);
                })
              }


            })
          }


        })
      }


    })


    // this.treeData.map(it => {
    //   // total += parseFloat(it.amount ? it.amount : 0);
    //   // if (it.children.length > 0) {
    //   //   let totalOne = it.children.map(item => (item.amount ? item.amount : 0)).reduce((prev, next) => prev + next);
    //   //   parseFloat(totalOne) === 0 ? total += parseFloat(it.amount ? it.amount : 0) : total += parseFloat(totalOne);

    //   // } else {
    //   //   total += parseFloat(it.amount ? it.amount : 0)
    //   // }


    //   if (it.children.length > 0) {
    //     it.children.map(two => {
    //       total += parseFloat(two.amount ? two.amount : 0);
    //       // if (two.children.length) {
    //       //   let totalTwo = two.children.map(item => (item.amount ? item.amount : 0)).reduce((prev, next) => prev + next);
    //       //   parseFloat(totalTwo) === 0 ? total += parseFloat(two.amount ? two.amount : 0) : total += parseFloat(totalTwo);
    //       // } else {
    //       //   total += parseFloat(two.amount ? two.amount : 0)
    //       // }

    //       if (two.children.length > 0) {
    //         two.children.map(three => {
    //           total += parseFloat(three.amount ? three.amount : 0);
    //           // if (three.children.length) {
    //           //   let totalThree = three.children.map(item => (item.amount ? item.amount : 0)).reduce((prev, next) => prev + next);
    //           //   parseFloat(totalThree) === 0 ? total += parseFloat(three.amount ? three.amount : 0) : total += parseFloat(totalThree);
    //           // } else {
    //           //   total += parseFloat(three.amount ? three.amount : 0)
    //           // }

    //           if (three.children.length > 0) {
    //             three.children(four => {
    //               total += parseFloat(four.amount ? four.amount : 0);
    //             })
    //           } 
    //         })
    //       } 

    //     })


    //   } else {
    //     total += parseFloat(it.amount ? it.amount : 0);
    //   }
    // });
    //
    this.remainingAmount(Math.round(total));
  }

  remainingAmount(total: any) {
    //
    let amount = parseFloat(this.targetAmount ? this.targetAmount : 0) - parseFloat(total);
    this.amountLeft = amount;
    // if (amount < 0) {
    //   // alert("You have reached your limit")
    //   this.amountError = "The amount you have entered exceeds your target limit. Please check your target amount and try again."
    //   this.openLimitModal();
    // } else {
    //   this.amountLeft = amount;
    // }
  }

  openLimitModal() {
    this.modalRef = this.modalService.show(this.limitModal,this.config);
  }

  onValueChange(event) {
    if (event) {
      this.targetDate.endDate = new Date(new Date().setMonth((this.targetDate.startDate.getMonth() + 1)));
      this.targetDate.endDate.setDate(event.getDate());
    }
  }

  addTarget(check?:any) {
    if(check){
      this.loader = true;
    }
    // let childList = this.assignedAmount().filter(it => it.assigned_to_id !== null);
    // if (childList.length === 0 || !this.targetAmount) {
    //   this.loader = false;
    //   this.nextLoader = false;
    //   return false;
    // } else
     if (this.amountLeft > 0) {
      this.amountError = "You have amount left, please assign remaining amount and try again.";
      this.openLimitModal();
      this.loader = false;
      this.nextLoader = false;
      return false
    }else if(this.amountLeft < 0){
      this.amountError = "Assigned amount is greater then target amount.";
      this.openLimitModal();
      this.loader = false;
      this.nextLoader = false;
      return false
    }

    
    //binding target amount
    this.treeData.map(it => {
      // it.target_amount = it.amount;
      if(this.currentScreen === 1){
        this.targetAmount ? it.target_amount = parseInt(this.targetAmount) : "";
      }else{
        it.amount ? it.target_amount = parseInt(it.amount) : "";
      }
      // it.parent_target_id = it.parent_id ? it.parent_id : "";
      it.children.map(ch1 => {
        // ch1.parent_target_id = ch1.parent_id ? ch1.parent_id : "";
        ch1.amount ? ch1.target_amount = parseInt(ch1.amount) : "";
        ch1.children.map(ch2 => {
          // ch2.parent_target_id = ch2.parent_id ? ch2.parent_id : "";
          ch2.amount ? ch2.target_amount = parseInt(ch2.amount) : "";
          ch2.children.map(ch3 => {
            // ch3.parent_target_id = ch3.parent_id ? ch3.parent_id : "";
            ch3.amount ? ch3.target_amount = parseInt(ch3.amount) : "";
            ch3.children.map(ch4 =>{
              // ch4.parent_target_id = ch4.parent_id ? ch4.parent_id : "";
              ch4.amount ? ch4.target_amount = parseInt(ch4.amount) : "";
              ch4.children.map(ch5 =>{
                // ch5.parent_target_id = ch5.parent_id ? ch5.parent_id: "";
                ch5.amount ? ch5.target_amount = parseInt(ch5.amount) : "";
              })
            })
          })
        })
      })
    })

    // this.loader = true;
    let obj = {
      start_date: this.targetDate.startDate.getFullYear() + "-" + (this.targetDate.startDate.getMonth() + 1) + "-" + this.targetDate.startDate.getDate(),
      end_date: this.targetDate.endDate.getFullYear() + "-" + (this.targetDate.endDate.getMonth() + 1) + "-" + this.targetDate.endDate.getDate(),
      targets_hierarchy: this.treeData
      // targets_hierarchy: 
      // target_amount: this.currentUserGrade === 0 ? parseFloat(this.targetAmount) : 0,
      // child_targets: childList,
      // parent_target_id: this.currentUserGrade === 0 ? "" : this.currentUserID
    }
    this.service.addTarget(obj).subscribe((res) => {

      this.responseText = [];
      this.loader = false;
      if (res.status === "error") {
        this.loader = false;
      this.nextLoader = false;
        if (res.errors) {
          for (var key in res.errors) {
            let obj = { name: key, list: res.errors[key].toString() };
            this.responseText.push(obj);
          }
        } else {
          this.responseText.push({ name: "Error", list: res.code });
        }
        this.currentScreen -= 1;
        this.openErrorModal();
      } else {
        if(check){
          this.router.navigate(['/commission']);
        }else{
          // this.tempIDs = this.nextScreenIDS;
          
          this.getTargetRecords();
        }
        // this.router.navigate(['/user']);
      }

    }, (error) => {
      this.currentScreen -= 1;
      this.loader = false;
      this.nextLoader = false;
      this.responseText = [];
      this.responseText.push({ name: "Error", list: "Sorry something went wrong." });
      this.loader = false;
      this.openErrorModal();
    })

    return true
  }

  assignedAmount() {
    let list = [];
    this.treeData.map(it => {
      // it.id !== this.currentUserID ? list.push({ assigned_to_id: it.id, target_amount: Math.round(it.amount) }) : "";
      // let check = this.tempIDs.some(c => c === it.id);
      // check === false ? list.push({ assigned_to_id: it.id, target_amount: Math.round(it.amount) }) : "";
      if (it.children.length > 0) {
        it.children.map(two => {
          list.push({ assigned_to_id: two.id, target_amount: Math.round(two.amount) });
          if (two.children.length > 0) {
            two.children.map(three => {
              list.push({ assigned_to_id: three.id, target_amount: Math.round(three.amount) });
              if (three.children.length > 0) {
                three.children.map(four => {
                  list.push({ assigned_to_id: four.id, target_amount: Math.round(four.amount) });
                })
              }
            })
          }

        })
      }
    });

    return list;
  }


  nextStep() {
    // this.target = "assign";
    if (this.currentUserGrade > 0) {
      this.mainLoader = true;
      this.fetchTargetAmount();
      // this.targetAmount = 5000;
      // this.getTargetRecords();
    } else if (this.currentUserGrade === 0) {
      this.mainLoader = true;
      this.getTargetRecords();
    }

  }

  toggleView(DOM: any, event: any) {
    //
    if (DOM.classList.contains('collapsed')) {
      event.currentTarget.classList.add('inactive');
      DOM.classList.remove('collapsed');
      DOM.classList.add('collapse');
    } else {
      event.currentTarget.classList.remove('inactive');
      DOM.classList.add('collapsed');
      DOM.classList.remove('collapse');
    }
  }

  fetchTargetAmount() {
    let obj = {
      start_date: this.targetDate.startDate.getFullYear() + "-" + (this.targetDate.startDate.getMonth() + 1) + "-" + this.targetDate.startDate.getDate(),
      end_date: this.targetDate.endDate.getFullYear() + "-" + (this.targetDate.endDate.getMonth() + 1) + "-" + this.targetDate.endDate.getDate(),
      "size": 20,
      "page": 1,
      "filter_by_date": false,
      "filter_by_target_amount": false,
      "target_amount": 0
    }
    this.service.getTargetAmount(obj).subscribe((res) => {
      if (res.status === "success") {
        //
        this.responseText = [];
        if (res.data.qs[0]) {
          this.targetAmount = res.data.qs[0].target_amount;
          this.getTargetRecords();
        } else {
          this.mainLoader = false;
          this.isDisabled = true;
          this.toolTipMessage = "Please assign target first";
          this.responseText = [{ name: "Error", list: "Your target is not set please contact admin to set target" }];
          this.openErrorModal();
          // this.targetAmount = 5000;

        }

      } else {
        this.mainLoader = false;
        if (res.errors) {
          for (var key in res.errors) {
            let obj = { name: key, list: res.errors[key].toString() };
            this.responseText.push(obj);
          }
        } else {
          this.responseText.push({ name: "Error", list: res.code });
        }

        this.openErrorModal();
      }
    }, (error) => {
      this.mainLoader = false;
      this.responseText.push({ name: "Error", list: error.message });
      this.openErrorModal();
    })
  }

  filterData() {

    if(this.selectedBranch === "All"){
      this.treeData = this.copyData;
    }else{
      let list = this.copyData.filter(it => it.branch_location__address === this.selectedBranch);
      this.treeData = list;
    }
    
    // this.treeData.map(it => it.amount = 0);
  }

  changeBranch(branch: any) {
    // this.targetAmount = 0;
    // this.amountLeft = 0;

    this.selectedBranch = branch;
    this.filterData();
    this.assignExistingAmount();
    this.setTargetAmountFromExisting();
  }




  changeCountry(value: any) {
    this.selectedCountry = value;
    let list = this.copyData.filter(it => it.country_code === this.selectedCountry);
    this.treeData = list;
    // this.changeBranch(this.selectedBranch);
  }


  //previous logic for tree structure
  previousTree(screen:any){
    this.previousLoader = true;
    if(screen === 1){
      this.dataConfig.last_reporting_to_ids = this.screensIDS.screenOne;
    }else if(screen === 2){
      this.dataConfig.last_reporting_to_ids = this.screensIDS.screenTwo;
    }

    this.currentScreen = screen;
    this.dataConfig.current_viewable_screen_num = this.currentScreen;

    this.getTargetRecords();
  }

  openErrorModal() {
    this.modalRef = this.modalService.show(this.errorModal,this.config);
  }

}
