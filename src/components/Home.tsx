import { useLazyQuery } from "@apollo/client";
import {
  Alert,
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { GET_WEATHER_QUERY } from "../graphql/queries";
import "./styles.css";

export const Home = () => {
  const [city, setCity] = useState("");
  const [getData, { loading, data, error }] = useLazyQuery(GET_WEATHER_QUERY, {
    variables: {
      name: city,
    },
  });
  if (loading) {
    <div>Loading...</div>;
  }
  if (error) {
    <Alert severity="error">An error occured!</Alert>;
  }
  return (
    <>
      <CssBaseline />
      <Container>
        <Typography variant="h2">Search weather by city</Typography>
        <br />
        <input
          id="search-input"
          type="text"
          placeholder="search by city"
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={() => getData()}
        >
          Search
        </Button>
        {data && (
          <>
            <br />
            <br />
            <Typography variant="h3">{data.getCityByName.name}</Typography>
            <Typography variant="h5">
              {data.getCityByName.weather.temperature.actual}
            </Typography>
            <Typography variant="h5">
              {" "}
              Description : {data.getCityByName.weather.summary.description}
            </Typography>
            <Typography variant="h5">
              {data.getCityByName.weather.wind.speed}
            </Typography>
          </>
        )}
      </Container>
    </>
  );
};
