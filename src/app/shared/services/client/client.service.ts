import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { IClient } from '../../interface/client.interface';
import { GlobalConstant } from '../../constants/global-constant';
import { preCreate, preUpdate } from '../../helper/functions';
import { BaseService } from '../base/base.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseService<IClient> {
  constructor(httpService: HttpService) {
    super(httpService, GlobalConstant.TABLE.CLIENT);
  }
}
