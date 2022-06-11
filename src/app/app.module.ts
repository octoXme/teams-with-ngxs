import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsModule } from './components/icons/icons.module';
import { PageHeaderModule } from './components/page-header/page-header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PageHeaderModule,
    IconsModule,
    NgxsModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({ name: 'NGXS - Feature teams!' }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
