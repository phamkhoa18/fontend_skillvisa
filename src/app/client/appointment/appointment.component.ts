import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ApiService } from '../services/api.service';



export class user{
  name : String = '' ;
  email : String = '';
  select : String = '' ;
  phone : String = '' ;
  date : Date | null = null  ;
}


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent {



  isValid : Boolean = false ;

  user1 : user = new user() ;

  constructor(private api : ApiService) {}

async  submit(data : any ) {
    this.isValid = true ;
      if(data.valid) {
          if(this.user1.date == null ) {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Vui lòng nhập ngày hẹn !',
            })
          } else {

            const object = {
              username : this.user1.name ,
              email : this.user1.email ,
              select : this.user1.select ,
              phone : this.user1.phone ,
              date : this.user1.date
            };
            (await this.api.post('/sendcontact',object)).subscribe((v : any) => {
                  console.log(v);
                  if(v.status = 200) {
                    this.user1 = new user();
                    Swal.fire({
                      icon: 'success',
                      title: 'Thông tin của bạn đã được gửi',
                      text: 'Cảm ơn bạn vì đã lựa chọn EducationVisa , Xin cảm ơn !',
                    })
                  } else {
                    this.user1 = new user();
                    Swal.fire({
                      icon: 'error',
                      title: 'Vui lòng gửi lại thông tin',
                      text: 'Something went wrong!',
                    })
                  }
            })

          }
      }
  }

}
