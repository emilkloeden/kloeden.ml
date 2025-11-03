import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';
import { RouteMeta } from '@analogjs/router';
import PostAttributes from "./post-attributes";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="blog-layout">
      <nav class="blog-nav">
        <div class="blog-nav-title"><a routerLink="/">blog.kloeden.ml</a></div>
        <div class="blog-nav-list">
          @for (post of posts; track post.slug) {
            <a 
              [routerLink]="['/blog', post.slug]" 
              class="blog-nav-item" 
              routerLinkActive="active">
              {{ post.attributes.title }}
            </a>
          }
          @if(posts.length > numLinksToShow) {
            <a 
              [routerLink]="['/blog']" 
              class="blog-nav-item" 
              routerLinkActive="active">
              ...
            </a>
          }
        </div>
      </nav>
      
      <main class="blog-main">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AppComponent {
  protected readonly numLinksToShow = 5
  public posts = injectContentFiles<PostAttributes>().sort((a, b) => {
    const dateA = new Date(a.attributes['date']);
    const dateB = new Date(b.attributes['date']);
    return dateB.getTime() - dateA.getTime();
  }).slice(0, this.numLinksToShow);
}