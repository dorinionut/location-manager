import { Controller, Get, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { appConfig } from './config';

@Controller(appConfig.API_PREFIX)
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  root(@Res() response): string {
    return response.send('It works');
  }
}
