import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBlog } from '../interfaces/blog.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  private url: string;

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/blogs';
  }

  getJSONBlogs(): Observable<Array<IBlog>> {
    return this.http.get<Array<IBlog>>(this.url);
  }

  postJSONBlogs(blog: IBlog): Observable<IBlog> {
    return this.http.post<IBlog>(this.url, blog);
  }

  deleteJSONBlogs(id: number): Observable<IBlog> {
    return this.http.delete<IBlog>(`${this.url}/${id}`);
  }

  updateJSONBlogs(blog: IBlog): Observable<IBlog> {
    return this.http.put<IBlog>(`${this.url}/${blog.id}`, blog);
  }

}
