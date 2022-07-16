import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from './../../shared/posts.service';
import { Subscription } from 'rxjs';
import { Post } from './../../shared/interfaces';
import { AlertService } from './../shared/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts!: Post[];
  postSub!: Subscription;
  postDeleteSub!: Subscription;
  searchValue = '';

  constructor(private postsService: PostsService, private alert: AlertService) {}

  ngOnInit() {
    this.postSub = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  remove(id: string | undefined): void {
    this.postDeleteSub = this.postsService.delete(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.alert.danger('Post was deleted')
    });
  }

  ngOnDestroy() {
    if(this.postSub) {
      this.postSub.unsubscribe();
    }

    if(this.postDeleteSub) {
      this.postDeleteSub.unsubscribe();
    }

  }
}
