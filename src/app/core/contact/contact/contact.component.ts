import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { userContactModel } from 'src/app/entities/contact/userContactModel';
import { ContactService } from 'src/app/services/contact/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {
  addUserForm !: FormGroup;
  contactDetails: any;
  modalRef: any = BsModalRef;
  constructor(private modalService: BsModalService, private formBuilder: FormBuilder,
    private contactService: ContactService
  ) { }


  ngOnInit() {
    this.addUserForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      mobileNumber: [''],
      isActive: ['']
    });
    this.getContactList();
  }


  getContactList() {
    this.contactService.getContactList().subscribe((res: any) => {
      this.contactDetails = res;
    })
  }

  saveUserContactForm() {
    let formValue = this.addUserForm.value;
    let addUserContactPayload: userContactModel = {
      firstName: formValue?.firstName,
      lastName: formValue?.lastName,
      mobileNumber: formValue?.mobileNumber,
      isActive: formValue?.isActive
    }
    this.contactService.addUserDetail(addUserContactPayload).subscribe((res: any) => {
      console.log(res);
      this.closeModal();
      this.getContactList();
    })
  }


  openModal(template: any) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }
}