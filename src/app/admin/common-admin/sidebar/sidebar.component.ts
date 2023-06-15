import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isShow = true;
  subscription: Subscription;

  constructor(private data: DataService , private router : Router) {
    this.subscription = this.data.isLoginChanged.subscribe((value: boolean) => {
      this.isShow = value;
    });
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  click() {
    this.router.navigate(['/home']);
    window.location.reload();
  }

  click1() {
    this.router.navigate(['/danhmuc']);
    window.location.reload();
  }

  logout() {
    sessionStorage.removeItem('user') ;
    window.location.reload();
}
}
