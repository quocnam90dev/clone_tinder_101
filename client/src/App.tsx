import { Container, Box } from "@material-ui/core";
import Cards from "./components/Cards";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container maxWidth="sm">
        <Box mt={5} display='flex' justifyContent='center'>
          <Cards />
        </Box>
      </Container>
    </div>
  );
}

export default App;
