import React from "react";
import { hydrateRoot } from "react-dom/client";
import PageView from "./PageView.js";

const rootEl = document.getElementById("root");

if (rootEl) {
  hydrateRoot(rootEl, <PageView />);
}
