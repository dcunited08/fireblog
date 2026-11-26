import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Homepage } from './homepage';
import { BlogpostsService } from '../../services/blogposts.service';
import { Blogpost } from '../../models/blogpost.type';

describe('Homepage', () => {
  let fixture: ComponentFixture<Homepage>;
  let posts: Blogpost[];

  async function render() {
    await TestBed.configureTestingModule({
      imports: [Homepage],
      providers: [
        provideRouter([]),
        { provide: BlogpostsService, useValue: { findAll: async () => posts.map(p => ({ ...p })) } },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(Homepage);
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement as HTMLElement;
  }

  it('lists posts newest first', async () => {
    posts = [
      { id: 1, heading: 'Older', summary: 'a', body: 'a' },
      { id: 2, heading: 'Newer', summary: 'b', body: 'b' },
    ];
    const el = await render();
    const headings = Array.from(el.querySelectorAll('h2')).map(h => h.textContent);
    expect(headings).toEqual(['Newer', 'Older']);
    expect(el.querySelector('a[href="/blogpost/2"]')).toBeTruthy();
  });

  it('shows an empty state when there are no posts', async () => {
    posts = [];
    const el = await render();
    expect(el.textContent).toContain('No posts found');
  });
});
