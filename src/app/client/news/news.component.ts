import { Component, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements AfterViewInit {

  @ViewChild('elementRef', { static: true }) elementRef!: ElementRef;
  public Editor = DecoupledEditor;
  oneItem: any;
  isLoading: boolean = true;
  desthuan : any = '' ;
  myId : any

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public sanitizer: DomSanitizer,
    private renderer: Renderer2,
    private el: ElementRef,
    private viewportScroller : ViewportScroller
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.myId = params.get('name');
      // Do something with this.id
      this.getDetail(this.myId);
      this.viewportScroller.scrollToPosition([0, 0]);

    });
  }

  ngAfterViewInit() {
    window.addEventListener('resize' , () => {
      this.fswh();
    })
  }
  fswh() {
      const w = screen.width ;
      const h = screen.height ;
      if(w <= 900) {
        const imgs = this.el.nativeElement.querySelectorAll('img');
        for (let i = 0; i < imgs.length; i++) {
          this.renderer.setStyle(imgs[i], 'width', '100%');
        }
      }
  }

  async getDetail(id: any) {
    (await this.api.get('/listnew/' + id)).subscribe((v : any) => {
      const w = screen.width ;
      const h = screen.height ;

      this.oneItem = v;
      this.desthuan = v.description ;
      if(w <= 900) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(this.oneItem.description, 'text/html');
        const imgTags = doc.getElementsByTagName('img');
        for (let i = 0; i < imgTags.length; i++) {
          const imgTag = imgTags[i];
          if (!imgTag.hasAttribute('style')) {
            imgTag.setAttribute('style', 'width: 100% !important;');
          } else {
            const currentStyle = imgTag.getAttribute('style');
            imgTag.setAttribute('style', `${currentStyle} width: 100% !important;`);
          }
      }
      const modifiedHTMLContent = doc.documentElement.innerHTML;

      this.oneItem.description = modifiedHTMLContent ;
      const des = this.sanitizer.bypassSecurityTrustHtml(this.oneItem.description.toString());
      this.oneItem.description = des;
      } else {
        const des = this.sanitizer.bypassSecurityTrustHtml(this.oneItem.description.toString());
        this.oneItem.description = des;
      }

      this.isLoading = false ;
    });
  }
}
