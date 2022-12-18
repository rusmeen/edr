import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal,NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from 'src/app/services';

@Component({
  selector: 'edr-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  data: any;
  operation: string;
  categoryForm: FormGroup;
  propertiesForm: FormGroup;
  submitted: boolean; // flag when save category is clicked
  submittedProperty:boolean; // flag when add property button is clicked
  categories: any;
  additionalProperties:any;
  dataToBeSent: any[];
  additionalPropertiesAdded: any;
  loading:boolean;
  constructor(private modal: NgbModal, private formBuilder: FormBuilder
    ,private utility:UtilityService) {}

  ngOnInit(): void {
    this.submitted = false;
    this.submittedProperty =false;
    this.data = []; 
    this.loading =false;
    this.additionalProperties = [];
    this.getCategories();
    this.propertiesForm = this.formBuilder.group({
      name: ['', Validators.required],
      type:['Number',Validators.required],
      description: ['', Validators.required],
    });

    this.categoryForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      rank_definer: ['', Validators.required],
      lord1: ['', Validators.required],
      lord2: ['', Validators.required],
    });
  }

  /**
   * @description for getting all categories for a user
   * @memberof HomeComponent
   */

  getCategories() {
    //   this.loading = true;
// this.utility.networkCall({'method':'GET','url':'http://127.0.0.1:8000/api/v1/category/105'}).subscribe((response)=>{
// console.log(response) 
// if(response.body)
// {this.data = response.body;
//   this.categories = JSON.parse(this.data.schema).categories;
//   console.log(this.categories);
//      this.loading =false;
//   this.updateAdditionalProperties();}
// else
// return;
// })
this.loading = true;
setTimeout(()=>{
  this.loading = false;
},3000)
this.data =  {
  "key_id": "102",
  "category": "Restorant",
  "address": {"Country": "IN", "Post/Zip-code": 122001, "City/Town/Village": "Wazirabad", "Street/Road/Block": "sector 57", "Building Name/Number": 1568, "Specific/Custom Information": "", "State/Province/Prefecture/County": "HR"},
  "schema": {"categories": [{"lord": [1.5, 2], "name": "catetory1", "others": [{"name": "MRP", "type": "double", "description": ""}, {"name": "Rate", "type": "string", "description": ""}, {"name": "Size", "type": "date", "description": ""}], "description": "", "rank_definer": "margin"}, {"lord": [2, 2], "name": "catetory2", "others": [{"name": "number", "type": "double", "description": ""}, {"name": "text", "type": "string", "description": ""}, {"name": "date", "type": "date", "description": ""}], "description": "", "rank_definer": "margin"}, {"lord": [2, 2], "name": "catetory3", "others": [{"name": "number", "type": "double", "description": ""}, {"name": "text", "type": "string", "description": ""}, {"name": "date", "type": "date", "description": ""}], "description": "", "rank_definer": "margin"}]},
  "category_rank": 1
};
this.categories = this.data.schema.categories;
  console.log(this.categories);
  this.updateAdditionalProperties();
// this.data = this.data.replace(/\r\n/, "");

  }
  // convenience getter for easy access to form fields
  get f() {
    return this.categoryForm.controls;
  }

  get propertyFormDetails() {
    return this.propertiesForm.controls;
  }


  trackByfunction(index: number, category: any) {
    return category.id;
  }

  /**
   *  @params operation:add/edit , addOrEditModal: reference for modal context
   * @description for adding new category
   * @memberof HomeComponent
   */

  addOrEditCategory(operation: string, addOrEditModal: any, category?: any) {
    this.operation = operation;
    this.submitted = false;
    this.submittedProperty = false;
    if (operation =='edit') {
      this.f['name'].setValue(category.name);
      this.f['description'].setValue(category.description);
      this.f['lord1'].setValue(category.lord[0]);
      this.f['lord2'].setValue(category.lord[1]);
      this.f['rank_definer'].setValue(category.rank_definer);
    }
    else {
      this.categoryForm.reset();
    }
    
    this.modal.open(addOrEditModal, {size:'lg'});
  }

  /**
   * @description for preparing additional properties array
   * @memberof HomeComponent
   */

  updateAdditionalProperties() {
    let length = this.categories.length;
    let addProperties = [];
    for ( let i =0;i<length; i++) {
      let element =this.categories[i];
      addProperties = addProperties.concat(element.others);
    }
    this.additionalProperties = addProperties;
 console.log(this.additionalProperties)
  }
  /**
   * @description for closing modal
   * @memberof HomeComponent
   */
  closeModal() {
    this.modal.dismissAll();
  }

 categoryFormValidation() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      return false;
    }
    return true
  }
  todo = [];

 

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  closeDrop(item , i){
    console.log(i);
    this.todo.splice(i)
    // this.done.push(item);
    
  }

  getIconForProperties(type) {
    let icon;
    switch(type){
      case 'Number':
        icon = 'fa fa-one'
      break;
      case 'Text':
        icon ='fa fa-font'
      break;
      case 'Date':
        icon = 'fa fa-calendar-alt'
      break;
    }
    return icon;
  }
  saveCategory () {
    let validFlag = this.categoryFormValidation();
    if(!validFlag) {
     return;
    }
    if (this.operation =='add') {
  
    this.todo =[];
    let obj={"name": this.f['name'].value,
    "description":this.f['description'].value,
    "lord":[this.f['lord1'].value,this.f['lord2'].value],
   "rank_definer": this.f['rank_definer'].value};
    obj['others'] = this.additionalPropertiesAdded;
    console.log(obj);
    this.dataToBeSent = [];
    this.data.schema.categories.push(obj);
    this.utility.networkCall({method:'PUT',data:this.categories}).subscribe((resp)=>{
      console.log(resp);
      this.modal.dismissAll();
    });
  }
  }

  addProperty () {

    this.submittedProperty = true;
console.log(this.propertiesForm)
    // stop here if form is invalid
    if (this.propertiesForm.invalid) {
      return;
    }
    let obj={"name": this.propertyFormDetails['name'].value,
    "description":this.propertyFormDetails['description'].value,
    "type":this.setDataTypeForProperty(this.propertyFormDetails['type'].value)
   
  }
  console.log(obj);
  this.todo.push(obj);
  this.additionalPropertiesAdded = this.todo;
  this.submittedProperty = false;
  this.propertiesForm.reset();
}

setDataTypeForProperty(type) {
  let dataType;
  switch(type){
    case 'Number':
      dataType = 'double'
    break;
    case 'Text':
      dataType ='string'
    break;
    case 'Date':
      dataType = 'date'
    break;
  }
  return dataType;
}
}
