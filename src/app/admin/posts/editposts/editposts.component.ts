import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/client/services/api.service';
import { Editor , Toolbar } from 'ngx-editor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { DataService } from '../../services/data.service';

declare var $: any;

export class Posts {
  _id : string = '' ;
  title: string = '';
  id_select: string = '';
  image: string = '';
  content: string = '';
  outstanding: boolean = false;
  link : string = '' ;
}
@Component({
  selector: 'app-editposts',
  templateUrl: './editposts.component.html',
  styleUrls: ['./editposts.component.scss']
})
export class EditpostsComponent {
  editor: Editor = new Editor;
  html: any = '';
  htmlContent: string = '';
  listselectdanhmuc: any = [];
  isLoading: boolean = true;
  item : any ;
  post: Posts = new Posts();

  constructor(private api: ApiService, public sanitizer: DomSanitizer, private toastr: ToastrService , private data : DataService) { }

  async ngOnInit(): Promise<any> {
    await this.getSelect();
    const post_r = {
      _id : this.data.isItem._id ,
      title: this.data.isItem.title,
      content: this.data.isItem.description,
      link : this.data.isItem.link,
      id_select: this.data.isItem.category_id._id,
      image: this.data.isItem.image,
      outstanding: this.data.isItem.outstanding
    };

    this.post = post_r ;
    console.log(this.post);

  }

  public Editor = DecoupledEditor;

  public onReady( editor: DecoupledEditor ): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(
      editor.ui.view.toolbar.element!,
      element
    );
  }

  onEditorContentChange(event: any) {
    this.post.content = event.html;
    console.log(this.post.content);
  }

  log() {
    console.log(this.post.content);

  }


  async getSelect(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      (await this.api.get('/listcategory')).subscribe(
        (v: any) => {
          this.listselectdanhmuc = v;
          this.isLoading = false;
          console.log(this.listselectdanhmuc);
          resolve();
        },
        (error: any) => {
          console.error(error);
          reject();
        }
      );
    });
  };

  async submit(data: NgForm) {
    if (data.valid) {
      this.isLoading = true;
      console.log(this.post);
      const post_r = {
        _id : this.post._id ,
        title: this.post.title,
        description: this.post.content,
        link : this.post.link ,
        category_id: this.post.id_select,
        image: this.post.image,
        outstanding: this.post.outstanding
      };
      console.log(post_r);

      (await this.api.post("/updatenew", post_r)).subscribe(
        (v: any) => {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000)

          this.toastr.success('Thêm bài viết thành công', `Bài viết mới đã được thêm`);
        },
        (err: any) => {
          this.isLoading = false;
          this.toastr.error('Thêm bài viết thất bại', 'Vui lòng kiểm tra kết nối');
        })

    }
  }
}
