import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ApiService } from 'src/app/client/services/api.service';

export interface Task {
  title: string;
  description: string;
  status: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

  oneitem : any = '' ;
  isLoading : Boolean = true ;
  list : any = [] ;

  private _listxulySubject : BehaviorSubject<[]> = new BehaviorSubject([]);
  listxuly$ : Observable<[]> = this._listxulySubject.asObservable() ;

  constructor(private api : ApiService ,private toastr : ToastrService) {
      this.getdata() ;
  }

  setlistbaiviet(array_new : any) {
    this._listxulySubject.next(array_new);
}


  chuaxuly : any  = [];

  daxuly : any = [];

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

    }

  }

  async getdata() {
     (await this.api.get('/listcontact')).subscribe((v : any) => {

        this.list = v ;
        this.daxuly = [] ;
        this.chuaxuly = [] ;

        this.setlistbaiviet(this.list) ;
        this.listxuly$.subscribe(v => this.list = v );


        this.list.forEach((e : any ) => {
            if(e.select == '') {
                e.select = 'Tư vấn du học Úc'
            }
        })


          this.list.forEach((e : any) => {
                if(e.active == true) {
                    this.daxuly.push(e) ;
                } else {
                  this.chuaxuly.push(e);
                }
          });
          this.isLoading = false ;
     })
  }

  xemchitiet(item : any) {
      console.log(item);
      this.oneitem = item ;
  }

  async xacnhan(oneitem : any) {
    console.log(oneitem);

    const object = {
        _id : oneitem._id ,
        username : oneitem.username ,
        email : oneitem.email ,
        phone : oneitem.phone ,
        date : oneitem.date ,
        select: oneitem.select,
        active : true
    };
     (await this.api.post('/handleupdate' , object)).subscribe((v) => {
        console.log(v);
        this.toastr.success(
          'Đã xử lý thành công',
          `Đã thêm vào danh sách thành công`
        );
        this.getdata();
     })
  }

   del(item : any) {
      Swal.fire({
        title: 'Bạn có muốn xóa liên hệ này không ?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then( async (result) => {
        if (result.isConfirmed) {
          (await this.api.get('/delcontact/' + item._id)).subscribe((v : any) => {
                if(v.status == 200) {
                  Swal.fire(
                    'Deleted!',
                    'Da xóa thành công !!',
                    'success'
                  )
                  this.getdata();
                } else {
                  alert('xóa thất bại');
                }
          })
        }
      })
  }



}



