import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDashboard } from './admin-dashboard';
import { BlogpostsService } from '../../services/blogposts.service';

describe('AdminDashboard', () => {
  let component: AdminDashboard;
  let fixture: ComponentFixture<AdminDashboard>;
  let service: { findAll: ReturnType<typeof vi.fn>; save: ReturnType<typeof vi.fn>; delete: ReturnType<typeof vi.fn> };

  beforeEach(async () => {
    service = {
      findAll: vi.fn(async () => [{ id: 1, heading: 'First', summary: '', body: 'x' }]),
      save: vi.fn(async () => {}),
      delete: vi.fn(async () => {}),
    };
    await TestBed.configureTestingModule({
      imports: [AdminDashboard],
      providers: [{ provide: BlogpostsService, useValue: service }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('lists existing posts', () => {
    expect((fixture.nativeElement as HTMLElement).textContent).toContain('First');
  });

  it('saves a new post and resets the form', async () => {
    component.currentPost = { heading: 'New', summary: 's', body: 'b' };
    await component.savePost();
    expect(service.save).toHaveBeenCalledWith(expect.objectContaining({ heading: 'New' }));
    expect(component.currentPost.heading).toBe('');
    expect(component.isEditing).toBe(false);
  });
});
