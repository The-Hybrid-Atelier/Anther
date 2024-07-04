import "./App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { forwardRef, useEffect, useState } from "react";
import { supabase } from "./supabaseClient.ts";
import { User } from "@supabase/supabase-js";
import NavRail from "./components/NavRail.tsx";
import {
  Modal,
  Text,
  Autocomplete,
  Paper,
  MantineColor,
  SelectItemProps,
  Group,
  AutocompleteItem,
  Loader,
} from "@mantine/core";
import NavBar from "./components/NavBar.tsx";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { SearchResp } from "./main.tsx";
import { titleCase } from "./helpers.ts";
import ModalContents from "./components/modal/ModalContents.tsx";

interface ItemProps extends SelectItemProps {
  color: MantineColor;
  dom: string;
  token: string;
  image: string;
}

const AutoCompleteItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ dom, token, value, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <div>
          <Text>{titleCase(token)}</Text>
          <Text size="xs" color="dimmed">
            {titleCase(dom)}
          </Text>
        </div>
      </Group>
    </div>
  ),
);

function App() {
  useHotkeys([["/", () => handleOpen()]]);
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [opened, { open, close }] = useDisclosure();
  const [modalOpened, { open: modalOpen, close: modalClose }] = useDisclosure();
  const [search, setSearch] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [data, setData] = useState<AutocompleteItem[]>([]);
  const [modalSelection, setModalSelection] = useState<AutocompleteItem>();

  // const fetchConcepts = async () => {
  //   //@ts-ignore
  //   const { data, error }: SearchResp = await supabase
  //     .from("token_tfpdf")
  //     .select("*")
  //     .limit(1000);
  //   return { data, error };
  // };

  useEffect(() => {
    supabase.auth.onAuthStateChange((event, session) => {
      console.log(event, session);
      if (session?.user) {
        setUser(session.user);
        // navigate("/");
      } else {
        setUser(null);
        navigate("/");
      }
    });
  }, []);

  useEffect(() => {
    console.log("Data changed", data);
  }, [data]);

  const fetchConcepts = async () => {
    //@ts-ignore
    const { data, error }: SearchResp = await supabase
      .from("mat_token_tfpdf")
      .select("*")
      .eq("token", search.toLowerCase().trim())
      .limit(800);
    return { data, error };
  };

  const logInteraction = async (item: AutocompleteItem) => {
    console.log(item);
    const { data: sessionData, error } = await supabase.auth.getSession();
    if (error) {
      console.log(error);
      return error;
    }
    if (sessionData.session) {
      const { data, error } = await supabase.from("user_concept_log").insert({
        user: sessionData.session.user?.id,
        token: item.token,
        domains: [item.dom],
      });
      if (error) console.log(error);
      console.log(data);
    }
  };

  function handleItemSelect(item: AutocompleteItem) {
    logInteraction(item).then(() => {
      console.log("Selected Item", item);
      close();
      setModalSelection(item);
      modalOpen();
      console.log(item.value);
    });
  }

  function handleOpen() {
    setSearch("");
    open();
  }

  useEffect(() => {
    if (search !== "") {
      const getData = setTimeout(() => {
        console.log("Searching for: ", search);
        setSearchLoading(true);
        fetchConcepts().then(({ data, error }) => {
          if (data) {
            setData(
              data.map((concept) => ({
                ...concept,
                value: concept.token + concept.dom,
              })),
            );
            setSearchLoading(false);
          }
          if (error) {
            console.log(error);
          }
        });
      }, 2000);
      return () => clearTimeout(getData);
    }
  }, [search]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "left",
        flexWrap: "wrap",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Modal opened={opened} onClose={close} withCloseButton={false} centered>
        <Paper sx={{ height: 300 }}>
          <Autocomplete
            data-autofocus
            data={data}
            value={search}
            role="searchbox"
            aria-label={"Search"}
            rightSection={searchLoading ? <Loader size={"sm"} /> : null}
            itemComponent={AutoCompleteItem}
            label={"Search Concepts"}
            onChange={setSearch}
            placeholder={"Search Concepts"}
            dropdownPosition={"bottom"}
            filter={(value, item) =>
              item.token.toLowerCase().includes(value.toLowerCase().trim()) ||
              item.dom.toLowerCase().includes(value.toLowerCase().trim())
            }
            onItemSubmit={(item) => handleItemSelect(item)}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              height: "80%",
            }}
          >
            {data.length === 0 && !searchLoading && search !== "" ? (
              <Text align={"center"}>No results found</Text>
            ) : (
              <Text align={"center"}>Search for concepts, like "casting".</Text>
            )}
          </div>
        </Paper>
      </Modal>
      {/*Concept Modal for Search*/}
      <Modal
        opened={modalOpened}
        withCloseButton={false}
        onClose={modalClose}
        size={"90%"}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <ModalContents
            index={0}
            token={modalSelection?.token}
            domain={modalSelection?.dom}
            updateModal={handleItemSelect}
            color={"blue"}
            opened={modalOpened}
          />
        </div>
      </Modal>
      <a href="#main" style={{ height: 0 }}>
        Skip to main content
      </a>
      <NavBar setOpenSearch={handleOpen} />
      <NavRail user={user} setUser={setUser} />
      <div style={{ padding: "16px", flex: 1 }} id={"main"}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
