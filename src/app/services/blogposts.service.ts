import { Injectable } from '@angular/core';
import { firebaseDb } from '../firebase.config';
import { ref, get, set, remove, child } from 'firebase/database';
import { Blogpost } from '../models/blogpost.type';

@Injectable({
  providedIn: 'root'
})
export class BlogpostsService {

  constructor() { }

  async findAll(): Promise<Blogpost[]> {
    const dbRef = ref(firebaseDb);
    const snapshot = await get(child(dbRef, `blogposts`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      return Object.values(data);
    }
    return [];
  }

  async find(id: number): Promise<Blogpost | undefined> {
    const allPosts = await this.findAll();
    return allPosts.find(post => post.id === id);
  }

  async save(post: Blogpost): Promise<void> {
    if (!post.id) {
      post.id = Date.now();
    }
    const postRef = ref(firebaseDb, `blogposts/${post.id}`);
    await set(postRef, post);
  }

  async delete(id: number): Promise<void> {
    const postRef = ref(firebaseDb, `blogposts/${id}`);
    await remove(postRef);
  }
}
