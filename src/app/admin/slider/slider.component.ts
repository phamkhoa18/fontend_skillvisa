import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/client/services/api.service';
import { Add_Slider } from 'src/app/models/add_slider.model';
import { Categories } from 'src/app/models/categories.model';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent {
  items: any[] = [];
  slider: Add_Slider = new Add_Slider('' , '' , '' , '', '');
  isValid: Boolean = false;
  listslider: any = [];
  // dòng chảy
  private _listdanhmucSuject : BehaviorSubject<[]> = new BehaviorSubject([]);
  private _itemsSuject : BehaviorSubject<[]> = new BehaviorSubject([]);
  // nơi phân phát
  listdanhmuc$ : Observable<[]> = this._listdanhmucSuject.asObservable() ;
  items$ : Observable<[]> = this._itemsSuject.asObservable() ;

  listselectdanhmuc: any = [];
  isLoading: Boolean = true;
  isAdd: Boolean = false;
  isDataChanged = false;
  constructor(
    private api: ApiService,
    private toastr: ToastrService,
  ) {}

  async ngOnInit(): Promise<void> {
    await this.getData();
  }

  setlistdanhmuc(data : any) {
    this._listdanhmucSuject.next(data);
  }

  setlistitems(data : any ) {
    this._itemsSuject.next(data);
  }

  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listslider')).subscribe(
        (v: any) => {
          this.isLoading = false;
          this.listslider = v ;
          this.setlistdanhmuc(this.listslider);
          this.listdanhmuc$.subscribe(v => this.listslider = v );
          console.log(this.listslider);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  expanded(item: any) {
    item.expanded = !item.expanded;

  }

  add() {
    this.isAdd = true;
    this.slider = new Add_Slider("" , "" , '', '' ,'');
  }

  edit(item: any) {
    console.log(item);
    this.isAdd = false;
    
    // this.slider = new Add_Slider(item._id, item.title, item.parent_id , item.background);
    this.slider = new Add_Slider(item._id , item.title , item.description , item.image , item.posision);
  }

  async remove(item: any) {
    console.log(item);
    await this.del_api_danhmuc(item);
  }

  async submit(data: NgForm) {
    this.isValid = true;
    if (data.valid) {
      console.log(this.slider);
      if (this.isAdd) {
        this.add_api_danhmuc();
      }
      if (!this.isAdd) {
        this.edit_api_danhmuc();
      }
    }
  }

  async add_api_danhmuc() {
       (await this.api.post('/addslider', this.slider)).toPromise();
      this.toastr.success(
        'Thêm danh mục thành công',
        `Đã thêm vào danh sách thành công`
      );
      this.getData();
  }

  async edit_api_danhmuc() {
    const edit_category = {
      _id : this.slider._id ,
      title : this.slider.title ,
      description : this.slider.description ,
      image : this.slider.image
    };
     (await this.api.post('/edit_category', edit_category)).toPromise();
    this.toastr.success(
      'Sửa danh mục thành công',
      `Đã sửa danh mục thành công`
    );
    this.getData() ;
  }

  async del_api_danhmuc(item: any) {
    Swal.fire({
      title: 'Bạn có muốn xóa danh mục này không ?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then( async (result) => {
      if (result.isConfirmed) {
        const _id = {
          _id: item._id,
        };
        (await this.api.post('/del_category', _id)).toPromise();
        this.isLoading = true;
        this.isLoading = false;
        this.toastr.success(
          'Xóa danh mục thành công',
          `Đã xóa danh mục thành công`
        );
        this.getData();
      }
    })
  }
}
