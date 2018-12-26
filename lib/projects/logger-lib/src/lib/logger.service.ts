import { Injectable, Optional } from '@angular/core';
import { LoggerConfig } from './logger.config';
import { LoggerModule } from './logger.module';
import {LogFormatterService} from "./log-formatter.service";

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor(@Optional() private config: LoggerConfig,
              private logFormatter: LogFormatterService) {
    // console.debug('logger-service');
    // console.debug('config', config);
  }

  debug(message: string): void {
    if (!this.config.enableDebug) return;
    // console.debug(message);
    console.debug(this.logFormatter.format(message));
  }

  log(message: string): void {
    // console.log(message);
    console.debug(this.logFormatter.format(message));
  }

}
