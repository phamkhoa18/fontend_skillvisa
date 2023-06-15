import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { DataService } from '../services/data.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-timkiem',
  templateUrl: './timkiem.component.html',
  styleUrls: ['./timkiem.component.scss']
})
export class TimkiemComponent {

  myId : any ;
  listdata : any ;
  isHien : Boolean = false ;
  private _listbaivietSubject : BehaviorSubject<[]> = new BehaviorSubject([]);
  listbaiviet$ : Observable<[]> = this._listbaivietSubject.asObservable() ;

  constructor( private route: ActivatedRoute , private dataservice : ApiService) {
    this.route.paramMap.subscribe(params => {
      this.myId = params.get('name');
      this.getData(this.myId) ;
    });
  }

  // lấy dữ liệu về

  setlistbaiviet(array_new : any) {
    this._listbaivietSubject.next(array_new);
}

  async getData (tim : any ) {
    const body = {
        timkiem : tim
    };
      (await this.dataservice.post('/tim-kiem' , body)).subscribe((v: any) => {
          this.listdata = v.data ;
          this.setlistbaiviet(this.listdata) ;
          this.listbaiviet$.subscribe((v) => this.listdata = v );
          if(this.listdata == 0) {
              this.isHien = true ;
          } else {
            this.isHien = false;
          }
      })
  }
}
