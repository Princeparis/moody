import { get } from "http";
import { OpenAI } from "langchain/llms/openai";
import { StructuredOutputParser } from "langchain/output_parsers";
import { PromptTemplate } from "langchain/prompts";
import z from "zod";

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe("the mood of the person who wrote the journal entry."),
    summary: z.string().describe("quick summary of the entire entry."),
    negative: z
      .boolean()
      .describe(
        "is the journal entry negative? (i.e. does it contain negative emotions?)."
      ),
    subject: z.string().describe("the subject of the journal entry."),
    color: z
      .string()
      .describe(
        "a hexidecimal color code that represents the mood of the entry. Example #0101fe for blue representing happiness."
      ),
  })
);

const getPrompt = async (content: string) => {
  const formattedInstruction = parser.getFormatInstructions();
  const prompt = new PromptTemplate({
    template:
      "Analyze the following journal entry. Follow the intructions and format your response to match the format instructions, no matter what! \n{formattedInstruction}\n{entry}",
    inputVariables: ["entry"],
    partialVariables: { formattedInstruction },
  });

  const input = await prompt.format({
    entry: content,
  });
  return input;
};
export const analyze = async (content: string) => {
  const input = await getPrompt(content);
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.call(input);
  try {
    return parser.parse(result);
  } catch (error: Error | any) {
    console.log(error.messaage);
    return null;
  }
};
