import axios from "axios";

// Creating an Axios Instance
const apiClient = axios.create({
  baseURL: "http://localhost:3001",
  headers: {
    Authorization: "Bearer my-secret-token-23",
    Accept: "application/json",
  },
  timeout: 5000,
});

// Sending a Get Request with Promises
function getPlayersWithPromise() {
  axios
    .get("http://localhost:3001/players")
    .then(function (response) {
      console.log("All players:", response.data);
    })
    .catch(function (error) {
      console.error("Failed to fetch players:", error.message);
    })
    .finally(function () {
      console.log("Get request completed.");
    });
}
// getPlayersWithPromise();

// Sending a Get Request with Async/Await
async function getPlayersWithAsyncAwait() {
  try {
    const response = await axios.get("http://localhost:3001/players");
    console.log("All players:", response.data);
  } catch (error) {
    console.error("Failed to fetch players:", error.message);
  } finally {
    console.log("Get request completed.");
  }
}
// getPlayersWithAsyncAwait();

// Sending a Get Request with Custom Headers
async function getPlayersWithHeaders() {
  try {
    const response = await axios.get("http://localhost:3001/players", {
      headers: {
        Authorization: "Bearer my-secret-token-23",
        Accept: "application/json",
      },
    });
    console.log("All players:", response.data);
  } catch (error) {
    console.error("Failed to fetch players:", error.message);
  } finally {
    console.log("Get request completed.");
  }
}
// getPlayersWithHeaders();

// Sending a Get Request with an Axios Instance
async function getPlayersWithInstance() {
  try {
    const response = await apiClient.get("/players");
    console.log("All players:", response.data);
  } catch (error) {
    console.error("Failed to fetch players:", error.message);
  } finally {
    console.log("Get request completed.");
  }
}
// getPlayersWithInstance();

// Fetching a Single Player
async function getSinglePlayer(playerId) {
  try {
    const response = await axios.get(
      `http://localhost:3001/players/${playerId}`,
    );
    console.log("Player found:", response.data);

    const player = response.data;
    return player;
  } catch (error) {
    console.error("Player not found:", error.message);
  } finally {
    console.log("Single-player request completed.");
  }
}
// const player = await getSinglePlayer(2);

// Sending a Post Request
function addPlayer(newPlayer) {
  axios
    .post("http://localhost:3001/players", newPlayer)
    .then(function (response) {
      console.log("Player added successfully:", response.data);
    })
    .catch(function (error) {
      console.error("Failed to add player:", error.message);
    })
    .finally(function () {
      console.log("Post request completed.");
    });
}
const newPlayer = {
  name: "Hossein Hosseinzadeh",
  email: "hossein.hosseinzadeh@gmail.com",
  avatar: "/assets/images/players/hossein.png",
  level: 23,
  wins: 135,
  pokemonCount: 82,
  favoritePokemon: "Pikachu",
};
// document
//   .querySelector("#add-player-button")
//   .addEventListener("click", () => addPlayer(newPlayer));

// Sending a Put Request
function updatePlayer(updatedPlayer) {
  axios
    .put(`http://localhost:3001/players/${updatedPlayer.id}`, updatedPlayer)
    .then(function (response) {
      console.log("Player updated successfully:", response.data);
    })
    .catch(function (error) {
      console.error("Failed to update player:", error.message);
    })
    .finally(function () {
      console.log("Put request completed.");
    });
}
const updatedPlayer = {
  id: "",
  name: "Mohammad Mahdi Hosseinzadeh",
  email: "mohammadmahdi.hosseinzadeh@gmail.com",
  avatar: "/assets/images/players/hossein.png",
  level: 82,
  wins: 232,
  pokemonCount: 135,
  favoritePokemon: "Mew",
};
// document
//   .querySelector("#add-player-button")
//   .addEventListener("click", () => updatePlayer(updatedPlayer));

// Sending a Patch Request
function updatePlayerPartially(playerId, partialPlayerData) {
  axios
    .patch(`http://localhost:3001/players/${playerId}`, partialPlayerData)
    .then(function (response) {
      console.log("Player partially updated:", response.data);
    })
    .catch(function (error) {
      console.error("Failed to partially update player:", error.message);
    })
    .finally(function () {
      console.log("Patch request completed.");
    });
}
const partialPlayerData = {
  level: 82,
  wins: 232,
  favoritePokemon: "Mewtwo",
};
// document
//   .querySelector("#add-player-button")
//   .addEventListener("click", () =>
//     updatePlayerPartially("", partialPlayerData),
//   );

// Sending a Delete Request
function deletePlayer(playerId) {
  axios
    .delete(`http://localhost:3001/players/${playerId}`)
    .then(function (response) {
      console.log("Player deleted successfully:", response.data);
    })
    .catch(function (error) {
      console.error("Failed to delete player:", error.message);
    })
    .finally(function () {
      console.log("Delete request completed.");
    });
}
// document
//   .querySelector("#add-player-button")
//   .addEventListener("click", () => deletePlayer(""));

// Sending Parallel Requests
async function getPlayersInParallel() {
  try {
    const [response1, response2, response3] = await Promise.all([
      axios.get("http://localhost:3001/players/1"),
      axios.get("http://localhost:3001/players/2"),
      axios.get("http://localhost:3001/players/3"),
    ]);
    console.log("Player 1:", response1.data);
    console.log("Player 2:", response2.data);
    console.log("Player 3:", response3.data);
  } catch (error) {
    console.error("Failed to fetch players:", error.message);
  } finally {
    console.log("Parallel requests completed.");
  }
}
// getPlayersInParallel();

async function getPlayersInParallelWithInstance() {
  try {
    const [response1, response2, response3] = await Promise.all([
      apiClient.get("/players/1"),
      apiClient.get("/players/2"),
      apiClient.get("/players/3"),
    ]);
    console.log("Player 1:", response1.data);
    console.log("Player 2:", response2.data);
    console.log("Player 3:", response3.data);
  } catch (error) {
    console.error("Failed to fetch players:", error.message);
  } finally {
    console.log("Parallel requests completed.");
  }
}
// getPlayersInParallelWithInstance();

// Creating an Axios Instance with Interceptors
const apiWithInterceptor = axios.create({
  baseURL: "http://localhost:3001",
  timeout: 5000,
});

// Configuring a Request Interceptor
apiWithInterceptor.interceptors.request.use(
  function (config) {
    config.headers.Authorization = "Bearer my-secret-token-23";
    config.headers.Accept = "application/json";
    console.log("Request:", config.method.toUpperCase(), config.url);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Configuring a Response Interceptor
apiWithInterceptor.interceptors.response.use(
  function (response) {
    console.log("Response status:", response.status);
    return response;
  },
  function (error) {
    if (error.response) {
      console.error("Status:", error.response.status);
      if (error.response.status === 401) {
        console.error("Unauthorized: Invalid token.");
      } else if (error.response.status === 404) {
        console.error("Resource not found.");
      }
    }
    return Promise.reject(error);
  },
);

// Sending a Get Request with Interceptors
async function getPlayersWithInterceptor() {
  try {
    const response = await apiWithInterceptor.get("/players");
    console.log("All players:", response.data);
  } catch (error) {
    console.error("Failed to fetch players:", error.message);
  } finally {
    console.log("Get request completed.");
  }
}
// getPlayersWithInterceptor();
