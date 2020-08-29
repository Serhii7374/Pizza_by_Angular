import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../shared/interfaces/product.interface';
import { AngularFirestore, DocumentChangeAction, DocumentReference } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // private url: string;

  constructor(
    // private http: HttpClient,
    private firestore: AngularFirestore) {
    // this.url = 'http://localhost:3000/products'
   }

  // getJSONProduct(): Observable<Array<IProduct>> {
  //   return this.http.get<Array<IProduct>>(this.url);
  // }
  // postJSONProduct(product: IProduct): Observable<IProduct> {
  //   return this.http.post<IProduct>(this.url, product);
  // }
  // updateJSONProduct(product: IProduct): Observable<IProduct> {
  //   return this.http.put<IProduct>(`${this.url}/${product.id}`, product);
  // }
  // deleteJSONProduct(id: number): Observable<IProduct> {
  //   return this.http.delete<IProduct>(`${this.url}/${id}`);
  // }
  // getCategoryProduct(name: string): Observable<Array<IProduct>> {
  //   return this.http.get<Array<IProduct>>(`${this.url}?category.nameEN=${name}`);
  // }
  // getOneProduct(id: number): Observable<IProduct> {
  //   return this.http.get<IProduct>(`${this.url}/${id}`);
  // }
  
  getFirecloudProduct(): Observable<DocumentChangeAction<unknown>[]>{
    return this.firestore.collection('products').snapshotChanges()
  }
  postFirecloudProduct(product: IProduct): Promise<DocumentReference> {
    return this.firestore.collection('products').add(product);
  }
  deleteFirecloudProduct(id: string): Promise<void> {
    return this.firestore.collection('products').doc(id).delete();
  }  
  updateFirecloudProduct(product: IProduct): Promise<void> {
    return this.firestore.collection('products').doc(product.id).update(product);  
  }

}
