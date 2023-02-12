import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export const Header = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar>
          <Toolbar>
            <Button href="/" disableRipple color="inherit">
              <Typography variant="h6">Farese</Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
