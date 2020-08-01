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
  bID = 1;

  constructor(private BlogsService: BlogsService) { }

  ngOnInit(): void {
    this.adminJSONBlogs();
  }

  private adminJSONBlogs(): void {
    this.BlogsService.getJSONBlogs().subscribe(data => {
      this.blogs = data;
    });
  }

  addBlog(): void {
    if (this.title && this.text && this.author) {
      const blog: IBlog = new Blog(this.bID, this.title, this.text, new Date, this.author);
      delete blog.id;
      this.BlogsService.postJSONBlogs(blog).subscribe(
        () => {this.adminJSONBlogs();}
      );
      this.title = '';
      this.text = '';
      this.author = '';
    } else alert('Fill all fields');
  }

  // видалення поста
  deleteBlog(blog: IBlog): void {
    this.BlogsService.deleteJSONBlogs(blog.id).subscribe(
      () => {this.adminJSONBlogs();}
    );
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
    this.BlogsService.updateJSONBlogs(blog).subscribe(
      () => {this.adminJSONBlogs();}
    );
    this.title = '';
    this.text = '';
    this.author = '';
    this.swichEdit = !this.swichEdit
  }


}