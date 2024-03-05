import React from "react";
import { createRoot } from "react-dom/client";

import "./style.css";
import Contact from "./views/Contact";

const App: React.FC = () => {
  return (
    <Contact />
  )
};

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<App />);

export default App;
