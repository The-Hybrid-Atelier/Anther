import { Text, Title, useMantineTheme } from "@mantine/core";
import { motion } from "framer-motion";
import QuoteVideo from "./QuoteVideo.tsx";
import { Video } from "../../main.tsx";

interface ContextualQuotesProps {
  token: string;
  quotes: { [video: string]: Video };
  color: string;
}

function ContextualQuotes({ token, quotes, color }: ContextualQuotesProps) {
  return (
    <div>
      <Title size={"h3"} sx={{ display: "flex", alignSelf: "end" }}>
        Contextual Quotes
      </Title>
      <Text
        size={"xs"}
        sx={{ fontFamily: "Nunito" }}
        color={useMantineTheme().colors.gray[7]}
      >
        Click a bar above to see quotes about "{token}" from that point in the
        videos.
      </Text>
      <motion.div
        style={{
          height: "200px",
          display: "flex",
          padding: "8px",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-around",
          alignItems: "baseline",
          gap: "8px",
        }}
      >
        {Object.entries(quotes).length > 0 &&
          Object.entries(quotes).map(([key, video]) => (
            <QuoteVideo video={video} key={key} token={token} color={color} />
          ))}
      </motion.div>
    </div>
  );
}

export default ContextualQuotes;
