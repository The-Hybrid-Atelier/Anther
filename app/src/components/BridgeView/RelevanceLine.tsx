import { useMantineTheme } from "@mantine/core";

function RelevanceLine() {
  return (
    <div
      style={{
        width: "100%",
        height: "80%",
        display: "flex",
        padding: "8px",
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        justifySelf: "center",
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
        <div style={{ fontSize: "8px", textAlign: "center" }}>
          Most Relevant
        </div>
      </div>

      <div
        style={{
          width: "1px",
          height: "95%",
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
        <div style={{ fontSize: "8px", textAlign: "center" }}>
          Least Relevant
        </div>
      </div>
    </div>
  );
}

export default RelevanceLine;
