import { AutocompleteItem } from "@mantine/core";
import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient.ts";
import { Video, VideoQuote } from "../../main.tsx";
import ContextualQuotes from "./ContextualQuotes.tsx";
import DomainTimeline from "./DomainTimeline.tsx";
import AiInsight from "./AiInsight.tsx";
import ModalHeader from "./ModalHeader.tsx";

interface ModalContentsProps {
  token: string;
  domain: string;
  opened: boolean;
  color: string;
  updateModal: (domain: AutocompleteItem, oldDom: number) => void;
  index: number;
}

function ModalContents({
  token,
  domain,
  opened,
  color,
  updateModal,
  index,
}: ModalContentsProps) {
  // const [tags, setTags] = useState(["tool", "technique", "method", "concept"]);
  const [quotes, setQuotes] = useState<{ [video: string]: Video }>({});
  const [activeBin, setActiveBin] = useState<number>(0);

  const getQuotes = async (bin: number) => {
    const upperBound = (bin + 1) * 0.1;
    const lowerBound = bin * 0.1;
    setActiveBin(bin);
    const { data, error } = await supabase
      .rpc("get_quotes", {
        term: token,
        dom: domain,
        lowerbound: lowerBound,
        upperbound: upperBound,
      })
      .limit(50);
    if (data) {
      const videos: { [video: string]: Video } = {};
      data.forEach((quote: VideoQuote) => {
        console.log("Quote: ", quote);
        videos[quote.video] = {
          title: quote.video_title,
          quotes: data.filter((q: VideoQuote) => q.video === quote.video),
          id: quote.video,
          likes: quote.video_likes,
          views: quote.video_views,
        };
      });
      setQuotes(videos);
    }
    if (error) {
      console.log("Quote ERROR: ", error);
    }
  };

  useEffect(() => {
    if (opened) {
      getQuotes(0).then();
    }
  }, [opened, domain]);

  return (
    <div style={{ flex: 1, padding: "8px" }}>
      <div
        style={{
          display: "flex",
          flex: "row",
          justifyContent: "start",
          alignItems: "baseline",
        }}
      >
        <div style={{ margin: "8px" }}>
          <div aria-live={"polite"}>
            <ModalHeader
              token={token}
              domain={domain}
              color={color}
              updateModal={updateModal}
              index={index}
            />
            {/*TAGS MULTISELECT*/}
            {/*<MultiSelect*/}
            {/*  data={tags}*/}
            {/*  label={"Tags"}*/}
            {/*  role={"searchbox"}*/}
            {/*  aria-label={`${domain}-tags`}*/}
            {/*  id={`multi-select-${domain.split(" ").join("-")}`}*/}
            {/*  placeholder={"Add tags"}*/}
            {/*  sx={{*/}
            {/*    fontFamily: "Nunito",*/}
            {/*    border: "none",*/}
            {/*    backgroundColor: "transparent",*/}
            {/*    "&:focus": { border: "none" },*/}
            {/*  }}*/}
            {/*  nothingFound="Nothing found"*/}
            {/*  searchable*/}
            {/*  creatable*/}
            {/*  getCreateLabel={(query) => `+ ${query}`}*/}
            {/*  onCreate={(query) => {*/}
            {/*    const item = query;*/}
            {/*    setTags((current) => [...current, item]);*/}
            {/*    return item;*/}
            {/*  }}*/}
            {/*  icon={<IconTags />}*/}
            {/*  rightSection={<></>}*/}
            {/*/>*/}
          </div>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          height: "100%",
        }}
      >
        <AiInsight token={token} domain={domain} />
        <DomainTimeline
          domain={domain}
          token={token}
          opened={opened}
          activeBin={activeBin}
          color={color}
          getQuotes={getQuotes}
        />
        <ContextualQuotes token={token} quotes={quotes} color={color} />
      </div>
    </div>
  );
}

export default ModalContents;
