import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.scss',
})
export class ClientDetailsComponent {
  @Input() id: string = '';
  @Input() loanId: string = '';
  @Input() name: string = '';
  @Input() mobile: string = '';
  @Input() loan: number = 0;
  @Input() month: string = '';
  @Input() interest: number = 0;

  @Output() detailsEvent: EventEmitter<string> = new EventEmitter();
  @Output() addLoanEvent: EventEmitter<string> = new EventEmitter();
  @Output() payLoanEvent: EventEmitter<string> = new EventEmitter();
  @Output() payInterestEvent: EventEmitter<string> = new EventEmitter();
  @Output() deleteClientEvent: EventEmitter<string> = new EventEmitter();

  addLoan(id: string) {
    this.addLoanEvent.emit(id);
  }

  payLoan(id: string) {
    this.payLoanEvent.emit(id);
  }

  payInterest(id: string) {
    this.payInterestEvent.emit(id);
  }

  deleteClient(id: string) {
    this.deleteClientEvent.emit(id);
  }

  details(id: string) {
    this.detailsEvent.emit(id);
  }
}
