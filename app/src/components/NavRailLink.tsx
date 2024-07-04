import { ReactNode } from "react";
import { ActionIcon, Tooltip } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";

interface NavRailLinkProps {
  link: string;
  icon: ReactNode;
  label: string;
  color?: string;
  disabled?: boolean;
}
function NavRailLink({ link, icon, label, color, disabled }: NavRailLinkProps) {
  const navigate = useNavigate();
  // @ts-ignore unused variable
  const [opened, { close, open }] = useDisclosure(false);

  return (
    <Tooltip
      label={label}
      color={"dark"}
      radius={"sm"}
      transitionProps={{ transition: "slide-right", duration: 200 }}
      position={"right"}
      offset={10}
    >
      <ActionIcon
        variant={"light"}
        size={"lg"}
        color={color ? color : "blue"}
        onClick={() => navigate(link)}
        onMouseEnter={open}
        onMouseLeave={close}
        disabled={!!disabled}
        title={label}
      >
        {icon}
      </ActionIcon>
    </Tooltip>
  );
}

export default NavRailLink;
