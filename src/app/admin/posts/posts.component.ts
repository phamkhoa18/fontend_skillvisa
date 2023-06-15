
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/client/services/api.service';
import Swal from 'sweetalert2'
import { DataService } from '../services/data.service';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent {
  p : any = 1 ;
  isLoading : Boolean = true ;
  listbaiviet : any  = [];
  private _listbaivietSubject : BehaviorSubject<[]> = new BehaviorSubject([]);
  listbaiviet$ : Observable<[]> = this._listbaivietSubject.asObservable() ;

  constructor(private api : ApiService, private router : Router , private data : DataService){

  }


  async ngOnInit(): Promise<void>{
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
   await this.getData() ;
  }

  setlistbaiviet(array_new : any) {
      this._listbaivietSubject.next(array_new);
  }

  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listnew')).subscribe(
        (v: any) => {
          this.listbaiviet = v;
          this.setlistbaiviet(this.listbaiviet);
          this.listbaiviet$.subscribe((v:any) => this.listbaiviet = v );
          this.isLoading = false;
          console.log(this.listbaiviet);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  add() {
    this.router.navigate(['/admin/baiviet/add']);
  }

  edit(item : any) {
    this.data.isItem = item ;
    this.router.navigate(['/admin/baiviet/edit']);
  }

  del(item : any) {
    Swal.fire({
      title: 'Bạn có muốn xóa bài viết này không ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
      const _id = {
        _id : item._id
      };

      if (result.isConfirmed) {
        await this.deletePost(_id).then(() => {
          Swal.fire(
            'Deleted!',
            'Da xóa thành công !!',
            'success'
          )
        })
      }
    })
  }


  async deletePost(body : any): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.post('/delnew' , body)).subscribe(
        (v: any) => {
          this.isLoading = false;
          console.log(v);
          this.getData();
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }


}
