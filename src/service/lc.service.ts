import { App, Provide } from '@midwayjs/core';

import { PromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';
import { OpenAI } from '@langchain/openai';
import * as koa from '@midwayjs/koa';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { StructuredOutputParser } from 'langchain/output_parsers';
import { schema } from './model';

dotenv.config();

@Provide()
export class AIService {
  @App()
  koaApp: koa.Application;

  async formatInputToEventFlows(input: string) {
    const parser = StructuredOutputParser.fromZodSchema(schema);

    const chain = RunnableSequence.from([
      PromptTemplate.fromTemplate(
        fs
          .readFileSync(this.koaApp.getAppDir() + '/template.txt', 'utf-8')
          .toString()
      ),
      new OpenAI({
        temperature: 0.5,
        modelName: 'gpt-3.5-turbo',
        configuration: {
          // openapi 代理地址
          baseURL: process.env.OPENAI_ENDPOINT,
          // api key
          apiKey: process.env.OPENAI_API_KEY,
        },
      }),
      parser,
    ]);

    console.log(parser.getFormatInstructions());

    const response = await chain.invoke({
      desc: input,
      format_instructions: parser.getFormatInstructions(),
    });

    return response;
  }
}
