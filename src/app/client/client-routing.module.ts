import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonClientComponent } from './common-client/common-client.component';
import { HomeComponent } from './home/home.component';
import { WorkComponent } from './work/work.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { TimkiemComponent } from './timkiem/timkiem.component';

const routes: Routes = [
  {path : "" , component : CommonClientComponent , children : [
    {path : "trang-chu" , component : HomeComponent , pathMatch : "full"},
    {path : "vn/:name" , component : WorkComponent},
    {path : "bai-viet/:name" , component : NewsComponent},
    {path : "lien-he" , component : ContactComponent},
    {path : 'tim-kiem/:name' , component : TimkiemComponent},
    {path : "" , redirectTo : "trang-chu" , pathMatch : 'full'}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
