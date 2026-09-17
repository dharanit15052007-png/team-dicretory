const nameInput = document.getElementById("nameInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("list");
const team = document.getElementById("team");

let favourites = [];

const saved = localStorage.getItem("favourites");

favourites = saved ? JSON.parse(saved) : [];

const people = [
    {
        name: "Dharani",
        email: "dharani@gmail.com",
        city: "Chennai"
    },
    {
        name: "Ragul",
        email: "ragul@gmail.com",
        city: "Bangalore"
    },
    {
        name: "Kiruba",
        email: "kiruba@gmail.com",
        city: "Coimbatore"
    },
    {
        name: "Thiru",
        email: "thiru@gmail.com",
        city: "Madurai"
    },
    {
        name: "Ashwini",
        email: "ashwini@gmail.com",
        city: "Salem"
    },
    {
        name: "Saritha",
        email: "saritha@gmail.com",
        city: "Trichy"
    }
];

function render() {
    list.innerHTML = favourites
        .map(name => `<li>${name}</li>`)
        .join("");
}

function loadTeam() {
    team.innerHTML = people
        .map(person => {

            const isFavorite = favourites.includes(person.name);

            return `
                <div class="card">

                    <button
                        class="favorite"
                        onclick="toggleFavourite('${person.name}')"
                    >
                        ${isFavorite ? "★" : "☆"}
                    </button>

                    <h2>${person.name}</h2>

                    <p>
                        <strong>Email:</strong>
                        ${person.email}
                    </p>

                    <p>
                        <strong>City:</strong>
                        ${person.city}
                    </p>

                </div>
            `;
        })
        .join("");
}

addBtn.addEventListener("click", () => {

    const name = nameInput.value.trim();

    if (name === "") {
        return;
    }

    if (favourites.includes(name)) {
        return;
    }

    favourites.push(name);

    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );

    nameInput.value = "";

    render();
    loadTeam();
});

clearBtn.addEventListener("click", () => {

    favourites = [];

    localStorage.removeItem("favourites");

    render();
    loadTeam();
});

function toggleFavourite(name) {

    if (favourites.includes(name)) {

        favourites = favourites.filter(
            item => item !== name
        );

    } else {

        favourites.push(name);
    }

    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );

    render();
    loadTeam();
};

render();
loadTeam();