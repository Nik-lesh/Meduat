import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AppShellContainer } from "./components/Header";
import * as ROUTES from "./routes/routes";

import RenderMovies from "./pages/Movie/RenderMovies";
import { MantineProvider } from "@mantine/core";
import RestaurantList from "./pages/restraunts/RenderRestraunts";
import MovieDetails from "./pages/Movie/MovieDetail";
import RenderRestraunt from "./pages/restraunts/RenderRestraunts";
import LoginForm from "./pages/Login";
import RegistrationForm from "./pages/Register";
import { Provider } from "react-redux";
import { store } from "./reduxStore/store";
import HomePage from "./pages/homepage/HomePage";

import RestaurantDetail from "./pages/restraunts/RestrauntDetail";

function App() {
  return (
    <>
      <MantineProvider>
        <Provider store={store}>
          <Router>
            <AppShellContainer>
              <Routes>
                <Route path={ROUTES.HOME} element={<HomePage />} />

                <Route path={ROUTES.MOVIES} element={<RenderMovies />} />
                <Route path={ROUTES.MOVIE_DETAIL} element={<MovieDetails />} />
                <Route
                  path={ROUTES.RESTRAUNTS_DETAILS}
                  element={<RestaurantDetail />}
                />

                <Route
                  path={ROUTES.RESTRAUNTS}
                  element={<RestaurantList />}
                ></Route>
                <Route
                  path={ROUTES.HOTELS}
                  element={<RenderRestraunt />}
                ></Route>
                <Route path={ROUTES.LOGIN} element={<LoginForm />}></Route>
                <Route
                  path={ROUTES.REGISTER}
                  element={<RegistrationForm />}
                ></Route>
              </Routes>
            </AppShellContainer>
          </Router>
        </Provider>
      </MantineProvider>
    </>
  );
}

export default App;
