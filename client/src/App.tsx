import React from "react";
import { createRoot } from "react-dom/client";

import "./style.css";

const App: React.FC = () => {
  return <div />
};

const root = createRoot(document.getElementById("root") as HTMLDivElement);
root.render(<App />);

export default App;
