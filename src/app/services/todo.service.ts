import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AddTodo, EditedTodo, Todo } from '../models/todo'
import { Observable, of } from 'rxjs'
import { catchError, map, tap } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todosUrl = 'http://localhost:9000/todos';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}
    
    getTodos(): Observable<Todo[]> {
      return this.http.get<Todo[]>(this.todosUrl)
        .pipe(
          tap(todos => this.log('fetched todos')),
          catchError(this.handleError<Todo[]>('getTodos', []))
        );
    }
    
    getTodo(id: number): Observable<Todo> {
      const url = `${this.todosUrl}/${id}`
      return this.http.get<Todo>(url).pipe(
        tap(_ => this.log(`fetched todo id=$${id}`)),
        catchError(this.handleError<Todo>(`getTodo id=${id}`))
      );
    }

    addTodo(todo: AddTodo): Observable<Todo> {
      return this.http.post<Todo>(this.todosUrl, todo, this.httpOptions).pipe(
        tap((newTodo: Todo) => this.log(`added todo w/ id=${newTodo.id}`)),
        catchError(this.handleError<Todo>('addTodo'))
      );
    }

    updateTodo(id: number, todo: EditedTodo): Observable<any> {
      return this.http.put(`${this.todosUrl}/${id}`, todo, this.httpOptions).pipe(
        tap(_ => this.log(`updated todo id=${id}`)),
        catchError(this.handleError<any>(`updateTodo id=${id}`))
      );
    }

    deleteTodo(id: number): Observable<Todo> {
      return this.http.delete<Todo>(`${this.todosUrl}/${id}`, this.httpOptions).pipe(
        tap(_ => this.log(`deleted todo id=${id}`)),
        catchError(this.handleError<Todo>(`deleteTodo id=${id}`))
      );
    }

    private log(message: string) {
      console.log(message);
      this.messageService.add(`TodoService: ${message}`)
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(error);

        this.log(`${operation} faild: ${error.message}`);

        return of(result as T);
      }
    }
}
