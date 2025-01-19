import React from "react";
import { Container, Grid, List, ListItem, ListItemText, Typography, Box, Link as MuiLink } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: "pink", py: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom align="left" className="bold">
              Welcome to ArBoutique™
            </Typography>
            <List>
              <ListItem>
                <MuiLink href="#" color="inherit" underline="hover">
                  Social Responsibility
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink href="#" color="inherit" underline="hover">
                  Our Tech
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink href="#" color="inherit" underline="hover">
                  Our Factory
                </MuiLink>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom align="left" className="bold">
              Help
            </Typography>
            <List>
              <ListItem>
                <MuiLink href="#" color="inherit" underline="hover">
                  Payment Methods
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink href="#" color="inherit" underline="hover">
                  Shipping & Delivery
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink href="#" color="inherit" underline="hover">
                  Return Policy
                </MuiLink>
              </ListItem>
            </List>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom align="left" className="bold">
              Support
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" align="left">
              arbotique@gmail.com
            </Typography>
            <List>
              <ListItem>
                <MuiLink href="#" color="inherit" underline="hover">
                  Social Responsibility
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink href="#" color="inherit" underline="hover">
                  Sustainability
                </MuiLink>
              </ListItem>
              <ListItem>
                <MuiLink href="#" color="inherit" underline="hover">
                  No Animal Cruelty
                </MuiLink>
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
