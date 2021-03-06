import React from "react";
import Grid from "@material-ui/core/Grid";
export default function Featured() {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <CardPreview url="https://source.unsplash.com/featured/?travel" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CardPreview url="https://source.unsplash.com/featured/?nature" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <CardPreview url="https://source.unsplash.com/featured/?city" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <CardPreview url="https://source.unsplash.com/featured/?forest" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <CardPreview url="https://source.unsplash.com/featured/?mountains" />
        </Grid>
        <Grid item xs={6} sm={4} md={3}>
          <CardPreview url="https://source.unsplash.com/featured/?island" />
        </Grid>
      </Grid>
    );
  }
  