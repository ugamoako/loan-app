import { Injectable } from '@angular/core';
import { GlobalConstant } from '../../constants/global-constant';
import { HttpService } from '../http/http.service';
import { IInterest } from '../../interface/interest.interface';
import { BaseService } from '../base/base.service';
import { where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class InterestService extends BaseService<IInterest> {
  constructor(httpService: HttpService) { 
    super(httpService, GlobalConstant.TABLE.INTEREST);
  }

  getPaid(isPaid:boolean){
    const args = [where('paid', '==', isPaid)];
    return this.httpService.getBy(GlobalConstant.TABLE.INTEREST, args);
  }

  getPaidByMonth(isPaid:boolean, month:number){
    const args = [where('paid', '==', isPaid), where('month', '==', month)];
    return this.httpService.getBy(GlobalConstant.TABLE.INTEREST, args);
  }

  payInterest(id: string){
    const data = {paid: true}
    return this.httpService.patch(GlobalConstant.TABLE.INTEREST,id,data);
  }
}
