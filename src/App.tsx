import { Routes, Route } from "react-router-dom";

import MainPage from "./components/MainPage";
import RepositoryCard from "./components/RepositoryCard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/:id" element={<RepositoryCard />} />
    </Routes>
  );
}

export default App;
