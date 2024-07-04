import { ReactNode } from "react";
import { Group, Text, ThemeIcon, useMantineTheme } from "@mantine/core";

interface SmallLabelIconProps {
  icon: ReactNode;
  label: string;
  size?: string;
  color?: string;
}
function SmallLabelIcon({ icon, label, size, color }: SmallLabelIconProps) {
  return (
    <Group spacing={0}>
      <ThemeIcon
        size={size ? size : "xs"}
        variant={"light"}
        radius={"xl"}
        color={color ? color : "gray"}
      >
        {icon}
      </ThemeIcon>
      <Text
        size={size ? size : "xs"}
        color={useMantineTheme().colors.gray[7]}
        ff={"Nunito"}
      >
        {label}
      </Text>
    </Group>
  );
}

export default SmallLabelIcon;
