import { AppBar, Box, Button, Toolbar, Typography } from "@material-ui/core";

const NavBar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          width={1}
          py={2}
        >
          <Box>
            <Typography variant="h6">My Tinder</Typography>
          </Box>
          <Box>
            <Button variant="contained">Login</Button>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
