import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogMonitorComponent } from './log-monitor.component';
import { LoggerConfig } from './logger.config';
import {LoggerService} from './logger.service';
import {DefaultLogFormatterService} from "./default-log-formatter.service";
import {LogFormatterService} from "./log-formatter.service";

const defaultFormatterConfig = [{
  provide: LogFormatterService,
  useClass: DefaultLogFormatterService
}];

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    LogMonitorComponent
  ],
  exports: [
    LogMonitorComponent
  ]
})
export class LoggerModule {

  static forRoot(config: LoggerConfig): ModuleWithProviders {
    return {
      ngModule: LoggerModule,
      providers: [
        LoggerService,
        { provide: LoggerConfig, useValue: config },
        // This is a bit special but needed as the
        // Angular Compiler needs to statically find
        // out whats going on here ...
        (!config.logFormatterType) ?
          defaultFormatterConfig :
          [{provide: LogFormatterService, useClass: config.logFormatterType}],
      ]
    }
  }

}
