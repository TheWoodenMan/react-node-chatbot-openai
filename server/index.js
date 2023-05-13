// modules
import express from "express";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import cors from "cors";
import logger from "morgan";
import bodyParser from "body-parser";

// initialise modules
dotenv.config();
const app = express();

// express middleware
app.use(bodyParser.json());
app.use(cors());
app.use(logger("dev"));

// initialise the openai config
const configuration = new Configuration({
	organization: process.env.NODE_ORG,
	apiKey: process.env.NODE_APIKEY
});

const prompt = process.env.PROMPT;

// // create a new instance of openai config
const openai = new OpenAIApi(configuration);

// send a post request to the openai api with the latest chat history, append the prompt to the front of that

app.post("/", async (request, response) => {
	const { chats } = request.body;
  
	const result = await openai.createChatCompletion({
	model: "gpt-3.5-turbo",
	messages: [
		{
		role: "system",
		content: prompt,
		},
		...chats,
	],
	});
  
	response.json({
	output: result.data.choices[0].message,
	});
  });

app.listen(process.env.PORT, () => {
	console.log(`Server is running on port: ${process.env.PORT}`);
});
