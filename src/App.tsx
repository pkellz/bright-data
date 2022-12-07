import "./App.css";
import Button from "./components/Button";
import Search from "./components/Search";
import { fetchProducts } from "./services/products";

function App() {
  return (
    <div className="App">
      <Search></Search>
      <Button
        value={"Fetch Products"}
        onClick={async () => {
          console.log("Fetch Products");
          try {
            const fetchProductsResult = await fetchProducts("search value");
            if (!fetchProductsResult.success) {
              throw new Error("Could not trigger Bright Data collector");
            }
          } catch (error) {
            let errorMessage = "An unknown error occurred";
            if(error instanceof Error){
              errorMessage = error.message;
            }

            throw new Error(errorMessage);
          }
        }}
      ></Button>
    </div>
  );
}

export default App;
