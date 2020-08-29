import { Component, OnInit } from '@angular/core';
import { BlogsService } from '../../shared/services/blogs.service';
import { IBlog } from '../../shared/interfaces/blog.interface';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  userBlog: Array<IBlog> = [];

  constructor(private BlogsService: BlogsService) { }

  ngOnInit(): void {
    this.adminFirebaseBlogs();
  }

  private adminFirebaseBlogs(): void {
    this.BlogsService.getFirecloudBlogs().subscribe(
      collection => {
        this.userBlog = collection.map(blog => {
          const data = blog.payload.doc.data() as IBlog;
          const id = blog.payload.doc.id;
          return { id, ...data };          
        });
      }
    );    
  }

  // private userJSONBlogs(): void {
  //   this.BlogsService.getJSONBlogs().subscribe(data => {
  //     this.userBlog = data;
  //   });
  // }

}
