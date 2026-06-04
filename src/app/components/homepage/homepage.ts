import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BlogpostsService } from '../../services/blogposts.service';
import { Blogpost } from '../../models/blogpost.type';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './homepage.html',
  styleUrls: ['./homepage.css']
})
export class Homepage implements OnInit {
  posts: Blogpost[] = [];

  constructor(
    private blogpostsService: BlogpostsService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.posts = await this.blogpostsService.findAll();
    // Sort descending by id
    this.posts.sort((a, b) => ((b.id || 0) - (a.id || 0)));
    this.cdr.detectChanges();
  }
}
