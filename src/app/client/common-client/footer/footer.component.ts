import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  listmenu : any = [] ;
  constructor(private api : ApiService) {
    this.getData() ;
  }

  async getData() {
      (await this.api.get('/getmenu' )).subscribe((v) => {
          this.listmenu = v ;
      })
  }
}
