import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AdminblogComponent } from './admin/adminblog/adminblog.component';
import { AdminComponent } from './admin/admin.component';
import { AdmincategoryComponent } from './admin/admincategory/admincategory.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import { SortPipe } from './shared/pipes/sort.pipe';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';
import { SortProductPipe } from './shared/pipes/sort-product.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BlogComponent,
    AdminblogComponent,
    AdminComponent,
    AdmincategoryComponent,
    SearchPipe,
    SortPipe,
    SortProductPipe,
    AdminProductComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
