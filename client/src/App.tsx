import React from "react";
import { createRoot } from "react-dom/client";
import Main from "./views/Main";

import "./style.css";

const App: React.FC = () => {
  return <Main />;
};

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<App />);

export default App;
