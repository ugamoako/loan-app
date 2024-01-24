import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc
} from '@firebase/firestore';
import {
  Firestore,
  QueryConstraint,
  collectionData,
  docData,
  setDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { documentId, getDoc, query, where } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  firestore: Firestore = inject(Firestore);
  constructor() {}

  getAll(table: string): Observable<any[]> {
    const docsRef = collection(this.firestore, table);
    return collectionData(docsRef, { idField: 'id' }) as Observable<any[]>;
  }

  get(table: string, id: string) {
    const docRef = doc(this.firestore, `${table}/${id}`);
    return docData(docRef, { idField: 'id' }) as Observable<any>;
  }

  getBy(table: string, args: QueryConstraint[]) {
    const docRef = query(collection(this.firestore, table), ...args);
    const docs = collectionData(docRef, { idField: 'id' }) as Observable<any[]>;
    return docs;
  }

  post(table: string, document: any) {
    const docsRef = collection(this.firestore, table);
    return addDoc(docsRef, document);
  }

  put(table: string, document: any) {
    const id = document.id ?? document.uid;
    const docRef = doc(this.firestore, `${table}/${id}`);
    return setDoc(docRef, document);
  }

  patch(table: string, id: string, document: any) {
    const docRef = doc(this.firestore, `${table}/${id}`);
    return updateDoc(docRef, document);
  }

  delete(table: string, id: string) {
    const docRef = doc(this.firestore, `${table}/${id}`);
    return deleteDoc(docRef);
  }

  getDocumentsByIds(table: string, ids: string[]) {
    const collectionRef = collection(this.firestore, table);
    const newQuery = query(collectionRef, where(documentId(), 'in', ids));
    return collectionData(newQuery, { idField: 'id' }) as Observable<any[]>;
  }

  async getById(table: string, id: string) {
    const docRef = doc(this.firestore, `${table}/${id}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return '';
    }
  }
}
