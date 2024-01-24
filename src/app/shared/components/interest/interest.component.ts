import { CommonModule } from '@angular/common';
import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { getMonthName } from '../../helper/functions';

@Component({
  selector: 'app-interest',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './interest.component.html',
  styleUrl: './interest.component.scss',
})
export class InterestComponent {
  constructor(
    public dialogRef: MatDialogRef<InterestComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { id: string; interests: any[] }
  ) {}

  addInterest(id: string) {
    this.dialogRef.close({
      id: id,
      type: 'add'
    });
  }

  payInterest(id: string) {
    this.dialogRef.close({
      id: id,
      type: 'pay',
    });
  }

  delInterest(id: string) {
    if(confirm('Are you sure you want to delete?') == true){
      this.dialogRef.close({
        id: id,
        type: 'del',
      });
    }
  }

  getMonthName(month: number){
    return getMonthName(month);
  }
}
