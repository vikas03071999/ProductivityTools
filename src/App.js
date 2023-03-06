import { API_KEY } from "./key";
import Home from "./Pages/Home/Home";
import Grammar from "./Pages/GrammarPerfect/Grammar";
import Code from "./Pages/Code/Code";
import Email from "./Pages/Email/Email";
import Summary from "./Pages/Summary/Summary";
import Rephrase from "./Pages/Rephrase/Rephrase";
import Chatgpt from "./Pages/ChatGPT/Chatgpt";
import { BrowserRouter,Routes,Route } from "react-router-dom";

function App() {
  console.log(API_KEY)
  // font-family: 'Lato', sans-serif;

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/Code" element={ <Code /> } />
        <Route path="/GrammarPerfect" element={<Grammar />} />
        <Route path="/EmailGenerator" element={<Email />} />
        <Route path="/SummaryExtractor" element={<Summary />} />
        <Route path="/Recapitulator" element={<Rephrase />} />
        <Route path="/ChatGPTlite" element={<Chatgpt />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
