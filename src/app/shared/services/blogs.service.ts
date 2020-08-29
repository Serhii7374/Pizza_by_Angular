import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { IBlog } from '../interfaces/blog.interface';
import { Observable } from 'rxjs';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class BlogsService {
  // private url: string;

  constructor(
    // private http: HttpClient,
    private firestore: AngularFirestore) {
    // this.url = 'http://localhost:3000/blogs';
  }

  // getJSONBlogs(): Observable<Array<IBlog>> {
  //   return this.http.get<Array<IBlog>>(this.url);
  // }

  // postJSONBlogs(blog: IBlog): Observable<IBlog> {
  //   return this.http.post<IBlog>(this.url, blog);
  // }

  // deleteJSONBlogs(id: number): Observable<IBlog> {
  //   return this.http.delete<IBlog>(`${this.url}/${id}`);
  // }

  // updateJSONBlogs(blog: IBlog): Observable<IBlog> {
  //   return this.http.put<IBlog>(`${this.url}/${blog.id}`, blog);
  // }

  getFirecloudBlogs(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('discounts').snapshotChanges()
  }

  postFirecloudBlogs(blog: IBlog): Promise<DocumentReference> {
    return this.firestore.collection('discounts').add(blog);
  }

  deleteFirecloudBlogs(blog: IBlog): Promise<void> {
    return this.firestore.collection('discounts').doc(blog.id).delete();
  }
  
  updateFirecloudBlogs(blog: IBlog): Promise<void> {
    return this.firestore.collection('discounts').doc(blog.id).update(blog);  
  }

}
