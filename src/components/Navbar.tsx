import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

export const Navbar = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" enableColorOnDark>
          <Toolbar>
            <Button href="/" disableRipple color="inherit">
              <Typography variant="h6" fontWeight={600}>
                Farese
              </Typography>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};
