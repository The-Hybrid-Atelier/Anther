import {
  ActionIcon,
  Group,
  Paper,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconGrowth, IconSearch } from "@tabler/icons-react";

interface NavBarProps {
  setOpenSearch: () => void;
}
function NavBar({ setOpenSearch }: NavBarProps) {
  const theme = useMantineTheme();

  return (
    <Paper
      shadow={"xs"}
      style={{
        display: "flex",
        width: "100%",
        height: "54px",
        zIndex: 10,
        justifyContent: "space-between",
        alignContent: "center",
        padding: "8px 16px",
      }}
    >
      <Group>
        <IconGrowth size={32} color={theme.colors.gray[6]} />
        <Title
          size={"h2"}
          sx={(theme) => ({
            color: theme.colors.gray[6],
          })}
        >
          Anther
        </Title>
      </Group>
      <ActionIcon
        aria-label={"Search"}
        onClick={() => setOpenSearch()}
        size={"md"}
      >
        <IconSearch />
      </ActionIcon>
    </Paper>
  );
}

export default NavBar;
