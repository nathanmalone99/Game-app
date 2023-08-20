import { Component } from '@angular/core';
import { AdminUsersService } from '../admin-users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/common/user';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-users',
  templateUrl: './create-users.component.html',
  styleUrls: ['./create-users.component.css']
})
export class CreateUsersComponent {

  enteredContent = '';
  enteredTitle = '';
  private mode = 'create';
  private postId: string;
  user: User;
  isLoading = false;

  

  


  constructor(private adminUsersService: AdminUsersService,
    public route: ActivatedRoute) {
  }

  onSaveUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.adminUsersService.addUser(form.value.email, form.value.password);
    } else {
      this.adminUsersService.updateUser(this.postId, form.value.email, form.value.password)
    }

    form.resetForm();
  }
}
