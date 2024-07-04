import { Button, Divider, Group, ThemeIcon, Title } from "@mantine/core";
import { titleCase } from "../helpers.ts";
import { Domain } from "../main.tsx";

interface CategoryProps {
  category: any;
  domains: Domain[];
  selected: string[];
  handleBadgeSelect: (value: string) => void;
}
function CategoryGroup({
  category,
  domains,
  selected,
  handleBadgeSelect,
}: CategoryProps) {
  return (
    <div
      key={category.value}
      style={{
        background: "#ffffff",
        padding: "8px",
        borderRadius: "8px",
        width: "400px",
      }}
    >
      <Group>
        <ThemeIcon
          variant={"light"}
          size={"lg"}
          radius={"lg"}
          color={category.color}
          onClick={() => null}
          sx={{ ":hover": {} }}
        >
          {category.icon}
        </ThemeIcon>
        <Title size={"h5"}>{category.label}</Title>
      </Group>
      <Divider m={8} aria-label={"Separator"} />
      <Group>
        {domains
          .filter((domain) => domain.group === category.value)
          .map((domain) => (
            <Button
              variant={selected.includes(domain.value) ? "filled" : "light"}
              size={"sm"}
              radius={"lg"}
              key={category.label + domain.value}
              onClick={() => handleBadgeSelect(domain.value)}
              color={category.color}
            >
              {titleCase(domain.value)}
            </Button>
          ))}
      </Group>
    </div>
  );
}

export default CategoryGroup;
