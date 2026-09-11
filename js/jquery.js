import $ from "jquery";

const playerData = {
  name: "Hossein Hosseinzadeh",
  email: "hossein.hosseinzadeh@gmail.com",
  avatar: "assets/players/hossein.png",
  level: 23,
  wins: 135,
  pokemonCount: 82,
  favoritePokemon: "Pikachu",
};

// Sending Player Data with $.ajax
function createPlayerWithAjax() {
  $.ajax({
    url: "http://localhost:3001/players",
    method: "POST",
    data: JSON.stringify(playerData),
    contentType: "application/json",
    dataType: "json",
  })
    .done(function (response) {
      console.log("Player created successfully:", response);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Failed to create player:", textStatus, errorThrown);
    })
    .always(function () {
      console.log("Post request completed using $.ajax.");
    });
}

// Sending Player Data with $.post
function createPlayerWithPost() {
  $.post({
    url: "http://localhost:3001/players",
    data: JSON.stringify(playerData),
    contentType: "application/json",
    dataType: "json",
  })
    .done(function (response) {
      console.log("Player created successfully:", response);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      console.error("Failed to create player:", textStatus, errorThrown);
    })
    .always(function () {
      console.log("Post request completed using $.post.");
    });
}

// Initializing Pokemon State
let pokemonData = [];
let currentPokemon = null;

// Displaying the Loading Error
function showLoadError() {
  $("#pokemon-card").html(`
    <div class="flex items-center justify-center gap-1.5 text-neutral-200">
      <img src="assets/icons/danger.svg" alt="" class="size-5" />
      <p>Failed to load pokemon data. Please try again later.</p>
    </div>
  `);
}

// Loading Pokemon Data with $.ajax
function loadDataWithAjax() {
  $.ajax({
    url: "https://raw.githubusercontent.com/mmhosseinzadeh9190/pokemon/main/pokemon.json",
    method: "GET",
    dataType: "json",
    headers: {
      Authorization: "Bearer my-secret-token-23",
      Accept: "application/json",
    },
    success: function (data) {
      pokemonData = data.pokemon;
      updateCardBySearch("1");
    },
    error: function (jqXHR, textStatus, errorThrown) {
      showLoadError();
    },
    complete: function () {
      console.log("Get request completed using $.ajax.");
    },
  });
}

// Loading Pokemon Data with $.get
function loadDataWithGet() {
  $.get(
    "https://raw.githubusercontent.com/mmhosseinzadeh9190/pokemon/main/pokemon.json",
  )
    .done(function (data) {
      pokemonData = data.pokemon;
      updateCardBySearch("1");
    })
    .fail(function () {
      showLoadError();
    })
    .always(function () {
      console.log("Get request completed using $.get.");
    });
}

// Loading Pokemon Data with $.getJSON
function loadDataWithGetJson() {
  $.getJSON(
    "https://raw.githubusercontent.com/mmhosseinzadeh9190/pokemon/main/pokemon.json",
  )
    .done(function (data) {
      pokemonData = data.pokemon;
      updateCardBySearch("1");
    })
    .fail(function () {
      showLoadError();
    })
    .always(function () {
      console.log("Get request completed using $.getJSON.");
    });
}

// Finding a Pokemon
function findPokemon(value) {
  const searchValue = value.toString().toLowerCase().trim();
  return pokemonData.find(
    (pokemon) =>
      pokemon.number.toString() === searchValue ||
      pokemon.name.toLowerCase() === searchValue,
  );
}

