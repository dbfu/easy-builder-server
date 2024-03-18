import { App, Provide } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';
import { createJsonTranslator, createLanguageModel } from 'typechat';
import { EventFlow } from './schema';
dotenv.config();

@Provide()
export class TCService {
  @App()
  koaApp: koa.Application;
  async formatInputToEventFlows(input: string) {
    const model = createLanguageModel(process.env);
    const schema = fs.readFileSync(
      path.join(this.koaApp.getAppDir(), 'src/service/schema.ts'),
      'utf8'
    );
    const translator = createJsonTranslator<EventFlow>(
      model,
      schema,
      'EventFlow'
    );

    const response = await translator.translate(input);

    if (response.success) {
      return response.data;
    } else {
      throw new Error('error');
    }
  }
}
