import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { AppRouter } from "./navigation/router";
import { Provider as ReduxProvider } from "react-redux";
import { AppStore } from "./service/create-store";

function App({ router, store }: { store: AppStore; router: AppRouter }) {
  const theme = extendTheme({
    styles: {
      global: {
        body: {
          bg: "#141414", // Set the background color for the entire app
          color: "white", // Set the text color
        },
      },
    },
    fonts: {
      heading: "Netflix Sans, sans-serif", // Replace with a Netflix-like font
      body: "Netflix Sans, sans-serif", // Replace with a Netflix-like font
    },
    colors: {
      brand: {
        900: "#141414", // Dark background color
        500: "#E50914", // Netflix red
      },
      text: {
        900: "white", // Text color
      },
    },
    components: {
      Button: {
        variants: {
          solid: {
            bg: "brand.500", // Netflix red background color for buttons
            color: "text.900", // Text color for buttons
          },
        },
      },
    },
  });

  return (
    <ReduxProvider store={store}>
      <ChakraProvider theme={theme}>
        <RouterProvider router={router} />
      </ChakraProvider>
    </ReduxProvider>
  );
}

export default App;
