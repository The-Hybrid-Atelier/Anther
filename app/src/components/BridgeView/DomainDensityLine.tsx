import SmallLabelIcon from "../SmallLabelIcon.tsx";
import { IconCircleDotted, IconCircleFilled } from "@tabler/icons-react";
import { useMantineTheme } from "@mantine/core";

interface DomainDensityLineProps {
  color?: string;
  reverse?: boolean;
}
function DomainDensityLine({ color, reverse }: DomainDensityLineProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: "8px",
        flex: 1,
        flexDirection: reverse ? "row-reverse" : "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "30%",
        }}
      >
        <SmallLabelIcon
          icon={<IconCircleFilled />}
          label={"Core"}
          color={color ? color : "gray"}
          size={"sm"}
        />
      </div>

      <div
        style={{
          width: "95%",
          height: "1px",
          background: useMantineTheme().colors.gray[3],
          justifySelf: "center",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "30%",
        }}
      >
        <SmallLabelIcon
          icon={<IconCircleDotted />}
          label={"Fringe"}
          color={color ? color : "gray"}
          size={"sm"}
        />
      </div>
    </div>
  );
}

export default DomainDensityLine;
