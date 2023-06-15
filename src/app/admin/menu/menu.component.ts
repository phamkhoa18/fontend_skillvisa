import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiService } from 'src/app/client/services/api.service';
import { Add_menu } from 'src/app/models/add_menu.model';
import { Categories } from 'src/app/models/categories.model';
Add_menu
import Swal from 'sweetalert2';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  items: any[] = [];
  menu: Add_menu = new Add_menu('', '' , '' , null , null);
  isValid: Boolean = false;
  listdanhmuc: Categories[] = [];
  // dòng chảy
  private _listdanhmucSuject : BehaviorSubject<[]> = new BehaviorSubject([]);
  private _itemsSuject : BehaviorSubject<[]> = new BehaviorSubject([]);
  // nơi phân phát
  listdanhmuc$ : Observable<[]> = this._listdanhmucSuject.asObservable() ;
  items$ : Observable<[]> = this._itemsSuject.asObservable() ;
  listselectcategory : any = [] ;
  listselectmenu: any = [];
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
    await this.getSelectCategory() ;
  }

  setlistdanhmuc(data : any) {
    this._listdanhmucSuject.next(data);
  }

  setlistitems(data : any ) {
    this._itemsSuject.next(data);
  }

  async getData(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/getmenu')).subscribe(
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
      (await this.api.get('/listmenu')).subscribe(
        (v: any) => {
          this.listselectmenu = v;
          this.isLoading = false;
          this.listselectmenu.push({
            _id: null,
            title: 'TẠO DANH MỤC MỚI HOÀN TOÀN',
            parent_id: null,
          });
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  }

  async getSelectCategory(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectcategory = v;
          this.isLoading = false;
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
    this.menu = new Add_menu('', '' , '' , null , null);
  }

  edit(item: any) {
    console.log(item);
    this.isAdd = false;
    this.menu = new Add_menu(item._id, item.title,  item.link, item.parent_id , item.category_id);
  }

  async remove(item: any) {
    console.log(item);
    await this.del_api_danhmuc(item);
  }

  async submit(data: NgForm) {
    this.isValid = true;
    if (data.valid) {
      console.log(this.menu);
      if (this.isAdd) {
        this.add_api_danhmuc();
      }
      if (!this.isAdd) {
        this.edit_api_danhmuc();
      }
    }
  }

  async add_api_danhmuc() {

    if (this.menu.parent_id == null) {
      const object = {
        title: this.menu.title.toUpperCase(),
        link : this.menu.link
      };
       (await this.api.post('/addmenu', object)).toPromise();
      this.toastr.success(
        'Thêm danh mục thành công',
        `Đã thêm vào danh sách thành công`
      );
      this.getData() ;
    } else {
      const object = {
        title: this.menu.title.toUpperCase(),
        link : this.menu.link ,
        parent_id: this.menu.parent_id,
      };
       (await this.api.post('/addmenu', object)).toPromise();
      this.toastr.success(
        'Thêm danh mục thành công',
        `Đã thêm vào danh sách thành công`
      );
      this.getData();
    }

  }

  async edit_api_danhmuc() {

    const edit_category = {
      _id: this.menu._id,
      title: this.menu.title,
      link : this.menu.link ,
      parent_id: this.menu.parent_id,
      category_id : this.menu.category_id
    };
     (await this.api.post('/editmenu', edit_category)).toPromise();
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
        (await this.api.get('/delmenu' + "/" + item._id)).toPromise();
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
