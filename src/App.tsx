import "./App.css";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import QueryService from "./services/queries";
import { useEffect, useState } from "react";
import { IQuery } from "./models";
import { Alert, Snackbar } from "@mui/material";
const theme = createTheme();

function App() {
  const [query, setQuery] = useState<IQuery>();
  const [keyword, setKeyword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  useEffect(() => {
    setKeyword("");
  }, []);

  function handleCloseErrorAlert() {
    setErrorMessage("");
  }

  function handleCloseSuccess() {
    setSuccessMessage("");
  }

  return (
    <ThemeProvider theme={theme}>
      <main>
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              fontFamily={"Inter"}
              fontWeight={"bold"}
            >
              Competitor Price Analysis
            </Typography>

            <TextField
              name="keyword"
              required
              fullWidth
              id="keyword"
              label="Enter a product for comparison"
              autoFocus
              onChange={(event) => {
                setKeyword(event.target.value);
              }}
            />

            <Snackbar
              open={errorMessage !== ""}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={6000}
              onClose={handleCloseErrorAlert}
            >
              <Alert
                onClose={handleCloseErrorAlert}
                severity="error"
                sx={{ width: "100%" }}
              >
                {errorMessage}
              </Alert>
            </Snackbar>

            <Snackbar
              open={successMessage !== ""}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
              autoHideDuration={6000}
              onClose={handleCloseSuccess}
            >
              <Alert
                severity="success"
                sx={{ width: "100%" }}
                onClose={handleCloseSuccess}
              >
                {successMessage}
              </Alert>
            </Snackbar>

            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={() => {
                  QueryService.getQuery(keyword, 7)
                    .then((response) => {
                      if (
                        !response.data.success ||
                        !(response.status === 200)
                      ) {
                        setErrorMessage(
                          "No products found for the given keyword. Please trigger the collector."
                        );
                        setQuery(undefined);
                        console.log("Request error", response.data);
                        return;
                      }
                      setQuery(response.data.data);
                    })
                    .catch((error) => {
                      setErrorMessage(
                        "No products found for the given keyword. Please trigger the collector."
                      );
                      setQuery(undefined);
                      console.log("Query error", error);
                    });
                }}
              >
                Display comparison results
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  QueryService.triggerCollector(keyword)
                    .then((response) => {
                      if (
                        !response.data.success ||
                        !(response.status === 200)
                      ) {
                        setErrorMessage(
                          "Collector could not be triggered. Please try again"
                        );
                        console.log("Collector trigger error", response.data);
                        return;
                      }

                      setSuccessMessage(
                        "Collector triggered successfully. Please wait for 5 minutes for results."
                      );
                    })
                    .catch((error) => {
                      setErrorMessage(
                        "Collector could not be triggered. Please try again "
                      );
                      console.log("Collector trigger error", error);
                    });
                }}
              >
                Trigger collector
              </Button>
            </Stack>
          </Container>
        </Box>

        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {query?.products.slice(0, 40).map(
              (product, index) =>
                product.price && (
                  <Grid
                    item
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    onClick={() => {
                      window.location.href = product.url;
                    }}
                  >
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <CardMedia
                        component="img"
                        sx={{
                          // 16:9
                          pt: "25.25%",
                        }}
                        image={product.image}
                        alt="random"
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Typography
                          gutterBottom
                          fontWeight="bold"
                          variant="body1"
                        >
                          {product.title}
                        </Typography>

                        <Typography>${product.price}</Typography>

                        <Typography fontWeight="bold" color="red">
                          {product.competitor}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                )
            )}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default App;
