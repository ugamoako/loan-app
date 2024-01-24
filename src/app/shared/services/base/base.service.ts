import { Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { preCreate, preUpdate } from '../../helper/functions';

export abstract class BaseService<T> {
  private table: string;

  constructor(protected httpService: HttpService, table: string) {
    this.table = table;
  }

  get() {
    return this.httpService.getAll(this.table);
  }

  getById(id: string) {
    return this.httpService.get(this.table, id);
  }

  create(data: T) {
    data = preCreate(data);
    return this.httpService.post(this.table, data);
  }

  update(data: T) {
    data = preUpdate(data);
    return this.httpService.put(this.table, data);
  }

  delete(id: string) {
    return this.httpService.patch(this.table, id, { deleted: true });
  }
}
