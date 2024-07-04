import { motion } from "framer-motion";
import { useMantineTheme } from "@mantine/core";
import { useEffect, useState } from "react";

interface TimlineBoxProps {
  dataPoint: number;
  dataMax: number;
  bin: number;
  getQuotes: (val: number) => void;
  activeBin: number;
  color: string;
}
function TimelineBox({
  dataPoint,
  dataMax,
  getQuotes,
  bin,
  activeBin,
  color,
}: TimlineBoxProps) {
  const theme = useMantineTheme();
  // @ts-ignore
  const [background, setBackground] = useState<string>("#f0f0f0");

  const timelineBox = {
    hidden: { height: 0 },
    show: { height: `${Math.round((dataPoint / dataMax) * 100)}%` },
    active: (state: boolean) => ({
      background: state ? theme.colors[color][9] : theme.colors.gray[3],
    }),
  };

  useEffect(() => {
    if (bin === activeBin) {
      setBackground(theme.colors[color][9]);
    } else {
      setBackground(theme.colors.gray[3]);
    }
  }, [activeBin]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>, bin: number) {
    if (e.key === "Enter") {
      getQuotes(bin);
    }
  }

  return (
    <motion.div
      onClick={() => getQuotes(bin)}
      onKeyDown={(e) => handleKeyDown(e, bin)}
      custom={bin === activeBin}
      style={{
        flex: 1,
        borderRadius: "8px",
        position: "relative",
        boxSizing: "border-box",
        border: `solid 3px ${theme.colors[color][9]}`,
      }}
      variants={timelineBox}
      animate={["show", "active"]}
      role={"meter"}
      aria-valuenow={Math.round(dataPoint * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={`Timeline bin ${bin + 1} with ${Math.round(
        dataPoint * 100,
      )}% frequency - ${activeBin === bin ? "Active" : ""}`}
      whileHover={{
        background: theme.colors[color][4],
        border: `solid 6px ${theme.colors[color][9]}`,
        scale: 1.1,
      }}
      whileTap={{ scale: 0.9 }}
    />
  );
}

export default TimelineBox;
