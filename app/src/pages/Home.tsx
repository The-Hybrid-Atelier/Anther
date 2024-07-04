import { useEffect, useState } from "react";
import { Button, Container, Title, useMantineTheme } from "@mantine/core";
import {
  IconNeedleThread,
  IconBucketDroplet,
  IconGlass,
  IconWood,
  IconPrinter,
  IconDeviceImac,
  IconBeta,
  IconGrowth,
} from "@tabler/icons-react";
import { supabase } from "../supabaseClient.ts";
import { titleCase } from "../helpers.ts";
import { useNavigate } from "react-router-dom";
import IconVase from "../components/CustomIcons/IconVase.tsx";
import CategoryGroup from "../components/CategoryGroup.tsx";
import { Category } from "../main.tsx";

function Home() {
  //@ts-ignore
  const [domains, setDomains] = useState<Domain[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const navigate = useNavigate();
  const theme = useMantineTheme();

  const getColorByCategory = (s: string | undefined): string => {
    if (typeof s === "undefined") return theme.colors.gray[0];
    return domains.filter((dom) => dom.value === s)[0].color;
  };

  const handleClick = () => {
    navigate(`/compare?domainOne=${selected[0]}&domainTwo=${selected[1]}`);
  };

  const handleBadgeSelect = (value: string) => {
    console.log("Badge clicked");
    if (selected.includes(value)) {
      setSelected(selected.filter((domain) => domain !== value));
      return;
    }

    if (selected.length < 2) {
      setSelected([...selected.slice(), value]);
      return;
    }

    if (selected.length === 2) {
      const updatedSelected = selected;
      updatedSelected.shift();
      setSelected([...updatedSelected, value]);
      return;
    }
  };

  const categories: Category[] = [
    {
      value: "casting and molding",
      label: "Casting & Molding",
      icon: <IconBucketDroplet />,
      color: "cyan",
    },
    {
      value: "ceramics",
      label: "Ceramics",
      icon: <IconVase color={theme.colors.red[8]} />,
      color: "red",
    },
    {
      value: "digital fabrication",
      label: "Digital Fabrication",
      icon: <IconDeviceImac />,
      color: "indigo",
    },
    {
      value: "glass",
      label: "Glass",
      icon: <IconGlass />,
      color: "blue",
    },
    {
      value: "print making",
      label: "Print Making",
      icon: <IconPrinter />,
      color: "pink",
    },
    {
      value: "textiles",
      label: "Textiles",
      icon: <IconNeedleThread />,
      color: "violet",
    },
    {
      value: "woodworking",
      label: "Wood Working",
      icon: <IconWood />,
      color: "grape",
    },
    {
      value: "experimental",
      label: "Experimental",
      icon: <IconBeta />,
      color: "teal",
    },
  ];

  useEffect(() => {
    supabase
      .from("domains")
      .select("*")
      .eq("display", true)
      .then(({ data, error }) => {
        if (error) {
          console.log(error);
        } else {
          // @ts-ignore TODO: Fix this
          const domains: Domain[] = data?.map((domain: any) => {
            return {
              value: domain.title,
              label: titleCase(domain.title),
              group: domain.category,
              color: categories.filter(
                (cat) => cat.value === domain.category,
              )[0].color,
            };
          });

          console.log(domains);
          setDomains(domains);
        }
      });
  }, []);

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
        }}
      >
        <Container>
          <Title size={"h3"}>DomainView </Title>
          <Title size={"h5"} color={"dimmed"} ff={"Nunito"}>
            Select 2 communities to compare...
          </Title>
          <br />
          <div
            style={{
              display: "flex",
              justifyContent: "start",
              gap: "16px",
              flexWrap: "wrap",
            }}
          >
            {categories.map((category) => (
              <CategoryGroup
                key={category.value}
                category={category}
                domains={domains}
                selected={selected}
                handleBadgeSelect={handleBadgeSelect}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "middle",
              width: "100%",
            }}
          >
            <Button
              size={"md"}
              sx={{ marginTop: "32px" }}
              leftIcon={<IconGrowth />}
              onClick={handleClick}
              variant={selected.length === 2 ? "gradient" : "light"}
              gradient={{
                from: getColorByCategory(selected[0]),
                to: getColorByCategory(selected[1]),
              }}
              disabled={selected.length !== 2}
            >
              Let's Go!
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Home;
