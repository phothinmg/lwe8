import React from "react";
import { hydrateRoot } from "react-dom/client";
import "./main.css";

const Home = () => {
  return (
    <main>
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Contact</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Alfreds Futterkiste</td>
            <td>Maria Anders</td>
            <td>Germany</td>
          </tr>
          <tr>
            <td>Centro comercial Moctezuma</td>
            <td>Francisco Chang</td>
            <td>Mexico</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

const rootEl = document.getElementById("root");
if (rootEl) {
  hydrateRoot(rootEl, <Home />);
}
