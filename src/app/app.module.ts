import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TreeModule } from 'angular-tree-component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TreeviewModule } from 'ngx-treeview';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { ClipboardModule } from 'ngx-clipboard';
import { QRCodeModule } from 'angularx-qrcode';

// local services and component
import { ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { reducers } from './reducers';

import { declarations, effects } from './app.declarations';
import { providers } from './app.providers';

const imports = [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        ToastModule.forRoot(),
        ClipboardModule,
        HttpClientModule,
        ReactiveFormsModule,
        TreeModule,
        QRCodeModule,
        RouterModule.forRoot(ROUTES, {
          useHash: true,
          preloadingStrategy: PreloadAllModules
        }),
        StoreModule.forRoot(reducers),
        EffectsModule.forRoot(effects),
        StoreDevtoolsModule.instrument({
            maxAge: 5
        }),
        TreeviewModule.forRoot()
    ];
@NgModule({
    declarations,
    imports,
    providers,
    bootstrap: [AppComponent]
})
export class AppModule {}
