import {
  Accordion,
  Blockquote,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Video, VideoQuote } from "../../main.tsx";
import SmallLabelIcon from "../SmallLabelIcon.tsx";
import { IconEye, IconQuote, IconThumbUp } from "@tabler/icons-react";
import { supabase } from "../../supabaseClient.ts";
import { useEffect, useState } from "react";

interface QuoteVideoProps {
  video: Video;
  token: string;
  color: string;
}

function QuoteVideo({ video, token, color }: QuoteVideoProps) {
  const [videoState, setVideoState] = useState<Video>();
  const expandQuote = async (quote: VideoQuote) => {
    const data = await getAdditionalContext(quote);
    const updatedQuote = {
      ...quote,
      quote: data.before?.text + " " + quote.quote + " " + data.after?.text,
    };
    return updatedQuote;
  };

  const formatQuote = (quote: string) => {
    const words = quote.split(" ");
    return (
      <Text size={"xs"} ff={"Nunito"} p={0}>
        "...
        {words.map((word: string, index) => {
          if (word.includes(token)) {
            return (
              <Text
                color={color}
                component={"span"}
                fw={700}
                key={[word, index].join("-")}
              >
                {word}{" "}
              </Text>
            );
          } else {
            return word + " ";
          }
        })}
        ..."
      </Text>
    );
  };

  useEffect(() => {
    const updateQuotes = async () => {
      const formattedQuotes: VideoQuote[] = await Promise.all(
        video.quotes.map(async (quote: VideoQuote) => await expandQuote(quote)),
      );

      // Sort quotes by video_start
      formattedQuotes.sort((a: VideoQuote, b: VideoQuote) => {
        return a.video_start - b.video_start;
      });

      return formattedQuotes;
    };

    updateQuotes().then((formattedQuotes) => {
      setVideoState({ ...video, quotes: formattedQuotes });
    });
  }, []);

  const getAdditionalContext = async (quote: VideoQuote) => {
    const { data: beforeData, error: beforeError } = await supabase
      .from("quotes")
      .select("*")
      .eq("video_id", quote.video)
      .lt("start", quote.video_start)
      .order("start", { ascending: false })
      .limit(1);
    const { data: afterData, error: afterError } = await supabase
      .from("quotes")
      .select("*")
      .eq("video_id", quote.video)
      .gt("start", quote.video_start)
      .order("start", { ascending: true })
      .limit(1);
    let data: any = {};
    if (beforeData) {
      data["before"] = beforeData[0];
    }
    if (afterData) {
      data["after"] = afterData[0];
    }

    if (beforeError ?? afterError) {
      return "error";
    }

    return data;
  };

  function formatTimeStamp(quote: VideoQuote) {
    const quotient = Math.floor(quote.video_start / 60);
    const remainder = quote.video_start % 60;
    if (remainder === 0) {
      return `${quotient}:00`;
    } else if (remainder < 10) {
      return `${quotient}:0${remainder}`;
    } else {
      return `${quotient}:${remainder}`;
    }
  }

  const logVideoInteraction = async (quote: VideoQuote) => {
    const { data: sessionData, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
      return error;
    }
    if (sessionData.session) {
      const { data, error } = await supabase
        .from("user_video_log")
        .insert({
          user: sessionData.session.user?.id,
          video_id: quote.video,
          start: quote.video_start,
          quote: quote.quote,
        })
        .single();
      if (error) console.log(error);
      console.log(data);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        background: "#fafafa",
        borderRadius: "8px",
        padding: 8,
      }}
    >
      <Accordion
        variant="filled"
        radius="md"
        chevronPosition="left"
        defaultValue="customization"
      >
        <Accordion.Item value="customization">
          <Accordion.Control>
            <Text
              size={"sm"}
              sx={{ fontFamily: "Nunito" }}
              color={useMantineTheme().colors.gray[7]}
            >
              Video
            </Text>
            <Title size={"h6"}>{video.title}</Title>
            <Group>
              <div role={"tooltip"} aria-label={`${video.views} Views`}>
                <SmallLabelIcon
                  icon={<IconEye />}
                  label={video.views.toString()}
                />
              </div>
              <div role={"tooltip"} aria-label={`${video.likes} Likes`}>
                <SmallLabelIcon
                  icon={<IconThumbUp />}
                  label={video.likes.toString()}
                />
              </div>
            </Group>
            <Divider
              p={4}
              label={"Quotes"}
              labelPosition={"left"}
              labelProps={{ color: useMantineTheme().colors.gray[7] }}
            />
          </Accordion.Control>
          <Accordion.Panel>
            <Stack>
              {videoState ? (
                videoState.quotes.map((quote: VideoQuote, index) => (
                  <div
                    style={{ paddingLeft: "32px" }}
                    key={[quote.video, index].join("-")}
                  >
                    <Blockquote
                      sx={{
                        padding: "8px",
                        margin: 0,
                        borderRadius: "8px",
                      }}
                      cite={
                        <a
                          href={`https://youtu.be/${quote.video}?t=${quote.video_start}`}
                          color={"red"}
                          target={"_blank"}
                          onClick={() => logVideoInteraction(quote)}
                        >
                          {formatTimeStamp(quote)} - YouTube
                        </a>
                      }
                      icon={
                        <ThemeIcon
                          variant={"light"}
                          color={color}
                          radius={"md"}
                          size={"md"}
                        >
                          <IconQuote size="1rem" />
                        </ThemeIcon>
                      }
                    >
                      {videoState && formatQuote(quote.quote)}
                    </Blockquote>
                  </div>
                ))
              ) : (
                <div style={{ paddingLeft: "32px" }}>
                  <Loader variant={"dots"} size={"sm"} color={color} />
                </div>
              )}
            </Stack>
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
      {/*TODO: Add user comments*/}
      {/*<Group sx={{ paddingLeft: "42px" }}>*/}
      {/*  <Tooltip label={"Comment"}>*/}
      {/*    <ActionIcon size={"xs"}>*/}
      {/*      <IconMessage />*/}
      {/*    </ActionIcon>*/}
      {/*  </Tooltip>*/}
      {/*</Group>*/}
    </div>
  );
}

export default QuoteVideo;
