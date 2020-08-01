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
    this.userJSONBlogs();
  }

  private userJSONBlogs(): void {
    this.BlogsService.getJSONBlogs().subscribe(data => {
      this.userBlog = data;
    });
  }

}
