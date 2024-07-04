import { ActionIcon, Divider, Paper, Stack, Tooltip } from "@mantine/core";
import NavRailLink from "./NavRailLink.tsx";
import { IconChartCircles, IconLogin, IconLogout } from "@tabler/icons-react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../supabaseClient.ts";
import { useNavigate } from "react-router-dom";

interface NavRailProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

function NavRail({ user, setUser }: NavRailProps) {
  const navigate = useNavigate();

  const links = [
    { label: "Compare", icon: <IconChartCircles />, link: "/" },
    // {
    //   label: "Tags",
    //   icon: <IconTag />,
    //   link: "/tags",
    //   color: "cyan",
    //   disabled: !user,
    // },
  ];

  function handleAuthentication() {
    if (user) {
      supabase.auth.signOut().then(() => {
        setUser(null);
      });
    } else {
      navigate("/login");
    }
  }

  return (
    <Paper
      p="md"
      className={"navRail"}
      radius={0}
      shadow={"xs"}
      sx={(theme) => ({ backgroundColor: theme.colors.gray[0] })}
    >
      <Stack>
        {links.map((link) => (
          <NavRailLink
            key={link.label}
            link={link.link}
            icon={link.icon}
            label={link.label}
            // disabled={link.disabled}
            // color={link.color}
          />
        ))}
      </Stack>
      <Stack>
        <Divider />
        <Tooltip
          label={user ? "Logout" : "Login"}
          color={"dark"}
          radius={"sm"}
          transitionProps={{ transition: "slide-right", duration: 200 }}
          position={"right"}
          offset={10}
        >
          <ActionIcon
            variant={"subtle"}
            color={"gray"}
            size={"lg"}
            onClick={() => handleAuthentication()}
            title={user ? "Logout" : "Login"}
          >
            {user ? <IconLogout /> : <IconLogin />}
          </ActionIcon>
        </Tooltip>
      </Stack>
    </Paper>
  );
}

export default NavRail;
