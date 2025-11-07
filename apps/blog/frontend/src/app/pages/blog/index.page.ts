import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { injectContentFiles } from '@analogjs/content';

import PostAttributes from '../../post-attributes';

@Component({
  selector: 'app-blog',
  imports: [RouterLink],
  template: `
    <div class="blog-content">
      <header class="blog-post-header">
        <h1>blog.kloeden.ml</h1>
      </header>
      @for (post of posts; track post.attributes.slug) {
        @if(post.attributes.date) {
        <a [routerLink]="['/blog/', post.attributes.slug]">
          <h3 class="post__title">{{ post.attributes.title }}</h3>
          <p class="post__desc">{{ post.attributes.description }}</p>
        </a>
        } 
      }
    </div>
  `,
  styles: `
    a {
      text-align: left;
      display: block;
      margin-bottom: 2rem;
    }

    .post__title,
    .post__desc {
      margin: 0;
    }
  `,
})
export default class BlogComponent {
  readonly posts = injectContentFiles<PostAttributes>();
}
