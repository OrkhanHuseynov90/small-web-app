import { Component, OnInit } from '@angular/core';
import { Comment } from '../model/comment.model';
import { Post } from '../model/post.model';
import { CommentService } from '../service/comment.service';
import { PostService } from '../service/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  postList: Post[] = [];
  postComments: Comment[] = [];
  commentEdited: boolean = false;
  searchTerm: string = '';
  ascendingTitle: boolean = true;
  ascendingBody: boolean = true;
  modifiedRows: Map<number, boolean> = new Map();
  editOnPost: number[] = [];
  editOnComment: number[] = [];

  // temporary solution for id generation, as it is usually generated at backend
  static userId: number = 11;

  constructor(
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.postService.getPosts().subscribe((res) => {
      this.postList = res;
    });
    this.modifiedRows.clear();
  }

  onCreatePost(title: string, body: string) {
    if (title != '' && body != '') {
      const post = new Post(++PostComponent.userId, 0, title, body);
      this.postService.addPost(post).subscribe((res) => {
        this.postList.unshift(res);
      });
    } else {
      alert('Please fill out post data');
    }
  }

  /* onEditPost(postToEdit: Post, index: number) {
    //this.postEdited = true;
    this.postService.editPost(postToEdit).subscribe((res) => {
      this.postList = this.postList.filter((post) => post.id != postToEdit.id);
      this.postList.unshift(res);
      this.postEdited = false;
    });
  } */

  hideOnEdit(index: number, item: string) {
    if (item == 'post') {
      this.editOnPost.indexOf(index) > -1 ? '' : this.editOnPost.push(index);
    } else {
      this.editOnComment.indexOf(index) > -1
        ? ''
        : this.editOnComment.push(index);
    }
  }

  onEditPost(
    postId: number,
    postTitle: string,
    postBody: string,
    index: number
  ) {
    let indexOf = this.editOnPost.indexOf(index);
    this.editOnPost.splice(indexOf, 1);
    let postToEdit = new Post(0, postId, postTitle, postBody);
    this.postService.editPost(postToEdit).subscribe((res) => {
      this.postList = this.postList.filter((post) => post.id != postToEdit.id);
      this.postList.unshift(res);
    });
  }

  onDeletePost(id: number) {
    this.postService.deletePost(id).subscribe((res) => {
      this.postList = this.postList.filter((post) => post.id != id);
    });
  }

  getPostById(postId: number) {
    this.postService.getPostById(postId).subscribe((res) => {
      console.log(res);
    });
  }

  getCommentsByPost(postId: number) {
    if (!this.isClicked(postId)) {
      // this.postComments = [];
      this.commentService.getComments(postId).subscribe((res) => {
        this.postComments = res;
      });
    }
  }

  clicked(id: number): void {
    this.modifiedRows.set(id, true);
  }

  isClicked(id: number): boolean {
    return this.modifiedRows.has(id);
  }

  onSortPosts(sortBy: string) {
    const collator = new Intl.Collator('en', {
      numeric: true,
      sensitivity: 'base',
    });
    this.postList.sort((post1, post2) => {
      if (sortBy === 'title') {
        if (this.ascendingTitle) {
          return collator.compare(post1.title, post2.title);
        } else {
          return collator.compare(post2.title, post1.title);
        }
      } else {
        if (this.ascendingBody) {
          return collator.compare(post1.body, post2.body);
        } else {
          return collator.compare(post2.body, post1.body);
        }
      }
    });
  }

  onCreateComment(postId: number, name: string, email: string, body: string) {
    if (name != '' && email != '' && body != '') {
      let commentCreated = new Comment(postId, 0, name, email, body);
      this.commentService.addComment(commentCreated).subscribe((res) => {
        this.postComments.unshift(res);
      });
    } else {
      alert('Please fill out comment data');
    }
  }

  onEditComment(
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string,
    index: number
  ) {
    let indexOf = this.editOnComment.indexOf(index);
    this.editOnComment.splice(indexOf, 1);
    let commentToEdit = new Comment(postId, id, name, email, body);
    this.commentService.editComment(commentToEdit).subscribe((res) => {
      this.postComments = this.postComments.filter(
        (comment) => comment.id != id
      );
      this.postComments.unshift(commentToEdit);
      this.commentEdited = false;
    });
  }

  onDeleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe((res) => {
      this.postComments = this.postComments.filter(
        (comment) => comment.id != commentId
      );
    });
  }
}
