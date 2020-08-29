import { Component, OnInit } from '@angular/core';
import { IBlog } from '../../shared/interfaces/blog.interface';
import { Blog } from '../../shared/models/blog.models';
import { BlogsService } from '../../shared/services/blogs.service';

@Component({
  selector: 'app-adminblog',
  templateUrl: './adminblog.component.html',
  styleUrls: ['./adminblog.component.scss']
})
export class AdminblogComponent implements OnInit {
  swichEdit: boolean;
  blogs: Array<IBlog> = [];
  title: string;
  text: string;
  author: string;
  tempIndex: number;
  bID = '1';

  constructor(private BlogsService: BlogsService) { }

  ngOnInit(): void {
    // this.adminJSONBlogs();
    this.adminFirebaseBlogs();
  }

  private adminFirebaseBlogs(): void {
    this.BlogsService.getFirecloudBlogs().subscribe(
      collection => {
        this.blogs = collection.map(blog => {
          const data = blog.payload.doc.data() as IBlog;
          const id = blog.payload.doc.id;
          return { id, ...data };          
        });
      }
    );    
  }

  addBlog(): void {
    const newB: IBlog = new Blog(this.bID, this.title, this.text, new Date, this.author);
    delete newB.id;
    this.BlogsService.postFirecloudBlogs(Object.assign({}, newB)).then(
      () => {
        console.log('add blog');
      }
    )    
    this.resetForm();
  }

  // видалення поста
  deleteBlog(blog: IBlog): void {    
    this.BlogsService.deleteFirecloudBlogs(blog).then(
      () => {this.adminFirebaseBlogs();}
    );
    this.resetForm();
  }

  editBlog(blog: IBlog) {
    this.bID = blog.id;
    this.title = blog.title;
    this.text = blog.text;
    this.author = blog.author;
    this.swichEdit = !this.swichEdit
  }
  saveEdit(): void {
    const blog: IBlog = new Blog(this.bID, this.title, this.text, new Date, this.author);
    this.BlogsService.updateFirecloudBlogs(Object.assign({}, blog)).then(
      () => {console.log('add product');}
    );
    this.swichEdit = !this.swichEdit
    this.resetForm();
  }

  private resetForm(): void {
    this.bID = '1';
    this.title = '';
    this.text = '';
    this.author = '';
  }

  // private adminJSONBlogs(): void {
  //   this.BlogsService.getJSONBlogs().subscribe(data => {
  //     this.blogs = data;
  //   });
  // }
  // addBlog(): void {
  //   if (this.title && this.text && this.author) {
  //     const blog: IBlog = new Blog(this.bID, this.title, this.text, new Date, this.author);
  //     delete blog.id;
  //     this.BlogsService.postJSONBlogs(blog).subscribe(
  //       () => {this.adminJSONBlogs();}
  //     );
  //     this.title = '';
  //     this.text = '';
  //     this.author = '';
  //   } else alert('Fill all fields');
  // }
  // saveEdit(): void {
  //   const blog: IBlog = new Blog(this.bID, this.title, this.text, new Date, this.author);
  //   this.BlogsService.updateJSONBlogs(blog).subscribe(
  //     () => {this.adminJSONBlogs();}
  //   );
  //   this.swichEdit = !this.swichEdit
  // }
  // deleteBlog(blog: IBlog): void {
  //   this.BlogsService.deleteJSONBlogs(blog.id).subscribe(
  //     () => {this.adminJSONBlogs();}
  //   );
  // }

}