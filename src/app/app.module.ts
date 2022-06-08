import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchFilterPipe } from './pipe/search-filter.pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, PostComponent, SearchFilterPipe],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
