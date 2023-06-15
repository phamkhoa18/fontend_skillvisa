import { ViewportScroller } from '@angular/common';
import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  providers : [DatePipe]
})
export class WorkComponent {
  p : any = 1 ;
  public Editor = DecoupledEditor;
  oneItem: any;
  isLoading: boolean = true;
  isdanhmuc : any ;
  listnew : any = [] ;
  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public sanitizer: DomSanitizer,
    private viewportScroller: ViewportScroller,
    private datepipe : DatePipe
  ) {}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    const myId = this.route.snapshot.paramMap.get('name');
    this.getDetail(myId);
  }



  async getDetail(id: any) {
    (await this.api.get('/findmenu/' + id)).subscribe((v : any) => {

      this.isdanhmuc = v.category_id ;
      this.isLoading = false ;
      this.getList(this.isdanhmuc._id);
    });
  }

  async getList(iddanhmuc : any ) {
      (await this.api.get('/findnewcategory/' + iddanhmuc)).subscribe((v : any ) => {
          this.listnew = v ;

          this.listnew.forEach((e : any) => {
            const date = new Date(e.updated_at);
            e.date = date ;
          });
      })
  }


}
