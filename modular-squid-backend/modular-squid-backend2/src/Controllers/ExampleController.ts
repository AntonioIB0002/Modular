import { Get, Query, Route, Post, Body, Controller } from 'tsoa';
import { Example } from '../service/example';

interface InputData {
  message: string;
}

@Route('example')
export class ExampleController extends Controller {
  private exampleService: Example;

  constructor() {
    super();
    this.exampleService = new Example();
  }

  @Get('echo')
  async echo(@Query() message: string): Promise<string> {
    console.log("Message received:", message); 
    return this.exampleService.createOpenApiResponse(message, 200);
  }

  @Post('submit')
  async submit(@Body() data: InputData): Promise<string> {
    const { message } = data;
    console.log("Data received:", data);

    try {
      const sentimentResult = await this.exampleService.analyzeSentiment(message);
      console.log("Sentiment analysis result:", sentimentResult);

      return this.exampleService.createOpenApiResponse(`Sentiment: ${sentimentResult}`, 200);
    } catch (error) {
      console.error("Error during sentiment analysis:", error);
      return this.exampleService.createOpenApiResponse("Error during sentiment analysis", 500);
    }
  }
}
