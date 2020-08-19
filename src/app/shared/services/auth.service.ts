import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore,
    private router: Router) { }

  signIn(email: string, password: string): void {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then(user => {
        this.afFirestore.collection('users').ref.where('id', '==', user.user.uid).onSnapshot(
          snap => {
            snap.forEach(userRef => {
              console.log('userRef', userRef.data());
              localStorage.setItem('user', JSON.stringify(userRef.data()));
              if (userRef.data().role === 'admin' && userRef.data().access) {
                this.router.navigateByUrl('admin');
              }
              else{
                this.router.navigateByUrl('home');
              }
            });
          }
        );
      })
      .catch(err => console.log(err));
  }

  signOut(): void {
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem('user');
        this.router.navigateByUrl('login');
      })
      .catch(err => console.log(err));
  }

  signUp(email: string, password: string): void {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(userResponse => {
        const user = {
          id: userResponse.user.uid,
          email: userResponse.user.email,
          role: 'user'
        };
        this.afFirestore.collection('users').add(user)
          .then(userCollection => {
            console.log('userCollection', userCollection);
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  }
}
