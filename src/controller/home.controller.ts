import { Controller, Get, Inject, Query } from '@midwayjs/core';
import { TCService } from '../service/tc.service';

@Controller('/')
export class HomeController {
  @Inject()
  tCService: TCService;

  @Get('/')
  async home(@Query('input') input: string): Promise<any> {
    return await this.tCService.formatInputToEventFlows(input);
  }
}
