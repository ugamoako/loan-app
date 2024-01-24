import { Component } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
})
export class ClientComponent {
  name = new FormControl('', [Validators.required]);
  mobile = new FormControl('', [Validators.required]);
  bank = new FormControl('');

  constructor(public dialogRef: MatDialogRef<ClientComponent>) {}

  getNameErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a name' : '';
  }

  getMobileErrorMessage() {
    return this.mobile.hasError('required')
      ? 'You must enter a mobile number'
      : '';
  }

  submit() {
    this.dialogRef.close({
      name: this.name.value,
      mobile: this.mobile.value,
      bank: this.bank.value,
    });
  }
}
