import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { GlobalConstant } from '../../constants/global-constant';
import { BaseService } from '../base/base.service';
import { ILoanPayment } from '../../interface/loan-payment.interface';

@Injectable({
  providedIn: 'root'
})
export class LoanPaymentService extends BaseService<ILoanPayment> {
  constructor(httpService: HttpService) {
    super(httpService, GlobalConstant.TABLE.LOAN_PAYMENT);
  }

}
