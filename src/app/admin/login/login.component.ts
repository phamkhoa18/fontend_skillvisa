import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Users } from 'src/app/models/users.model';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/client/services/api.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  user : any =  new Users ;
  isValid : Boolean = false ;
  isLoading : Boolean = false ;

  constructor(private toastr : ToastrService , private api : ApiService , private data:DataService , private router : Router ) {}
  async submit(data : NgForm) {
    this.isValid = true ;
    if(data.valid) {
      console.log(this.user);
      (await this.api.post("/login" , this.user)).subscribe(
        (v: any) => {
          this.isLoading = true ;
          sessionStorage.setItem('user' , JSON.stringify(v));
          setTimeout(() => {
            this.data.isLogin = true , this.router.navigate(['/home']) , this.isLoading = false ,  window.location.reload();
          } , 1000)
          this.toastr.success('Đăng nhập thành công', `Xin chào ${v.username}`);
        },
        (err) => {
          this.toastr.error('Đăng nhập thất bại' , 'Tài khoản không đúng');
        })
    }
  }
}
