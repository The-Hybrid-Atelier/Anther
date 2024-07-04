import { supabase } from "../supabaseClient.ts";
// import { openai } from "../openAIClient.ts";
import { ConceptResp } from "../main.tsx";
import { useEffect, useState } from "react";
import { prompts } from "../prompts.ts";
import { openai } from "../openAIClient.ts";
import {
  Button,
  Flex,
  SegmentedControl,
  Select,
  TextInput,
} from "@mantine/core";

function Tagging() {
  // const [tags, setTags] = useState<
  //   { category: string; domain: string; concept: string }[]
  // >([]);
  const [domain, setDomain] = useState<string | null>("");
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [range, setRange] = useState<string>("49");
  const [domainList, setDomainList] = useState<string[]>([]);

  const fetchDomains = async () => {
    const { data, error } = await supabase
      .from("domains")
      .select("*")
      .eq("display", true);
    if (error) {
      console.log(error);
    }
    if (data) {
      const domains = data.map((d: any) => d.title);
      setDomainList(domains);
    }
  };

  const getAIClassification = async (
    arr: { category: string; domain: string; concept: string }[],
  ) => {
    const chat_completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompts.CLASSIFY_CONCEPT(arr),
        },
      ],
    });
    return chat_completion?.data?.choices[0]?.message?.content;
  };

  const insertConcepts = async (classifications: string) => {
    try {
      const objects = JSON.parse(classifications);
      if (objects) {
        const { data, error } = await supabase
          .from("new_ai_tags")
          .upsert(objects);
        if (data) {
          console.log(data);
        } else {
          console.log(error);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const fetchConcepts = async (
    domain: string,
    category: string,
    range: number,
  ) => {
    const { data, error }: ConceptResp = await supabase
      .from("stats_and_tfpdf")
      .select("*")
      .eq("domain", domain)
      .order("tfpdf", { ascending: false })
      .range(range - 49, range);

    if (error) {
      console.log(error);
    }

    if (data) {
      const concepts: { concept: string; domain: string; category: string }[] =
        data.map((d: any) => ({
          concept: d.token,
          domain: d.domain,
          category: category,
        }));
      console.log(concepts);
      return concepts;
    }
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  // useEffect(() => {
  //   if (tags.length > 0 && aiResponse === undefined) {
  //     getAIClassification(tags).then(() => {
  //       console.log("AI Classification Done");
  //       insertConcepts();
  //     });
  //   }
  // }, [tags]);
  //
  // useEffect(() => {
  //   if (aiResponse) {
  //     insertConcepts();
  //   }
  // }, [aiResponse]);

  function handleSubmit() {
    setLoading(true);
    if (domain && category) {
      fetchConcepts(domain, category, 49).then((concepts) => {
        console.log("Concepts Fetched");
        if (concepts) {
          getAIClassification(concepts).then((classifications) => {
            console.log("AI Classification Done");
            console.log(classifications);
            if (classifications) {
              insertConcepts(classifications).then(() => {
                console.log("Concepts Inserted");
                setLoading(false);
              });
            }
          });
        }
      });
      fetchConcepts(domain, category, 99).then((concepts) => {
        console.log("Concepts Fetched");
        if (concepts) {
          getAIClassification(concepts).then((classifications) => {
            console.log("AI Classification Done");
            console.log(classifications);
            if (classifications) {
              insertConcepts(classifications).then(() => {
                console.log("Concepts Inserted");
                setLoading(false);
              });
            }
          });
        }
      });
      fetchConcepts(domain, category, 149).then((concepts) => {
        console.log("Concepts Fetched");
        if (concepts) {
          getAIClassification(concepts).then((classifications) => {
            console.log("AI Classification Done");
            console.log(classifications);
            if (classifications) {
              insertConcepts(classifications).then(() => {
                console.log("Concepts Inserted");
                setLoading(false);
              });
            }
          });
        }
      });
    }
  }

  return (
    domainList.length > 0 && (
      <Flex gap={4} direction={"column"} justify={"space-around"} w={"50%"}>
        {/*<TextInput*/}
        {/*  value={domain}*/}
        {/*  onChange={(e) => setDomain(e.currentTarget.value)}*/}
        {/*/>*/}
        <Select
          label={"Domain"}
          data={domainList}
          value={domain}
          onChange={setDomain}
          placeholder={"Select Domain"}
        />

        <TextInput
          label={"Category"}
          value={category}
          onChange={(e) => setCategory(e.currentTarget.value)}
        />
        <SegmentedControl
          data={["49", "99", "149"]}
          value={range}
          onChange={setRange}
        />
        <Button onClick={() => handleSubmit()} loading={loading}>
          Submit
        </Button>
        {/*{ aiResponse ?*/}
        {/*  {Object.entries(JSON.parse(aiResponse)).map(([key, value]) => (*/}
        {/*    <div>*/}
        {/*      {value.domain} - {value.concept} - {value.class}*/}
        {/*    </div>*/}
        {/*  ))} :*/}
        {/*  <Loader size={"sm"} color={"teal"} />*/}
        {/*}*/}
      </Flex>
    )
  );
}

export default Tagging;
