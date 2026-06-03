import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BlogpostsService } from '../../services/blogposts.service';
import { Blogpost } from '../../models/blogpost.type';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard implements OnInit {
  posts: Blogpost[] = [];
  currentPost: Blogpost = { heading: '', summary: '', body: '' };
  isEditing: boolean = false;

  constructor(
    private blogpostsService: BlogpostsService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    await this.loadPosts();
  }

  async loadPosts() {
    this.posts = await this.blogpostsService.findAll();
    this.posts.sort((a, b) => ((b.id || 0) - (a.id || 0)));
    this.cdr.detectChanges();
  }

  editPost(post: Blogpost) {
    this.currentPost = { ...post };
    this.isEditing = true;
  }

  cancelEdit() {
    this.currentPost = { heading: '', summary: '', body: '' };
    this.isEditing = false;
  }

  async savePost() {
    if (!this.currentPost.heading || !this.currentPost.body) {
      alert('Heading and body are required!');
      return;
    }
    await this.blogpostsService.save(this.currentPost);
    this.cancelEdit();
    await this.loadPosts();
  }

  async deletePost(id: number | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this post?')) {
      await this.blogpostsService.delete(id);
      await this.loadPosts();
    }
  }
}
