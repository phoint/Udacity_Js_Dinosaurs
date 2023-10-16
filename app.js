
// Create Dino Constructor
/**
 * @constructor
 * @description Represent a dinosaur
 * @param {string} species species of Dinosaur
 * @param {string} weight weight of Dinosaur
 * @param {string} height height of Dinosaur
 * @param {string} diet diet of Dinosaur
 * @param {string} where where Dinosaur has been found
 * @param {string} when when Dinosaur had appeared
 * @param {string} fact fact about Dinosaur
 */
function Dino(species, weight, height, diet, where, when, fact) {
    this.species = species;
    this.weight = weight;
    this.height = height;
    this.diet = diet;
    this.where = where;
    this.when = when;
    this.fact = fact;
}

// Create Dino Objects
async function createDinoObjects(human) {
    const response = await fetch('dino.json');
    const data = await response.json();
    return data.Dinos.map(e => {
        let dino = new Dino(e.species, e.weight, e.height, e.diet, e.where, e.when, e.fact);
        if (e.species !== 'Pigeon') {
            dino.randomFact(human);
        }
        return dino;
    });
}

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.weightCompare = function (human) {
    if (human.weight < this.weight) {
        const times = Math.fround(this.weight / human.weight).toFixed(2);
        return `${this.species} weigh ${times} times more than you`;
    } else if (human.weight > this.weight) {
        return `You are heavier than a ${this.species}`;
    } else {
        return `You and ${this.species} weigh the same`;
    }
}
// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.heightCompare = function (human) {
    let humanHeight = human.feet * 12 + human.inches;
    if (humanHeight < this.height) {
        const times = Math.fround(this.height / humanHeight).toFixed(2);
        return `${this.species} is ${times} times taller than you`;
    } else if (humanHeight > this.height) {
        return `You are taller than a ${this.species}`;
    } else {
        return `You and ${this.species} are the same height`;
    }
}
// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.dietCompare = function (human) {
    if (human.diet === this.diet) {
        return `You could share a dinner with ${this.species}`;
    } else if (this.diet === 'carnivor') {
        return `Watch out. You look like a delicious dinner of a ${this.species}`;
    } else if (this.diet === 'herbavor') {
        return `"Eating vegetables is good for your health", ${this.species} advised.`;
    } else {
        return `${this.species} was a ${this.diet}`;
    }
}
// Random Fact method
Dino.prototype.randomFact = function (human) {
    const randomNumber = Math.floor(Math.random() * 3);
    switch (randomNumber) {
        case 1:
            this.fact = this.dietCompare(human);
            break;
        case 2:
            this.fact = this.heightCompare(human);
            break;
        case 3:
            this.fact = this.dietCompare(human);
            break;
        case 0:
        default:
            console.log("Original fact: " + this.fact);
    }
}

// On button click, prepare and display infographic
const button = document.getElementById('btn');
button.addEventListener("click", (event) => {
    event.preventDefault();
    const human = {};
    // get human data from input form
    (function () {
        human.name = document.querySelector('#name').value;
        human.feet = document.querySelector('#feet').value;
        human.inches = document.querySelector('#inches').value;
        human.weight = document.querySelector('#weight').value;
        human.diet = document.querySelector('select').value;
        console.log(human);
    })();
    // prepare and generate ui
    const createDinos = async () => {
        const dinos = await createDinoObjects(human);
        dinos.splice(4, 0, human);
        console.log(dinos);
        dinos.forEach(element => {
            const grid = document.getElementById('grid');
            const heading = document.createElement("h3");
            const image = document.createElement("img");
            const fact = document.createElement("p");

            heading.textContent = element.name || element.species;
            image.src = `./images/${element.species || 'human'}.png`;
            if (element.fact) {
                fact.textContent = element.fact;
            }

            const tile = document.createElement("div");
            tile.className = "grid-item";
            tile.appendChild(heading);
            tile.appendChild(image);
            tile.appendChild(fact);

            grid.appendChild(tile);
        });
        // remove form when button click
        const form = document.getElementById("dino-compare");
        form.remove();

    }
    createDinos();
})
