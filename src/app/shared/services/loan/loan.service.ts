import { Injectable } from '@angular/core';
import { ILoan } from '../../interface/loan.interface';
import { HttpService } from '../http/http.service';
import { GlobalConstant } from '../../constants/global-constant';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class LoanService extends BaseService<ILoan> {
  constructor(httpService: HttpService) {
    super(httpService, GlobalConstant.TABLE.LOAN);
  }
}