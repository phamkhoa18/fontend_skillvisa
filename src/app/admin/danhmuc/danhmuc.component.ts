import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/client/services/api.service';
import { Add_category } from 'src/app/models/add_category.model';
import { Categories } from 'src/app/models/categories.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.scss']
})
export class DanhmucComponent {
  items: any[] = [];
  category: Add_category = new Add_category('', '' , null , '');
  isValid: Boolean = false;
  listdanhmuc: Categories[] = [];
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
    await this.getSelect();
  }

  setlistdanhmuc(data : any) {
    this._listdanhmucSuject.next(data);
  }

  setlistitems(data : any ) {
    this._itemsSuject.next(data);
  }

  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/getCategories')).subscribe(
        (v: any) => {
          this.isLoading = false;
          this.listdanhmuc = v ;
          this.setlistdanhmuc(this.listdanhmuc);
          this.listdanhmuc$.subscribe(v => this.listdanhmuc = v );
          console.log(this.listdanhmuc);
          this.items = this.setgetItems(this.listdanhmuc, null, 0);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  async getSelect(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectdanhmuc = v;
          this.isLoading = false;
          this.listselectdanhmuc.push({
            _id: null,
            title: 'TẠO DANH MỤC MỚI HOÀN TOÀN',
            parent_id: null,
          });
          console.log(this.listselectdanhmuc);
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
    this.items = this.setgetItems(this.listdanhmuc, null, 0);
  }

  setgetItems(data: any, items: any, index: any) {
    data.forEach((x: any) => {
      if (!items) items = [];
      items.push(x);
      items[items.length - 1].index = index;
      if (x.children && x.expanded)
        this.setgetItems(x.children, items, index + 1);
    });
    return items;
  }

  add() {
    this.isAdd = true;
    this.category = new Add_category('', '' ,null , '');
  }

  edit(item: any) {
    console.log(item);
    this.isAdd = false;
    this.category = new Add_category(item._id, item.title, item.parent_id , item.background);
  }

  async remove(item: any) {
    console.log(item);
    await this.del_api_danhmuc(item);
  }

  async submit(data: NgForm) {
    this.isValid = true;
    if (data.valid) {
      console.log(this.category);
      if (this.isAdd) {
        this.add_api_danhmuc();
      }
      if (!this.isAdd) {
        this.edit_api_danhmuc();
      }
    }
  }

  async add_api_danhmuc() {

    if (this.category.parent_id == null) {
      const object = {
        title: this.category.title.toUpperCase(),
        background : this.category.background
      };
      console.log(object);

       (await this.api.post('/addcategory', object)).toPromise();
      this.toastr.success(
        'Thêm danh mục thành công',
        `Đã thêm vào danh sách thành công`
      );
      this.getData() ;
    } else {
      const object = {
        title: this.category.title.toUpperCase(),
        parent_id: this.category.parent_id,
        background : this.category.background
      };
       (await this.api.post('/addcategory', object)).toPromise();
      this.toastr.success(
        'Thêm danh mục thành công',
        `Đã thêm vào danh sách thành công`
      );
      this.getData();
    }

  }

  async edit_api_danhmuc() {
    const edit_category = {
      _id: this.category._id,
      title: this.category.title,
      parent_id: this.category.parent_id,
      background : this.category.background
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
