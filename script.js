const nameInput = document.getElementById("nameInput");
const addBtn = document.getElementById("addBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("list");
const status = document.getElementById("status");
const team = document.getElementById("team");

let favourites = [];

const saved = localStorage.getItem("favourites");
favourites = saved ? JSON.parse(saved) : [];

function render() {
    list.innerHTML = favourites
        .map(name => `<li>${name}</li>`)
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
});

clearBtn.addEventListener("click", () => {
    favourites = [];

    localStorage.removeItem("favourites");

    render();
});

render();

function getTeam(done) {
    setTimeout(() => {
        done(["Asha", "Ravi", "Meera"]);
    }, 1000);
}

getTeam(team => console.log(team));

function getTeamPromise() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["Asha", "Ravi", "Meera"]);
        }, 1000);
    });
}

getTeamPromise()
    .then(team => console.log(team))
    .catch(err => console.log(err));

const URL = "https://jsonplaceholder.typicode.com/users";

async function loadTeam() {
    try {
        status.textContent = "Loading...";
        status.classList.remove("error");

        const res = await fetch(URL);

        if (!res.ok) {
            throw new Error("Could not load the team");
        }

        const people = await res.json();

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

                        <p><strong>Email:</strong> ${person.email}</p>

                        <p><strong>City:</strong> ${person.address.city}</p>
                    </div>
                `;
            })
            .join("");

        status.textContent = "";
    } catch (err) {
        status.textContent = err.message;
        status.classList.add("error");
    }
}

function toggleFavourite(name) {
    if (favourites.includes(name)) {
        favourites = favourites.filter(item => item !== name);
    } else {
        favourites.push(name);
    }

    localStorage.setItem(
        "favourites",
        JSON.stringify(favourites)
    );

    loadTeam();
}

loadTeam();