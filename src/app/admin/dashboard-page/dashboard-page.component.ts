import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from './../../shared/posts.service';
import { Subscription } from 'rxjs';
import { Post } from './../../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts!: Post[];
  postSubscription!: Subscription;
  searchValue = '';

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.postSubscription = this.postsService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }

  remove(id: string | undefined) {
    return id
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
}
