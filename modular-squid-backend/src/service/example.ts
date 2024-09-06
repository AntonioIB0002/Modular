import { SquidService } from '@squidcloud/backend';
import { Get, Query, Route } from 'tsoa';

@Route('example')
export class ExampleSer extends SquidService {
  @Get('echo')
  echo(@Query() message: string): Promise<string> {
    console.log("hola"); 
    return this.createOpenApiResponse(message, 200);
  }
}
