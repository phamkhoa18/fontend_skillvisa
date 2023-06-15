import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { ToggleSubmenuDirective } from '../../../toggle-submenu.directive';
import { ActivatedRoute, Router } from '@angular/router';

interface SubmenuItem {
  title: string;
  children: boolean;
}


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})


export class HeaderComponent {


  show : Boolean = false ;
  isCroll : Boolean = false ;
  listmenu : any = [] ;
  showmobile : Boolean = false ;
  myname : any  = '';
  submenu: SubmenuItem[] = [];
  timkiem : String = '' ;
  constructor(private api : ApiService , private route : ActivatedRoute , private router : Router) {

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {

    });

    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    window.addEventListener('scroll', () => {
      this.changeScrollIndex();
    });

    // gọi các api khi chạy trang
    this.getData();
  }

  changeScrollIndex() {

    if(window.pageYOffset >= 133) {
        this.isCroll = true ;

    }
    if(window.pageYOffset <= 133) {
        this.isCroll = false ;
    }
  }



  async getData(){
      (await this.api.get('/getmenu')).subscribe((v : any ) => {
          this.listmenu = v ;
          this.listmenu.forEach((e : any ) => {
            e.isMenu = false ;
          })
      })
  }

  toogle() {
    this.show =! this.show ;
  }



  toggleSubmenu(item : any ) {
    item.isMenu = !item.isMenu;
    this.listmenu.forEach((v: any ) => {
        if(item != v) {
            v.isMenu = false ;
        }
    })


  }

  chuyentrang(item : any ) {
    this.router.navigate([item.link]);
    this.show = false ;
    this.listmenu.forEach((v: any ) => {
      v.isMenu = false ;
  })
  }

  search() {
    this.router.navigate(['/tim-kiem/' + this.timkiem]);
    this.show = false ;
    this.timkiem = '' ;
  }
}
