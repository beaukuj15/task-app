import { Component } from '@angular/core';
import { DataService } from '../../services/data-service';
import { Router } from '@angular/router';
import { Task } from '../../classes/task';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Navbar } from '../../navbar/navbar';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {


  tasks: any;
  ftype = 0;
  myForm: FormGroup;
  submitted = false;
  updateId = -1;

  constructor(private dataService: DataService, private router: Router, private fb: FormBuilder) {
    
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
    });
  }

  ngOnInit(): void {
   
   this.getItems(); 
  }

  onSubmit(): void {
    console.log(this.myForm.value);


    if (this.ftype == 1) {
      this.postNewItem();
    } else if (this.ftype == 2) {
      this.updateItem();
    }
    
  }

  onCancel() {
    this.ftype = 0;
  }



  deleteClicked(product: any) {
    console.log("deleting item with id: " + product.id);

    this.deleteItem(product.id);
  }


  createClicked() {
    this.ftype = 1;
  }

  updateClicked(task: any) {

    this.ftype = 2;
    this.updateId = task.id;

  }


  updateItem() {

    if (this.myForm.invalid) {
      console.log("error invalid update form..");
      return;
    } else if (this.updateId < 0) {
      console.log("error invalid update item selected");
      return;
    }

    let taskName = this.myForm.controls['name'].value;
    let description = this.myForm.controls['description'].value;
    let updateId = this.updateId;



    let ppath = "/tasks/" + updateId;
    let body = {
      "name": taskName,
      "description": description
    };

    this.dataService.genericPUT(ppath, body).then(res => {
      console.log("successfully posted new task: " + JSON.stringify(res));
      this.getItems();
      this.ftype = 0;
    }).catch(err => {
      console.log("error posting new task: " + JSON.stringify(err));
    });


  }


  postNewItem() {

    let taskName = this.myForm.controls['name'].value;
    let description = this.myForm.controls['description'].value;

    let ppath = "/tasks";
    let body = {
      "name": taskName,
      "description": description
    };

    this.dataService.genericPOST(ppath, body).then(res => {
      console.log("successfully posted new task: " + JSON.stringify(res));
      this.getItems();
      this.ftype = 0;
    }).catch(err => {
      console.log("error posting new task: " + JSON.stringify(err));
    });


  }


  deleteItem(id: number) {

    let dpath = "/tasks/" + id.toString();

    this.dataService.genericDEL(dpath).then(res => {

      console.log("successfully deleted item: " + JSON.stringify(res));
      this.getItems();
    }).catch(err => {
      console.log("error deleting item: " + JSON.stringify(err));
    })
  }


  getItems() {

    let fetchPath = `/tasks`;

    this.dataService.genericGET(fetchPath).then(res => {

      console.log("successfully got tasks: " + JSON.stringify(res));
      this.parseTasks(res);

    }).catch(err => {
      console.log("error fetching tasks: " + err);
    })

  }


  parseTasks(pitems: any) {

    var tasks = [];

    for (var j = 0; j < pitems.length; j ++) {

      let p = pitems[j];
      let task = new Task(p.id, p.name, p.description);
      tasks.push(task);
    }

    this.tasks = tasks;

  }


  fetchUsers() {

    this.dataService.genericGET("/users").then(res => {
      console.log("users fetch result: " + JSON.stringify(res));
    }).catch(err => {
      console.log("some user fetch err: " + JSON.stringify(err));
    })
  }





}
