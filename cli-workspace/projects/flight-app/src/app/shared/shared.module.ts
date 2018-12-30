import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ModuleWithProviders} from '@angular/core/src/metadata/ng_module';
import {CityPipe} from './pipes/city.pipe';
import {AuthService} from "./auth/services/auth.service";
import {AuthGuard} from "./auth/guards/auth.guard";
import {CanDeactivateGuard} from "./deactivation/can-deactivate.guard";
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {AuthInterceptorService} from "./auth/services/auth-interceptor.service";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    CityPipe,
  ],
  exports: [
    CityPipe,
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        AuthService,
        AuthGuard,
        CanDeactivateGuard,

        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptorService,
          multi: true
        }
      ]
    }
  }

  static forChild(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: []
    }
  }

}
