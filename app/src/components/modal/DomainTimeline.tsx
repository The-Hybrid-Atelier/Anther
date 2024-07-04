import { Text, Title, useMantineTheme } from "@mantine/core";
import { motion } from "framer-motion";
import TimelineBox from "./TimelineBox.tsx";
import TimelineAxis from "./TimelineAxis.tsx";
import { supabase } from "../../supabaseClient.ts";
import { ChartData } from "chart.js";
import { useEffect, useState } from "react";

interface DomainTimelineProps {
  domain: string;
  token: string;
  opened: boolean;
  activeBin: number;
  color: string;
  getQuotes: (val: number) => void;
}

function DomainTimeline({
  domain,
  token,
  opened,
  activeBin,
  color,
  getQuotes,
}: DomainTimelineProps) {
  const [chartData, setChartData] = useState<any>(null);
  const timelineContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const getTimeline = async () => {
    supabase
      .from("timeline_bins")
      .select("*")
      .eq("domain", domain.toLowerCase())
      .eq("token", token.toLowerCase())
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          //@ts-ignore
          const chartData = Object.entries(data[0])
            //@ts-ignore
            .filter(([key, value]) => key.includes("bin"))
            //@ts-ignore
            .map(([key, value]) => {
              //@ts-ignore
              return value / data[0].total;
            });
          console.log(chartData);
          const chart: ChartData = {
            datasets: [
              {
                data: chartData,
                label: domain,
                tension: 0.4,
              },
            ],
            labels: [
              "Bin 1",
              "Bin 2",
              "Bin 3",
              "Bin 4",
              "Bin 5",
              "Bin 6",
              "Bin 7",
              "Bin 8",
              "Bin 9",
              "Bin 10",
            ],
          };
          setChartData(chart);
        }
      });
  };

  useEffect(() => {
    if (opened) {
      getTimeline().then();
    }
  }, [opened, domain]);

  return (
    <div>
      <Title size={"h3"} sx={{ display: "flex", alignSelf: "end" }}>
        Domain Timeline
      </Title>
      <Text
        size={"xs"}
        sx={{ fontFamily: "Nunito" }}
        color={useMantineTheme().colors.gray[7]}
      >
        When "{token}" is most frequently mentioned in {domain} tutorials.
      </Text>
      <motion.div
        variants={timelineContainer}
        initial={"hidden"}
        animate={"show"}
        style={{
          height: "200px",
          display: "flex",
          padding: "8px",
          flexDirection: "row",
          flexWrap: "nowrap",
          justifyContent: "space-around",
          alignItems: "end",
          gap: "8px",
        }}
      >
        {chartData &&
          chartData.datasets &&
          chartData.datasets[0].data.map((dataPoint: number, index: number) => (
            <TimelineBox
              dataPoint={dataPoint}
              dataMax={chartData.datasets[0].data.reduce(
                (a: number, b: number) => Math.max(a, b),
              )}
              bin={index}
              activeBin={activeBin}
              getQuotes={getQuotes}
              color={color}
              key={[domain, token, "bin", index].join("-")}
            />
          ))}
      </motion.div>
      <TimelineAxis />
    </div>
  );
}

export default DomainTimeline;
