import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { PostView } from './post-view';
import { BlogpostsService } from '../../services/blogposts.service';
import { Blogpost } from '../../models/blogpost.type';

describe('PostView', () => {
  async function render(id: string, post: Blogpost | undefined) {
    const find = vi.fn(async () => post);
    await TestBed.configureTestingModule({
      imports: [PostView],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: convertToParamMap({ id }) } } },
        { provide: BlogpostsService, useValue: { find } },
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(PostView);
    await fixture.whenStable();
    fixture.detectChanges();
    return { el: fixture.nativeElement as HTMLElement, find };
  }

  it('loads the post by id and renders its markdown body', async () => {
    const { el, find } = await render('42', { id: 42, heading: 'Hello', summary: 'Sum', body: '**bold**' });
    expect(find).toHaveBeenCalledWith(42);
    expect(el.querySelector('h2')?.textContent).toContain('Hello');
    expect(el.querySelector('strong')?.textContent).toBe('bold');
  });

  it('shows "Post not found" for a missing post', async () => {
    const { el } = await render('7', undefined);
    expect(el.textContent).toContain('Post not found');
  });
});
