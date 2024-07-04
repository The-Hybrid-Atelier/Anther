import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient.ts";
import { ConceptPoint, ConceptResp } from "../main.tsx";
import {
  Title,
  Text,
  Loader,
  Container,
  LoadingOverlay,
  Modal,
  useMantineTheme,
  ThemeIcon,
  Stack,
  AutocompleteItem,
} from "@mantine/core";
import { titleCase } from "../helpers.ts";
import ConceptBadge from "../components/ConceptBadge.tsx";
import { IconBuildingBridge } from "@tabler/icons-react";
import ModalContents from "../components/modal/ModalContents.tsx";
import { useDisclosure } from "@mantine/hooks";
import DomainDensityLine from "../components/BridgeView/DomainDensityLine.tsx";
import RelevanceLine from "../components/BridgeView/RelevanceLine.tsx";

//TODO: Filtering by tags for material, technique, tool.
// Icons: Tool -> Hammer/HammerOff, Technique -> Pour or UserHeart, Material -> BottleFilled/BottleOff

function Compare() {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalSelection, setModalSelection] = useState<{
    concept: ConceptPoint;
    domains: string[];
  }>();
  const [searchParams] = useSearchParams();
  const [domainOne, setDomainOne] = useState<string | null>(null);
  const [domainTwo, setDomainTwo] = useState<string | null>(null);
  const [domOneConcepts, setDomOneConcepts] = useState<ConceptPoint[]>([]);
  const [domTwoConcepts, setDomTwoConcepts] = useState<ConceptPoint[]>([]);
  const [doubles, setDoubles] = useState<boolean>(false);
  const [conceptPoints, setConceptPoints] = useState<ConceptPoint[]>([]);
  const [similarity, setSimilarity] = useState<number | null>(null);
  const numConcepts = 30;

  function handleItemSelect(item: AutocompleteItem, domainSelected: number) {
    // Determine which domain is being replaced in the case of a 2 domain modal.
    if (item.dom === domainOne ?? item.dom === domainTwo) {
      return;
    }
    if (modalSelection) {
      if (modalSelection.domains.length === 1) {
        setModalSelection({
          ...modalSelection,
          domains: [item.dom],
        });
      } else if (domainSelected === 0) {
        setModalSelection({
          ...modalSelection,
          domains: [item.dom, modalSelection.domains[1]],
        });
      } else if (domainSelected === 1) {
        // Update first indice of modalSelection.domains to the new domain.
        setModalSelection({
          ...modalSelection,
          domains: [modalSelection.domains[0], item.dom],
        });
      }
    }
  }
  const fetchConcepts = async (domain: string): Promise<ConceptResp> => {
    const { data, error }: ConceptResp = await supabase
      .from("stats_and_tfpdf")
      .select("*")
      .eq("domain", domain)
      .order("tfpdf", { ascending: false })
      .range(0, numConcepts);
    return { data, error };
  };

  const fetchBins = async (
    domain: string,
    data: ConceptPoint[],
  ): Promise<ConceptPoint[]> => {
    const otherQuery = await supabase
      .from("timeline_bins")
      .select("*")
      .in(
        "token",
        data.map((concept) => concept.token),
      )
      .eq("domain", domain);

    if (otherQuery.data) {
      const updatedData = data.map((concept) => {
        const bins = otherQuery.data.filter(
          (bin) => concept.token === bin.token && concept.domain === bin.domain,
        );
        return { ...concept, ...bins[0] };
      });

      return updatedData;
    } else {
      console.log("ERROR: No bins");
      return data;
    }
  };

  const calculateSimilarity = () => {
    const concepts = [...domOneConcepts, ...domTwoConcepts];
    const matches = concepts.filter((concept) => {
      const matchingConcept = concepts.find(
        (con) => con.token === concept.token && con.domain !== concept.domain,
      );
      if (typeof matchingConcept !== "undefined") {
        return matchingConcept;
      }
    });
    console.log("Matches: ", matches);
    console.log("Similarity: ", matches.length / 2 / numConcepts);
    setSimilarity(matches.length / 2 / numConcepts);
  };

  const calculateCoords = async (cons: ConceptPoint[]) => {
    const getYAxis = (concept: ConceptPoint) => {
      const filteredConcepts = cons
        .slice(0, numConcepts)
        .filter((con) => con.domain === concept.domain);
      const max = Math.max(
        ...filteredConcepts.map((concept) => 1 / concept.tfpdf),
      );
      const min = Math.min(
        ...filteredConcepts.map((concept) => 1 / concept.tfpdf),
      );
      const result = (1 / concept.tfpdf - min) / (max - min);
      if (result) return result;
      else return 0.001;
    };

    const getXAxis = (concept: ConceptPoint) => {
      const bins = Object.entries(concept)
        // @ts-ignore
        .filter(([key, value]) => key.includes("bin"))
        // @ts-ignore
        .map(([key, value]: [key: string, value: number]) => value);
      const max = Math.max(...bins);
      const countBins = bins.filter((bin) => bin > max / 3).length;
      console.log("Concept: ", concept.token, "Gravity: ", countBins);

      if (concept.domain === domainOne) {
        const result = (1 - countBins / bins.length) / 2;
        if (result) return result;
        else return 0.001;
      } else {
        const result = countBins / bins.length / 2 + 0.5;
        if (result) return result;
        else return 0.001;
      }
    };

    const updatedConcepts = cons.map((concept) => {
      return {
        ...concept,
        domains: [concept.domain],
        y: getYAxis(concept),
        x: getXAxis(concept),
        color: concept.domain === domainOne ? "blue" : "red",
      };
    });

    console.log("Updated: ", updatedConcepts);
    return updatedConcepts;
  };

  function removeDuplicateConcepts(
    conceptPoints: ConceptPoint[],
  ): ConceptPoint[] {
    const tokenCounts: { [token: string]: number } = {};

    const filteredConceptPoints = conceptPoints.filter((conceptPoint) => {
      if (!tokenCounts[conceptPoint.token]) {
        tokenCounts[conceptPoint.token] = 1;
        return true;
      } else {
        tokenCounts[conceptPoint.token]++;
        if (tokenCounts[conceptPoint.token] === 2) {
          const firstOccurrence = conceptPoints.find(
            (cp) => cp.token === conceptPoint.token,
          );
          if (firstOccurrence) {
            firstOccurrence.domains.push(conceptPoint.domain);
            firstOccurrence.x = (firstOccurrence.x + conceptPoint.x) / 2;
            firstOccurrence.y = (firstOccurrence.y + conceptPoint.y) / 2;
            firstOccurrence.color = "teal";
          }
        }
        return false;
      }
    });
    console.log("filteredConceptPoints: ", filteredConceptPoints);
    return filteredConceptPoints;
  }

  const getKeyword = () => {
    if (similarity) {
      if (similarity <= 0) return "not";
      if (similarity <= 0.15) return "not very";
      if (similarity <= 0.3) return "somewhat";
      if (similarity <= 0.45) return "";
      else {
        return "very";
      }
    }
  };

  const fetchDomain = async (domain: string) => {
    const { data, error } = await fetchConcepts(domain);
    if (data) {
      if (domain === domainOne) {
        const bins = await fetchBins(domain, data);
        setDomOneConcepts(bins);
      } else {
        const bins = await fetchBins(domain, data);
        setDomTwoConcepts(bins);
      }
    }
    if (error) {
      console.log(error);
    }
  };

  const updateDomain = async (domainArr: ConceptPoint[]) => {
    const points = await calculateCoords(domainArr.slice(0, numConcepts));
    setConceptPoints((conceptPoints: ConceptPoint[]) => [
      ...conceptPoints,
      ...points,
    ]);
  };

  useEffect(() => {
    setDomainOne(searchParams.get("domainOne"));
    setDomainTwo(searchParams.get("domainTwo"));
  }, [searchParams]);

  // Fetch concepts for each domain.
  useEffect(() => {
    if (domainOne && domainTwo) {
      fetchDomain(domainOne).then(() => {
        fetchDomain(domainTwo);
      });
    }
  }, [domainOne, domainTwo]);

  useEffect(() => {
    if (domTwoConcepts.length > 0) {
      if (!similarity) calculateSimilarity();
      if (conceptPoints.length === 0) {
        updateDomain(domOneConcepts).then(() => {
          updateDomain(domTwoConcepts).then(() => {
            setDoubles(false);
          });
        });
      }
    }
  }, [domTwoConcepts]);

  useEffect(() => {
    if (domOneConcepts.length > 0) {
      if (!Object.keys(domOneConcepts[0]).includes("bin1")) {
        console.log("NO BINS");
        // fetchBins(domainOne, domOneConcepts)
      }
    }
  }, [domOneConcepts, domTwoConcepts]);

  useEffect(() => {
    if (!doubles) {
      setConceptPoints(removeDuplicateConcepts(conceptPoints));
      setDoubles(true);
    }
  }, [conceptPoints]);

  useEffect(() => {
    console.log("Modal Selection: ", modalSelection);
    const logInteraction = async () => {
      // Get logged-in user from supabase session:
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (error) {
        console.log(error);
        return error;
      }
      if (sessionData.session) {
        console.log(sessionData);
        console.log(sessionData.session.user?.id);
        const { data, error } = await supabase.from("user_concept_log").insert({
          user: sessionData.session.user?.id,
          token: modalSelection?.concept.token,
          domains: modalSelection?.domains,
        });
        if (error) console.log(error);
        if (data) console.log(data);
      }
    };

    logInteraction().then();
  }, [modalSelection]);

  useEffect(() => {}, [domOneConcepts, domTwoConcepts]);

  useEffect(() => {
    console.log("Concept Points : ", conceptPoints);
  }, [conceptPoints]);

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        size={"90%"}
        withCloseButton={false}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {modalSelection?.domains &&
            modalSelection?.domains.map((domain, index) => (
              <ModalContents
                updateModal={handleItemSelect}
                key={domain + "-" + index}
                index={index}
                token={modalSelection.concept.token}
                domain={domain}
                color={domain === domainOne ? "blue" : "pink"}
                opened={opened}
              />
            ))}
        </div>
      </Modal>

      <Container fluid h={"100%"}>
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            gap: "8px",
            alignItems: "baseline",
          }}
        >
          <Title size={"h3"}>ComparisonView</Title>
          <Title size={"h5"} color={"dimmed"} ff={"Nunito"}>
            These domains are {similarity ? getKeyword() : <Loader size={16} />}{" "}
            similar.
          </Title>
        </div>
        <div
          style={{
            marginTop: "8px",
            display: "flex",
            flexDirection: "row",
            background: "#f0f0f0",
            borderRadius: "16px",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            height: "90%",
            position: "relative",
          }}
        >
          <RelevanceLine />
          <div
            style={{
              marginTop: "8px",
              display: "flex",
              flexDirection: "column",
              padding: "32px 8px",
              borderRadius: "16px",
              justifyContent: "space-around",
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            {domainOne && domainTwo && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  height: "80%",
                  width: "100%",
                  flex: 0,
                }}
              >
                <div style={{ width: "100%" }}>
                  <Text
                    size={"sm"}
                    sx={{ fontFamily: "Nunito" }}
                    color={useMantineTheme().colors.gray[7]}
                  >
                    Domain
                  </Text>
                  <Title size={"h3"}>{titleCase(domainOne)}</Title>
                </div>
                <div style={{ width: "100%", textAlign: "center" }}>
                  <Text
                    size={"sm"}
                    sx={{ fontFamily: "Nunito" }}
                    color={useMantineTheme().colors.gray[7]}
                  >
                    Bridge Words
                  </Text>
                  <Title size={"h3"} style={{ textAlign: "center" }}>
                    Both
                  </Title>
                </div>
                <div style={{ textAlign: "right", width: "100%" }}>
                  <Text
                    size={"sm"}
                    sx={{ fontFamily: "Nunito" }}
                    color={useMantineTheme().colors.gray[7]}
                  >
                    Domain
                  </Text>
                  <Title size={"h3"}>{titleCase(domainTwo)}</Title>
                </div>
              </div>
            )}
            <div
              style={{
                width: "100%",
                margin: "16px",
                height: "100%",
                position: "relative",
                alignSelf: "center",
                flex: 1,
                border: `${useMantineTheme().colors.gray[4]} 2px solid`,
              }}
              id={"badgeContainer"}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  top: 0,
                  left: 0,
                }}
              >
                <div
                  style={{
                    borderRight: `2px dashed ${
                      useMantineTheme().colors.gray[4]
                    }`,
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
                <div
                  style={{
                    borderRight: `2px dashed ${
                      useMantineTheme().colors.gray[4]
                    }`,
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                  }}
                ></div>
              </div>
              <LoadingOverlay
                loaderProps={{ color: "blue" }}
                sx={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                  height: "100%",
                }}
                overlayOpacity={0.3}
                overlayColor="#ffffff"
                visible={conceptPoints.length === 0}
              />
              {domainTwo &&
                doubles &&
                conceptPoints.map((concept) => {
                  return (
                    <ConceptBadge
                      key={concept.token + "-" + concept.domain}
                      open={open}
                      setModalSelection={setModalSelection}
                      concept={concept}
                      domains={concept.domains}
                    />
                  );
                })}
            </div>
            <div
              style={{
                width: "100%",
                height: "32px",
                display: "flex",
                alignSelf: "center",
                justifyContent: "space-around",
              }}
            >
              <DomainDensityLine color={"blue"} />
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  padding: "8px",
                  flex: 1,
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Stack spacing={0} align={"center"}>
                  <ThemeIcon
                    size={"sm"}
                    variant={"light"}
                    radius={"xl"}
                    color={"teal"}
                  >
                    <IconBuildingBridge />
                  </ThemeIcon>
                  <Text
                    size={"xs"}
                    ff={"Nunito"}
                    color={useMantineTheme().colors.gray[7]}
                  >
                    (Avg. position of both domains)
                  </Text>
                </Stack>
              </div>
              <DomainDensityLine color={"pink"} reverse />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
}

export default Compare;
