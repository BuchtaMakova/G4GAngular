import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryComponent } from './components/category/category.component';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './mat-module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SubCategoryComponent } from './components/sub-category/sub-category.component';
import { ContentComponent } from './components/content/content.component';
import { ContentDetailComponent } from './components/content-detail/content-detail.component';
import { CommentComponent } from './components/comment/comment.component';
import { CreateContentComponent } from './components/create-content/create-content.component';

const routes: Routes = [
  { path: '', component: CategoryComponent },
  { path: 'SubCategory/:idSubcategory', component: ContentComponent },
  { path: 'Content/:idContent', component: ContentDetailComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    NavbarComponent,
    SubCategoryComponent,
    ContentComponent,
    ContentDetailComponent,
    CommentComponent,
    CreateContentComponent,
  ],
  imports: [
    [RouterModule.forRoot(routes)],
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
