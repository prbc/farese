import { Routes, Route } from "react-router-dom";
import { Home } from "./Home";
import { Layout } from "./Layout";
import { NoMatch } from "./NoMatch";

export function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </>
  );
}
