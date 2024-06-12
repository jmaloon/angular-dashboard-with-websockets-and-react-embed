import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { ReactDataTableWrapper } from "./ReactDataTableWrapper";

@NgModule({
  declarations: [AppComponent, ReactDataTableWrapper],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
