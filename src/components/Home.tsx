import { Box, Card, Grid, Typography } from "@mui/material";

export const Home = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Card>
              <Typography>
                Welcome to an online directory of Reformed Baptist churches
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Typography variant="h5">About</Typography>
              <Typography>
                This directory of Reformed Baptist churches is a collection of
                582 churches that hold to the 1689 London Baptist Confession of
                Faith or a similar statement of faith. It is our desire that
                this list would be used of God to help Christians find a church
                when considering a move, or when planning a trip.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <Typography variant="h5">Quick Disclaimer</Typography>
              <Typography>
                We do not personally know all of these churches nor can we
                recommend them from personal knowledge. Some of the churches
                listed in this directory may not be considered by all to be
                distinctly Reformed. However, they would be like-minded in
                several areas of faith and practice and so are listed on this
                directory.
              </Typography>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <Typography variant="h5">Find a church</Typography>
              <Typography>
                Visit the map to search by location to find a church nearby,
                whether at home or traveling.
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
