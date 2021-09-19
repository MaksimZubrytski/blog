import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { fbCreateResponse, Post } from './interfaces';
import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class PostsService {
  constructor(private http: HttpClient) {}

  create(post: Post): Observable<Post> {
    return this.http.post<any>(`${environment.fbDbUrl}/posts.json`, post).pipe(
        map((response: fbCreateResponse) => {
            console.log(response)
            return {
                ...post,
                id: response.name,
                date: new Date(post.date)
            }
        })
    );
  }

  getAll():Observable<Post[]> {
      return this.http.get<any>(`${environment.fbDbUrl}/posts.json`).pipe(
          map((response) => {
              return Object.keys(response).map((key) => {
                  return {
                    ...response[key],
                      id: key,
                      date: new Date(response[key].date)
                  }
              })
          })
      )
  }
}
