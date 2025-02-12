var file = "res/pokemon_species_names.json";
fetch(file)
    .then((response) => response.json())
    .then((data) => {
        var myList = document.getElementById("pokemon");
        data.forEach(item => {
            var newOption = document.createElement("option");
            newOption.value = item.name;
            myList.appendChild(newOption);
        })
    })
    .catch((err) => {
        console.log(`Error fetching: ${err}`);
    });

function handleChange(val) {
    var id = null;
    if (val.length >= 3) {
        try {
            var file = "res/pokemon_species_names.json";
            fetch(file)
                .then((response) => response.json())
                .then((data) => {
                    id = findPokemonIdByName(data, val);
                    updateSprite(id);
                }
                )
        }
        catch {

        }
    }
}

function findPokemonIdByName(data, name) {
    const foundPokemon = data.find((item) => item.name.toLowerCase() === name.toLowerCase());
    if (foundPokemon) {
        return foundPokemon.pokemon_species_id;
    }
}



function updateSprite(id) {
    var normalSprite, shinySprite;
    if (id) {

        try {
            fetch("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/" + id + ".gif")
                .then((response) => {
                    const contentType = response.headers.get("content-type");
                    if (contentType && contentType.startsWith("image/gif")) {
                        var url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/showdown/";
                        normalSprite = url + id + ".gif";
                        shinySprite = url + "shiny/" + id + ".gif";

                    }
                    else {
                        return fetch("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/" + id + ".png")
                            .then((response) => {
                                const contentType = response.headers.get("content-type");
                                if (contentType && contentType.startsWith("image/png")) {
                                    const url = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";
                                    normalSprite = url + id + ".png";
                                    shinySprite = url + "shiny/" + id + ".png";
                                }
                            })
                    }
                })
                .catch(document.getElementById("sprites").style.display = "none")
                .finally(() => {
                    document.getElementById("sprites").style.display = "none" ? document.getElementById("sprites").style.display = "grid" : null;
                    document.getElementById("normal").setAttribute("src", normalSprite);
                    document.getElementById("shiny").setAttribute("src", shinySprite);
                })
        } finally {

        }
    }

    else {
        document.getElementById("sprites").style.display = "none";
    }
}
function handleClick() {
    document.getElementsByTagName("input")[0].value = "";
}

function handleWikiClick() {
    var pokemon = document.getElementById("input").value.split(' ')[0];
    console.log(pokemon);
    if (pokemon) {
    var link = "https://www.pokewiki.de/" + pokemon;
    window.open(link).focus;
}
else {
    alert(pokemon, "Das geht so nicht!");
}
}
