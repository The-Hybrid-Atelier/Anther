import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Compare from "./pages/Compare.tsx";
import {
  Container,
  MantineProvider,
  MantineThemeOverride,
} from "@mantine/core";
import CustomFonts from "./components/CustomFonts.tsx";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "./supabaseClient.ts";
import { PostgrestError } from "@supabase/supabase-js";
import RequestPage from "./pages/Request.tsx";

export type Concept = {
  avg_occurrence: number;
  domain: string;
  freq: number;
  num_vids: number;
  tfpdf: number;
  token: string;
  value?: string;
};

export type Category = {
  value: string;
  label: string;
  icon: React.ReactElement;
  color: string;
};

export type Domain = {
  value: string;
  label: string;
  group?: string;
  color: string;
};

export type Token = {
  token: string;
  dom: string;
};

export type Video = {
  id: string;
  title: string;
  quotes: VideoQuote[];
  likes: number;
  views: number;
};

export type VideoQuote = {
  video_title: string;
  quote: string;
  video: string;
  video_likes: number;
  video_start: number;
  video_views: number;
  trans_id: number;
};

export type ConceptPoint = Concept & {
  domains: string[];
  color?: string;
  x: number;
  y: number;
};

export type ConceptResp = {
  data: ConceptPoint[] | null;
  error: PostgrestError | null;
};

export type SearchResp = {
  data?: Token[];
  error?: PostgrestError;
};

const myTheme: MantineThemeOverride = {
  colorScheme: "light",
  primaryShade: 9,
  fontFamily: "Gilroy, Nunito, Arial, sans",
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "login",
        element: (
          <Container>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={[]}
            />{" "}
          </Container>
        ),
      },
      { path: "domain/:id", element: <div>Domain</div> },
      { path: "compare", element: <Compare /> },
      { path: "request", element: <RequestPage /> },
      // { path: "tags", element: <Tagging /> },
      // { path: "concepts", element: <div>Concepts</div> },
      // { path: "table", element: <TablePage /> },
      // { path: "tags", element: <Tags /> },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MantineProvider theme={myTheme} withGlobalStyles withNormalizeCSS>
      <CustomFonts />
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
);
