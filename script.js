const projects = [
    {
        title: "Portfolio Website",
        description: "Een responsive portfolio website gemaakt met HTML, CSS en JavaScript.",
        technologies: "HTML, CSS, JavaScript",
        category: "Web",
        image: "images/project1.jpg"
    },
    {
        title: "EscapeScrummy",
        description: "Een Escaperoom game waarbij je een Dungeon moest ontsnappen. Dit wordt gespeeld in een IDE, zoals IntelliJ. De Dungeon bevat puzzles, vragen en gevaarlijke monsters.",
        technologies: "Java",
        category: "Software",
        image: "images/project2.jpg"
    },
];



const projectList = document.querySelector("#project-list");
const projectFilter = document.querySelector("#project-filter");

const renderProjects = (selectedCategory = "all") => {
    if (!projectList) {
        return;
    }

    projectList.replaceChildren();

    const filteredProjects = projects.filter((project) => {
        return selectedCategory === "all" ||
            project.category === selectedCategory;
    });

    if (filteredProjects.length === 0) {
        const message = document.createElement("p");
        message.textContent = "Geen projecten gevonden.";
        projectList.appendChild(message);
        return;
    }

    filteredProjects.forEach((project) => {
        const article = document.createElement("article");
        article.classList.add("project-card");

        const image = document.createElement("img");
        image.src = project.image;
        image.alt = `Afbeelding van ${project.title}`;

        const content = document.createElement("div");
        content.classList.add("project-content");

        const title = document.createElement("h3");
        title.textContent = project.title;

        const description = document.createElement("p");
        description.textContent = project.description;

        const technologies = document.createElement("p");

        const technologyLabel = document.createElement("strong");
        technologyLabel.textContent = "Technieken: ";

        technologies.appendChild(technologyLabel);
        technologies.append(project.technologies);

        content.appendChild(title);
        content.appendChild(description);
        content.appendChild(technologies);

        article.appendChild(image);
        article.appendChild(content);

        projectList.appendChild(article);
    });
};

if (projectList) {
    renderProjects();
}

if (projectFilter) {
    projectFilter.addEventListener("change", (event) => {
        renderProjects(event.target.value);
    });
}



const form = document.querySelector("#contact-form");

const velden = [
    {
        id: "name",
        boodschap: "Vul minimaal 2 tekens in."
    },
    {
        id: "email",
        boodschap: "Vul een geldig e-mailadres in."
    },
    {
        id: "message",
        boodschap: "Schrijf minimaal 10 tekens."
    }
];

function valideerVeld(veld) {
    const input = document.querySelector(`#${veld.id}`);
    const foutmelding = document.querySelector(`#${veld.id}-error`);

    const geldig = input.checkValidity();

    input.setAttribute("aria-invalid", String(!geldig));

    foutmelding.textContent = geldig ? "" : veld.boodschap;

    return geldig;
}

if (form) {
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const alleGeldig = velden
            .map(valideerVeld)
            .every(Boolean);

        const status = document.querySelector("#form-message");

        if (!alleGeldig) {
            status.textContent =
                "Er zijn nog fouten in het formulier.";
            return;
        }

        status.textContent =
            "Bericht verzonden! Bedankt.";

        form.reset();

        velden.forEach((veld) => {
            const input = document.querySelector(`#${veld.id}`);
            input.setAttribute("aria-invalid", "false");
        });
    });
}



const weatherContainer = document.querySelector("#weather-content");
const weatherStatus = document.querySelector("#weather-status");

const createWeatherElement = (label, value) => {
    const paragraph = document.createElement("p");

    const strong = document.createElement("strong");
    strong.textContent = `${label}: `;

    paragraph.appendChild(strong);
    paragraph.append(value);

    return paragraph;
};

const showWeatherError = (message) => {
    if (!weatherStatus) {
        return;
    }

    weatherStatus.textContent = message;
    weatherStatus.className = "weather-status error";
};

const getWeather = async (latitude, longitude) => {
    const url =
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m` +
        `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("De weergegevens konden niet worden opgehaald.");
    }

    return response.json();
};

const displayWeather = (data) => {
    if (!weatherContainer || !weatherStatus) {
        return;
    }

    weatherContainer.replaceChildren();

    const temperature = createWeatherElement(
        "Temperatuur",
        `${data.current.temperature_2m} ${data.current_units.temperature_2m}`
    );

    const humidity = createWeatherElement(
        "Luchtvochtigheid",
        `${data.current.relative_humidity_2m}%`
    );

    const wind = createWeatherElement(
        "Windsnelheid",
        `${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`
    );

    weatherContainer.appendChild(temperature);
    weatherContainer.appendChild(humidity);
    weatherContainer.appendChild(wind);

    weatherStatus.textContent = "Actuele gegevens geladen.";
    weatherStatus.className = "weather-status success";
};

const loadWeather = () => {
    if (!weatherContainer || !weatherStatus) {
        return;
    }

    weatherStatus.textContent = "Actuele weersgegevens worden geladen...";
    weatherStatus.className = "weather-status loading";

    if (!navigator.geolocation) {
        showWeatherError(
            "Je browser ondersteunt geen locatiebepaling."
        );
        return;
    }

    navigator.geolocation.getCurrentPosition(
        async (position) => {
            try {
                const { latitude, longitude } = position.coords;
                const weatherData =
                    await getWeather(latitude, longitude);

                displayWeather(weatherData);
            } catch (error) {
                showWeatherError(
                    "De actuele weersgegevens konden niet worden geladen."
                );
            }
        },
        () => {
            showWeatherError(
                "Locatietoegang is geweigerd. Geef toestemming om het weer te tonen."
            );
        }
    );
};

loadWeather();