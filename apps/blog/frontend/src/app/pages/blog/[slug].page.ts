import { Component } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { injectContent, MarkdownComponent } from '@analogjs/content';

import PostAttributes from '../../post-attributes';
import { filter } from "rxjs/operators";

@Component({
  selector: 'app-blog-post',
  imports: [AsyncPipe, MarkdownComponent],
  template: `
   @if (post$ | async; as post) {
      <article class="blog-content">
        <header class="blog-post-header">
          <h1>{{ post.attributes.title }}</h1>
          @if(post.attributes.subtitle) {
            <p class="italic">{{post.attributes.subtitle}}</p>
          }
          <div class="blog-post-meta">
            <time>{{ formatDate(post.attributes.date) }}</time>
          </div>
          @if (post.attributes.description) {
            <p class="blog-post-description">{{ post.attributes.description }}</p>
          }
        </header>
        
        @if (post.attributes.coverImage) {
          <img class="blog-post-cover" [src]="post.attributes.coverImage" [alt]="post.attributes.title" />
        }
        
        <analog-markdown [content]="post.content" />
      </article>
    }
  `,
  styles: `
    .post__image {
      max-height: 40vh;
    }
  `,
})
export default class BlogPostComponent {
  readonly post$ = injectContent<PostAttributes>('slug').pipe(
    filter((post) => !!post.attributes.date)
  );

  formatDate(dateString: string | Date): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }
}
