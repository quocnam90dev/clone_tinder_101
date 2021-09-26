import { Container, Box } from "@material-ui/core";
import NavBar from "./components/NavBar";
import UserList from "./components/UserList";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Container maxWidth="sm">
        <Box mt={5} display='flex' justifyContent='center'>
          <UserList />
        </Box>
      </Container>
    </div>
  );
}

export default App;
