import {
  AutocompleteItem,
  Badge,
  Group,
  Loader,
  Menu,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { titleCase } from "../../helpers.ts";
import { supabase } from "../../supabaseClient.ts";
import { useEffect, useState } from "react";

interface ModalHeaderProps {
  token: string;
  domain: string;
  color: string;
  updateModal: (domain: AutocompleteItem, oldDom: number) => void;
  index: number;
}

type Mentions = {
  count: number;
  videos: number;
};

function ModalHeader({
  token,
  domain,
  color,
  updateModal,
  index,
}: ModalHeaderProps) {
  const [mentions, setMentions] = useState<Mentions>();
  const [totalVideos, setTotalVideos] = useState<number>();
  const [otherDomains, setOtherDomains] = useState<any>();
  const getMentions = async () => {
    const { data, error } = await supabase
      .from("token_stats")
      .select("*")
      .eq("token", token)
      .eq("domain", domain);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setMentions({ count: data[0].freq, videos: data[0].num_vids });
    }
  };

  const getVideoCount = async () => {
    const { data, error } = await supabase
      .from("videos_with_transcripts")
      .select("*")
      .eq("domain", domain);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data.length, "videos");
      setTotalVideos(data.length);
    }
  };

  const getOtherDomains = async () => {
    const { data, error } = await supabase
      .from("mat_token_tfpdf")
      .select("*")
      .eq("token", token);
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data.length, "Domains");

      // sort data alphabetically by domain
      setOtherDomains(data.sort((a: any, b: any) => (a.dom > b.dom ? 1 : -1)));
    }
  };

  const formatMentions = (mentions: Mentions) => {
    return (
      <Text color={useMantineTheme().colors.gray[7]} ff={"Nunito"} size={"sm"}>
        <Text component={"span"} fw={700} color={"dark"}>
          {mentions?.count}
        </Text>{" "}
        mentions in{" "}
        <Text component={"span"} fw={700} color={"dark"}>
          {mentions?.videos}
        </Text>{" "}
        videos
      </Text>
    );
  };

  const formatPercent = (total: number, mentions: Mentions) => {
    return (
      <Text color={useMantineTheme().colors.gray[7]} ff={"Nunito"} size={"xs"}>
        {Math.round((mentions.videos / total) * 100)}% of {domain} videos
      </Text>
    );
  };

  useEffect(() => {
    getMentions().then(() => console.log("Mentions", mentions));
    getVideoCount().then();
    getOtherDomains().then(() => console.log("Other Domains", otherDomains));
  }, []);

  return (
    <div>
      <Text
        size={"xs"}
        sx={{ fontFamily: "Nunito" }}
        color={useMantineTheme().colors.gray[7]}
      >
        Concept / Domain
      </Text>
      <Group align={"end"}>
        <Title size={"h1"} sx={{ display: "flex", alignSelf: "end" }}>
          {titleCase(token)}
        </Title>
        <Group
          sx={{ display: "flex", alignSelf: "center" }}
          spacing={4}
          w={400}
        >
          <Badge variant={"light"} radius={"xl"} size={"xs"} color={color}>
            {titleCase(domain)}
          </Badge>
          {otherDomains ? (
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Text
                  size={"sm"}
                  ff={"Nunito"}
                  underline
                  sx={{
                    borderRadius: "8px",
                    padding: "4px",
                    ":hover": {
                      cursor: "pointer",
                      background: useMantineTheme().colors.gray[9],
                      color: useMantineTheme().colors.gray[0],
                      transition: "all",
                      transitionDuration: "0.2s",
                    },
                  }}
                >
                  & {otherDomains.length - 1} other domains.
                </Text>
              </Menu.Target>

              <Menu.Dropdown sx={{ maxHeight: "200px", overflow: "scroll" }}>
                <Menu.Label>Domains</Menu.Label>
                {otherDomains.map((dom: any) => {
                  if (dom.dom !== domain) {
                    return (
                      <Menu.Item
                        key={dom.dom}
                        onClick={() => updateModal(dom, index)}
                      >
                        {titleCase(dom.dom)}
                      </Menu.Item>
                    );
                  }
                })}
              </Menu.Dropdown>
            </Menu>
          ) : (
            <Loader variant={"dots"} color={color} size={"sm"} />
          )}
        </Group>
      </Group>
      {mentions && formatMentions(mentions)}
      {totalVideos && mentions && formatPercent(totalVideos, mentions)}
    </div>
  );
}

export default ModalHeader;
