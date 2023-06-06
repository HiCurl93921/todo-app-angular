import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categoriesUrl = 'http://localhost:9000/categories';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.categoriesUrl)
      .pipe(
        tap(categories => this.log('fetched categories')),
        catchError(this.handleError<Category[]>('getCategories', []))
      )
  }

  private log(message: string) {
    this.messageService.add(`CategoryService: ${message}`)
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} faild: ${error.message}`);

      return of(result as T)
    }
  }
}
