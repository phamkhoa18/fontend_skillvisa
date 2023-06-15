import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonAdminComponent } from './common-admin/common-admin.component';
import { HeaderComponent } from './common-admin/header/header.component';
import { SidebarComponent } from './common-admin/sidebar/sidebar.component';
import { LoginComponent } from './login/login.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HomeComponent } from './home/home.component';
import { DanhmucComponent } from './danhmuc/danhmuc.component';
import { MenuComponent } from './menu/menu.component';
import { LoadingComponent } from './loading/loading.component';
import { PostsComponent } from './posts/posts.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddpostsComponent } from './posts/addposts/addposts.component';
import { EditpostsComponent } from './posts/editposts/editposts.component';
import { NgxEditorModule } from 'ngx-editor';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { SliderComponent } from './slider/slider.component';
import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    CommonAdminComponent,
    HeaderComponent,
    SidebarComponent,
    LoginComponent,
    HomeComponent,
    DanhmucComponent,
    MenuComponent,
    LoadingComponent,
    PostsComponent,
    AddpostsComponent,
    EditpostsComponent,
    SliderComponent,
    ContactComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgxPaginationModule,
    NgxEditorModule,
    CKEditorModule,
    DragDropModule
  ]
})
export class AdminModule { }