// Mapping Pokemon Types to CSS Classes
function getTypeBadge(type) {
  const typeClasses = {
    Bug: "bg-bug/50 border-bug",
    Dark: "bg-dark/50 border-dark",
    Dragon: "bg-dragon/50 border-dragon",
    Electric: "bg-electric/50 border-electric",
    Fairy: "bg-fairy/50 border-fairy",
    Fighting: "bg-fighting/50 border-fighting",
    Fire: "bg-fire/50 border-fire",
    Flying: "bg-flying/50 border-flying",
    Ghost: "bg-ghost/50 border-ghost",
    Grass: "bg-grass/50 border-grass",
    Ground: "bg-ground/50 border-ground",
    Ice: "bg-ice/50 border-ice",
    Normal: "bg-normal/50 border-normal",
    Poison: "bg-poison/50 border-poison",
    Psychic: "bg-psychic/50 border-psychic",
    Rock: "bg-rock/50 border-rock",
    Steel: "bg-steel/50 border-steel",
    Water: "bg-water/50 border-water",
  };
  return typeClasses[type] || "bg-neutral-100/25 border-neutral-50/25";
}

// Rendering the Pokemon Card
function renderCard(pokemon) {
  if (!pokemon) return;

  currentPokemon = pokemon;

  const pokemonNumber = pokemon.number.toString().padStart(3, "0");

  const typesHtml = pokemon.types
    .slice(0, 2)
    .map(
      (type) =>
        `<li class="${getTypeBadge(type)} rounded-full border px-2.5 py-0.5 pb-px text-sm uppercase">${type}</li>`,
    )
    .join("");

  const weaknessesHtml = pokemon.weaknesses
    .map(
      (weakness) =>
        `<li class="${getTypeBadge(weakness)} rounded-full border px-2.5 py-0.5 pb-px text-sm uppercase">${weakness}</li>`,
    )
    .join("");

  const imageSource =
    pokemon.image || `assets/images/pokemon/${pokemonNumber}.png`;

  const hasPreviousEvolution = pokemon.evolution?.prev?.length > 0;
  const hasNextEvolution = pokemon.evolution?.next?.length > 0;

  const html = `
    <span class="absolute z-10 grid size-11 place-items-center rounded-full border border-neutral-50/25 bg-neutral-100/25 text-sm">${pokemonNumber}</span>

      <div class="relative size-84">
        <div id="spinner" role="progressbar" aria-label="Loading pokemon image" aria-valuetext="Loading in progress" class="flex h-full items-center justify-center">
          <img src="assets/icons/spinner.svg" alt="" class="size-11 animate-spin" />
          <span class="sr-only">Loading pokemon image...</span>
        </div>
        <img id="pokemon-image" src="${imageSource}" alt="${pokemon.name}" class="hidden transition-all duration-300">
      </div>

    <div class="flex flex-col gap-4">
      <div class="flex flex-wrap items-center justify-between gap-1">
        <h2 class="mb-1 flex items-center gap-2 text-2xl font-bold tracking-wider">
          <img src="assets/icons/pokemon.svg" alt="" class="size-7" />
          <span>${pokemon.name}</span>
        </h2>

        <ul class="flex flex-wrap items-center gap-2">${typesHtml}</ul>

        <div class="flex w-full items-center gap-1.5 text-neutral-200">
          <img src="assets/icons/flash.svg" alt="" class="size-5" />
          <span>${pokemon.candy.name || `${pokemon.name} Candy`}</span>
        </div>
      </div>

      <div class="grid grid-cols-2 overflow-hidden rounded-2xl border border-neutral-50/25 bg-neutral-100/25">
        <div class="flex items-center gap-1.5 border-r border-b border-neutral-50/25 p-2 pl-4">
          <img src="assets/icons/heart.svg" alt="" class="size-5" />
          <span class="mr-1.5">HP</span>
          <span class="text-sm">${pokemon.hp || "?"}</span>
        </div>

        <div class="flex items-center gap-1.5 border-r border-b border-transparent border-b-neutral-50/25 p-2 pl-4">
          <img src="assets/icons/hammer.svg" alt="" class="size-5" />
          <span class="mr-1.5">CP</span>
          <span class="text-sm">${pokemon.cp || "?"}</span>
        </div>

        <div class="flex items-center gap-1.5 border-r border-b border-transparent border-r-neutral-50/25 p-2 pl-4">
          <img src="assets/icons/ruler.svg" alt="" class="size-5" />
          <span class="mr-1.5">Height</span>
          <span class="text-sm">${pokemon.height}</span>
        </div>

        <div class="flex items-center gap-1.5 border-r border-b border-transparent p-2 pl-4">
          <img src="assets/icons/weight.svg" alt="" class="size-5" />
          <span class="mr-1.5">Weight</span>
          <span class="text-sm">${pokemon.weight}</span>
        </div>
      </div>

      <div class="flex flex-col gap-2">
        <div class="flex items-center gap-1.5 text-neutral-200">
          <img src="assets/icons/danger.svg" alt="" class="size-5" />
          <span>Weaknesses</span>
        </div>

        <ul class="flex flex-wrap items-center gap-2">${weaknessesHtml}</ul>
      </div>

      <div class="mt-2 grid grid-cols-2 items-center gap-3">
        <button type="button" id="previous-evolution-button" ${!hasPreviousEvolution ? "disabled" : ""} class="flex cursor-pointer items-center justify-center gap-1 rounded-full border border-neutral-50/25 bg-neutral-100/25 p-2 text-sm transition-all duration-300 hover:bg-neutral-100/35 focus:bg-neutral-100/35 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70">
          <img src="assets/icons/arrow-left.svg" alt="" class="size-5" />
          <span>Previous Evolution</span>
        </button>

        <button type="button" id="next-evolution-button" ${!hasNextEvolution ? "disabled" : ""} class="flex cursor-pointer items-center justify-center gap-1 rounded-full border border-neutral-50/25 bg-neutral-100/25 p-2 text-sm transition-all duration-300 hover:bg-neutral-100/35 focus:bg-neutral-100/35 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70">
          <span>Next Evolution</span>
          <img src="assets/icons/arrow-right.svg" alt="" class="size-5" />
        </button>
      </div>
    </div>
  `;

  const pokemonCard = $("#pokemon-card");

  pokemonCard.removeClass("animate-card-flip");
  pokemonCard.html(html);

  const pokemonImage = $("#pokemon-image");
  const spinner = $("#spinner");

  pokemonImage.on("load", function () {
    spinner.fadeOut(300, function () {
      $(this).remove();
      pokemonImage.removeClass("hidden").addClass("block");
    });
  });

  setTimeout(() => {
    pokemonCard.addClass("animate-card-flip");
  }, 10);
}

