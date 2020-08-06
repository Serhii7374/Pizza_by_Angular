import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogComponent } from './pages/blog/blog.component';
import { AdminblogComponent } from './admin/adminblog/adminblog.component';
import { AdminComponent } from './admin/admin.component';
import { AdmincategoryComponent } from './admin/admincategory/admincategory.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';


const routes: Routes = [
  { path: 'blog', component: BlogComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', redirectTo: 'admin', pathMatch: 'full' },
    { path: 'blog', component: AdminblogComponent },
    { path: 'product', component: AdminProductComponent },
    { path: 'category', component: AdmincategoryComponent }
    ] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
