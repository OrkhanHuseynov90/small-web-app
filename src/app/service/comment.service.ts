import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private commentsURL = 'https://jsonplaceholder.typicode.com/comments/';

  constructor(private http: HttpClient) {}

  getComments(postId: number) {
    let params = new HttpParams().set('postId', postId);
    return this.http.get<Comment[]>(this.commentsURL, { params });
  }

  getCommentById(commentId: number) {
    return this.http.get<Comment>(this.commentsURL + commentId);
  }

  addComment(comment: Comment) {
    return this.http.post<Comment>(this.commentsURL, comment);
  }

  editComment(comment: Comment) {
    return this.http.put<Comment>(this.commentsURL + comment.id, comment);
  }

  deleteComment(commentId: number) {
    return this.http.delete<Comment>(this.commentsURL + commentId);
  }
}
