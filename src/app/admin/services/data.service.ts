import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  isItem : any ;
  constructor() { }

  user : Object = {} ;

  private isLoginSource = new BehaviorSubject<boolean>(false);
  isLoginChanged = this.isLoginSource.asObservable();

  set isLogin(value: boolean) {
    this.isLoginSource.next(value);
  }

  get isLogin() {
    return this.isLoginSource.value;
  }
}
