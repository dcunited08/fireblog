import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BlogpostsService } from '../../services/blogposts.service';
import { Blogpost } from '../../models/blogpost.type';
import { marked } from 'marked';

@Component({
  selector: 'app-post-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './post-view.html',
  styleUrls: ['./post-view.css']
})
export class PostView implements OnInit {
  post: Blogpost | undefined;
  loading: boolean = true;
  parsedBody: string = '';

  constructor(
    private route: ActivatedRoute,
    private blogpostsService: BlogpostsService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.post = await this.blogpostsService.find(Number(idParam));
      if (this.post && this.post.body) {
        this.parsedBody = await marked.parse(this.post.body);
      }
    }
    this.loading = false;
    this.cdr.detectChanges();
  }
}
