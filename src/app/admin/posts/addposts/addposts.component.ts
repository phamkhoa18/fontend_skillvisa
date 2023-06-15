import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/client/services/api.service';
import { Editor , Toolbar } from 'ngx-editor';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
declare var $: any;

export class Posts {
  title: string = '';
  id_select: string = '';
  image: string = '';
  content: string = '';
  outstanding: boolean = false;
  link : string = '' ;
}


@Component({
  selector: 'app-addposts',
  templateUrl: './addposts.component.html',
  styleUrls: ['./addposts.component.scss']
})
export class AddpostsComponent {

  editor: Editor = new Editor;
  html: any = '';
  htmlContent: string = '';
  listselectdanhmuc: any = [];
  isLoading: boolean = true;
  post: Posts = new Posts();

  constructor(private api: ApiService, public sanitizer: DomSanitizer, private toastr: ToastrService) { }

  async ngOnInit(): Promise<any> {
    await this.getSelect();
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
        title: this.post.title,
        description: this.post.content,
        link : this.post.link ,
        category_id: this.post.id_select,
        image: this.post.image,
        outstanding: this.post.outstanding
      };
      console.log(post_r);

      (await this.api.post("/addnew", post_r)).subscribe(
        (v: any) => {
          setTimeout(() => {
            this.isLoading = false;
          }, 1000)

          this.toastr.success('Thêm bài viết thành công', `Bài viết mới đã được thêm`);
          this.post = new Posts();
        },
        (err: any) => {
          this.isLoading = false;
          this.toastr.error('Thêm bài viết thất bại', 'Vui lòng kiểm tra kết nối');
        })

    }
  }
}
