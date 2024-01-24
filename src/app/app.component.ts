import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ClientComponent } from './shared/components/client/client.component';
import { LoanComponent } from './shared/components/loan/loan.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClientService } from './shared/services/client/client.service';
import { ToastrService } from 'ngx-toastr';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { response } from 'express';
import { IClient } from './shared/interface/client.interface';
import { LoanService } from './shared/services/loan/loan.service';
import { ILoan } from './shared/interface/loan.interface';
import { ClientDetailsComponent } from './shared/components/client-details/client-details.component';
import { LoanPaymentService } from './shared/services/loan-payment/loan-payment.service';
import { combineLatest, forkJoin } from 'rxjs';
import { IInterest } from './shared/interface/interest.interface';
import { InterestService } from './shared/services/interest/interest.service';
import { InterestComponent } from './shared/components/interest/interest.component';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    ClientDetailsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  //changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  title = 'loan-app';
  totalLoans: number = 0;
  totalInterest: number = 0;
  search = new FormControl('');
  clientLoans: any[] = [];
  clientInterests: any[] = [];
  constructor(
    public dialog: MatDialog,
    private loanPaymentService: LoanPaymentService,
    private clientService: ClientService,
    private loanService: LoanService,
    private interestService: InterestService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.initialize();
  }

  openClient(): void {
    const clientDialogRef = this.dialog.open(ClientComponent);
    clientDialogRef.afterClosed().subscribe((data: any) => {
      if (data?.name && data?.mobile) {
        this.clientService
          .create(data)
          .then(() => {
            this.toastr.success('success!');
          })
          .catch((err: any) => {
            this.toastr.error('Please try again', 'Error');
            console.log('error', err);
          });
      }
    });
  }

  openAddLoan(id: string): void {
    const addLoanDialogRef = this.dialog.open(LoanComponent, {
      data: { id: id, type: 0, title: 'Add New Loan' },
    });
    addLoanDialogRef.afterClosed().subscribe((data: any) => {
      if (data) {
          this.saveAddNewLoan(id, data.amount, data.period);
      }

      console.log('result', data);
    });
  }

  initialize() {
    const clients$ = this.clientService.get();
    const loans$ = this.loanService.get();
    const payments$ = this.loanPaymentService.get();
    const interest$ = this.interestService.getPaid(false);
  
    combineLatest([clients$, loans$, payments$, interest$]).subscribe((data: any[]) => {
      const [clients, loans, payments, interests] = data;
      
      this.clientInterests = interests;
      this.totalLoans = (this.getTotal(loans) - this.getTotal(payments));
      this.totalInterest = this.getTotal(interests);
      const aggregatedLoanAmounts = this.aggregateAmounts(loans);
      const aggregatedPaymentAmounts = this.aggregateAmounts(payments);
      const aggregatedInterestAmounts = this.aggregateAmounts(interests);
      // Combine client and loan data based on clientId
      this.clientLoans = clients.map((client: IClient) => ({
        amount:
          (aggregatedLoanAmounts.get(client.id) ?? 0) -
          (aggregatedPaymentAmounts.get(client.id) ?? 0),
        interest: aggregatedInterestAmounts.get(client.id) ?? 0,
        ...client,
        // Add other loan properties as needed
      }));
    });
  }

  openDetails(id: string) {}

  openPayLoan(id: string) {
    const addLoanDialogRef = this.dialog.open(LoanComponent, {
      data: { id: id, type: 1, title: 'Pay Loan' },
    });
    addLoanDialogRef.afterClosed().subscribe((data: any) => {
      console.log('result-pay-loan', data);
      if(data){
        this.saveLoanPayment(id, data.amount);
      }
    });
  }

  openPayInterest(id: string) {
     const addInterestDialogRef = this.dialog.open(LoanComponent, {
       data: { id: id, type: 2, title: 'Add Interest'},
     });
     addInterestDialogRef.afterClosed().subscribe((data: any) => {
       if(data){
        this.saveAddInterest(id, data.amount, data.period);
       }
     });
  }

  openInterest(id: string){
    const interests = this.clientInterests.filter(
      (item: any) => item.clientId == id
    );
    const interestDialogRef = this.dialog.open(InterestComponent, {
      data: { id: id, interests: interests },
    });
    interestDialogRef.afterClosed().subscribe((data:any)=>{
      if(data){
        data.type === 'pay' && this.savePayInterest(data.id);
        data.type === 'add' && this.openPayInterest(id);
        data.type === 'del' && this.saveDelInterest(data.id)
      }
    })
  }

  deleteClient(id: string) {
    if(confirm('Are you sure you want to delete?') == true){
       this.clientService
         .delete(id)
         .then(() => {
           this.toastr.success('success!');
         })
         .catch((err: any) => {
           this.toastr.error('Please try again', 'Error');
           console.log('error', err);
         });
    }
  }

  saveAddNewLoan(id: string, amount: number, period: number) {
    const loan: any = {
      clientId: id,
      amount: amount,
      period: period,
    };
    this.loanService
      .create(loan)
      .then(() => {
        this.toastr.success('success!');
      })
      .catch((err: any) => {
        this.toastr.error('Please try again', 'Error');
        console.log('error', err);
      });
  }

  saveLoanPayment(id: string, amount: number) {
    const payment: any = {
      clientId: id,
      amount: amount,
    };
    this.loanPaymentService
      .create(payment)
      .then(() => {
        this.toastr.success('success!');
      })
      .catch((err: any) => {
        this.toastr.error('Please try again', 'Error');
        console.log('error', err);
      });
  }

  saveAddInterest(id: string, amount: number, month: string){
    const data: any = {
      clientId: id,
      amount: amount,
      month: month,
      paid: false,
    }
    this.interestService
      .create(data)
      .then(() => {
        this.toastr.success('success!');
      })
      .catch((err: any) => {
        this.toastr.error('Please try again', 'Error');
        console.log('error', err);
      });
  }

  savePayInterest(id: string){
    this.interestService
      .payInterest(id)
      .then(() => {
        this.toastr.success('success!');
      })
      .catch((err: any) => {
        this.toastr.error('Please try again', 'Error');
        console.log('error', err);
      });
  }

  saveDelInterest(id: string){
    this.interestService
      .delete(id)
      .then(() => {
        this.toastr.success('success!');
      })
      .catch((err: any) => {
        this.toastr.error('Please try again', 'Error');
        console.log('error', err);
      });
  }

  private aggregateAmounts(items: any[]) {
    return items.reduce((accumulator: any, item: any) => {
      const clientId = item.clientId;
      const amount = item.amount;
      // If clientId exists in the accumulator, add the amount, otherwise, create a new entry
      if (accumulator.has(clientId)) {
        accumulator.set(clientId, accumulator.get(clientId) + amount);
      } else {
        accumulator.set(clientId, amount);
      }

      return accumulator;
    }, new Map());
  }

  private getTotal(items:any[]){
    return items.reduce((acc: any, val: any) => {
      return acc + val.amount;
    }, 0);
  }
}
