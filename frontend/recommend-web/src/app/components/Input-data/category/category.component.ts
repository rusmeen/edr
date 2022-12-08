import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'edr-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  data: any;
  operation: string;
  form: FormGroup;
  submitted: boolean;
  constructor(private modal: NgbModal, private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.submitted = false;
    this.data = [
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
      {
        id: '1',
        categoryName: 'regular',
        categoryDesc: 'desc',
      },
      {
        id: '2',
        categoryName: 'breakfast',
        categoryDesc: 'desc',
      },
    ];

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      margin: ['', Validators.required],
      LORD: ['', Validators.required],
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.form.controls;
  }
  trackByfunction(index: number, category: any) {
    return category.id;
  }

  /**
   *  @params operation:add/edit , addOrEditModal: reference for modal context
   * @description for adding new category
   * @memberof HomeComponent
   */
  addOrEditCategory(operation: string, addOrEditModal: any, id?: any) {
    this.operation = operation;
    this.modal.open(addOrEditModal);
  }

  /**
   * @description for closing modal
   * @memberof HomeComponent
   */
  closeModal() {
    this.modal.dismissAll();
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
  }
  todo = [];

  done = [{"categoryName":"x","type":"text"},{"categoryName":"y","type":"text"},
  {"categoryName":"z","type":"number"},
  {"categoryName":"p","type":"number"}];

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
}
