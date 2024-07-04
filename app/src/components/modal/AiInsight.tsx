import { Loader, Stack, Text, useMantineTheme } from "@mantine/core";
import { openai } from "../../openAIClient.ts";
import { prompts } from "../../prompts.ts";
import { useEffect, useState } from "react";

interface AiInsightProps {
  token: string;
  domain: string;
}
function AiInsight({ token, domain }: AiInsightProps) {
  const [aiResponse, setAiResponse] = useState<string | undefined>();
  const getAISummary = async () => {
    const chat_completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: prompts.MODAL_INSIGHT(token, domain),
        },
      ],
    });
    setAiResponse(chat_completion?.data?.choices[0]?.message?.content);
  };

  useEffect(() => {
    getAISummary().then(() => console.log("AI Insight"));
  }, []);

  return (
    <Stack style={{ margin: "8px 0px", height: "100px" }} data-autofocus>
      <Text
        size={"xs"}
        sx={{ fontFamily: "Nunito" }}
        color={useMantineTheme().colors.gray[7]}
      >
        AI Insight
      </Text>
      {aiResponse ? (
        <Text size={"sm"} style={{ fontFamily: "Nunito" }} color={"dark"}>
          {aiResponse}
        </Text>
      ) : (
        <Loader size={"sm"} color={"teal"} />
      )}
    </Stack>
  );
}

export default AiInsight;
