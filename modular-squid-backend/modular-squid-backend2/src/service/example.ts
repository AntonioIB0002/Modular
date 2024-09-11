import { SquidService } from '@squidcloud/backend';
import { Get, Query, Route, Post, Body } from 'tsoa';
import express from 'express';
import bodyParser from 'body-parser';

// Define the interface for the input data
interface InputData {
  message: string;
}

// Initialize the express app and configure it
const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON bodies

// Define the task and model for sentiment analysis
const task = 'sentiment-analysis';
const model = 'Xenova/distilbert-base-uncased-finetuned-sst-2-english';

// Define the service for the 'example' route
@Route('example')
export class ExampleSer extends SquidService {
  @Get('echo')
  echo(@Query() message: string): Promise<string> {
    console.log("Message received:", message); 
    return this.createOpenApiResponse(message, 200);
  }
}

// Define the service for the 'test' route
@Route('test')
export class ExampleServic extends SquidService {
  @Post('submit')
  async submit(@Body() data: InputData): Promise<string> {
    const { message } = data;
    console.log("Data received:", data);

    try {
      // Dynamically import @xenova/transformers
      const { pipeline } = await import('@xenova/transformers');
      const sentimentPipeline = await pipeline(task, model);
      const result = await sentimentPipeline(message); // Analyzing sentiment of the message
      console.log("Sentiment analysis result:", result);

      // Return the response with sentiment analysis result
      return this.createOpenApiResponse(`Sentiment: ${result}`, 200);
    } catch (error) {
      console.error("Error during sentiment analysis:", error);
      return this.createOpenApiResponse("Error during sentiment analysis", 500);
    }
  }
}

// Export the express app for use in your application
export default app;
