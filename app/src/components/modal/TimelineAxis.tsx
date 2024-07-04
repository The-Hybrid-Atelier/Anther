import { Divider } from "@mantine/core";
import {
  IconClockHour10,
  IconClockHour2,
  IconClockHour5,
} from "@tabler/icons-react";
import SmallLabelIcon from "../SmallLabelIcon.tsx";

function TimelineAxis() {
  return (
    <div style={{ padding: "0 8px" }}>
      <Divider variant={"dotted"} />
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <SmallLabelIcon icon={<IconClockHour2 />} label={"Beginning"} />
        <SmallLabelIcon icon={<IconClockHour5 />} label={"Middle"} />
        <SmallLabelIcon icon={<IconClockHour10 />} label={"End"} />
      </div>
    </div>
  );
}

export default TimelineAxis;