// Handling Previous Evolution
$("#pokemon-card").on("click", "#previous-evolution-button", () => {
  if (currentPokemon?.evolution?.prev?.length) {
    const previousPokemon = findPokemon(
      currentPokemon.evolution.prev[0].number,
    );
    if (previousPokemon) renderCard(previousPokemon);
  }
});

// Handling Next Evolution
$("#pokemon-card").on("click", "#next-evolution-button", () => {
  if (currentPokemon?.evolution?.next?.length) {
    const nextPokemon = findPokemon(currentPokemon.evolution.next[0].number);
    if (nextPokemon) renderCard(nextPokemon);
  }
});

// Updating the Card from Search
function updateCardBySearch(value) {
  const pokemon = findPokemon(value);
  if (!pokemon) {
    $("#pokemon-card").html(`
      <div class="flex items-center justify-center gap-1.5 text-neutral-200">
        <img src="assets/icons/danger.svg" alt="" class="size-5" />
        <p>Pokemon "${value}" was not found.</p>
      </div>
    `);
    return;
  }
  renderCard(pokemon);
}

// Initializing the Application
$(function () {
  console.log("Welcome to Mastering jQuery: Write Less, Do More");

  loadDataWithGetJson();

  function executeSearch() {
    const searchValue = $("#search-input").val();
    if (searchValue.trim()) {
      updateCardBySearch(searchValue);
      $("#search-input").val("");
    }
  }

  $("#search-button").on("click", function (event) {
    event.preventDefault();
    executeSearch();
  });

  $("#search-input").on("keydown", function (event) {
    if (event.which === 13) {
      event.preventDefault();
      executeSearch();
    }
  });

  // $("#add-player").click(createPlayerWithAjax);
});
