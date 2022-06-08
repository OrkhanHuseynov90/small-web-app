import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../model/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsURL = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(private http: HttpClient) {}

  getPosts() {
    return this.http.get<Post[]>(this.postsURL);
  }

  getPostById(postId: number) {
    return this.http.get<Post>(this.postsURL + postId);
  }

  addPost(postToCreate: Post) {
    return this.http.post<Post>(this.postsURL, postToCreate);
  }

  editPost(postToEdit: Post) {
    return this.http.put<Post>(this.postsURL + postToEdit.id, postToEdit);
  }

  deletePost(postId: number) {
    return this.http.delete<Post>(this.postsURL + postId);
  }
}
