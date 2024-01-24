import { Component, Inject } from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-loan',
  standalone: true,
  imports: [
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
  templateUrl: './loan.component.html',
  styleUrl: './loan.component.scss',
})
export class LoanComponent {
  amount = new FormControl('', [Validators.required]);
  period = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<LoanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {id: string, type: number, title: string}
    ) {}

  getAmountErrorMessage() {
    return this.amount.hasError('required') ? 'You must enter loan amount' : '';
  }

  getPeriodErrorMessage() {
    return this.period.hasError('required')
      ? 'You add loan period in months'
      : '';
  }

  submit() {
    this.dialogRef.close({
      id: this.data.id,
      type: this.data.type,
      amount: this.amount.value,
      period: this.period.value,
    });
  }
}
