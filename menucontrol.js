var infoMenuElement;
var infoMenuButtonElement;
var movesMenuElement;
var movesMenuButtonElement;
var statsMenuElement;
var statsMenuButtonElement;
var teamElement;
var currentPokemonMenuElement;
var currentPokemonSelectedElement;
var currentPokemonSlotIndex;
var currentMoveSlotElement;
var currentMoveList;

var currentTeam = new Array(6);

// Initializing variables once the page loads
function onLoad() {
	// Get elements for later
	infoMenuElement = document.getElementById("info-menu");
	infoMenuButtonElement = document.getElementById("info-menu-button");
	movesMenuElement = document.getElementById("moves-menu");
	movesMenuButtonElement = document.getElementById("moves-menu-button");
	statsMenuElement = document.getElementById("stats-menu");
	statsMenuButtonElement = document.getElementById("stats-menu-button");
	teamElement = document.getElementById("team");
	currentPokemonMenuElement = document.getElementById("current-pokemon-menu");
	currentMoveList = document.getElementById("move-list-menu");

	buildPokeDropdowns();
}

async function createPokemon(event){
	const Poke = new Pokedex.Pokedex();
	const id = event.target.value;
	const rawPokemon = await Poke.getPokemon(id);
	const pokemon = new Pokemon(rawPokemon);
	console.log(pokemon.name);
	currentTeam[currentPokemonSlotIndex] = pokemon;
}

function setPokemonLevel(event){
	currentTeam[currentPokemonSlotIndex].level = event.target.value;
}

async function buildPokeDropdowns(){
	const template = document.getElementById("t-poke-dropdown");
    for(const el of document.querySelectorAll(".poke-dropdown")){
        const clone = template.content.cloneNode(true);
        el.appendChild(clone);
		el.addEventListener("change", (event) => {

		});
    }
}

// Choosing a Pokemon Slot in the Current Team UI
function chooseTeamSlot(slot) {
	// Hide Team Menu
	teamElement.style.display = "none";
	
	// Show Current Pokemon Menu
	currentPokemonMenuElement.style.display = "block";
	
	// Save user's selected slot
	currentPokemonSelectedElement = document.getElementById(slot);
	currentPokemonSlotIndex = +slot[8] - 1;
	
	openInfoMenu();
	
	setCurrentMoveSlot("move-slot-1");
}

// Return Button 
function goBack() {
	// Hide Current Pokemon Menu
	teamElement.style.display = "block";
	
	// Show Team Menu
	currentPokemonMenuElement.style.display = "none";
	
	const pokemon = currentTeam[currentPokemonSlotIndex];
	currentPokemonSelectedElement.innerText = pokemon ? `Level ${pokemon.level} ${pokemon.name}` : "Empty";

	// Remove user's selected slot
	currentPokemonSelectedElement = "";
}

// populate ability dropdown based on current pokemon
function generateAbilities(pokemon){
	
	const abilitySelector = document.querySelector("#current-pokemon-abilities-select select");
	abilitySelector.innerHTML = "";
	if(pokemon){
		for(const ability of pokemon.abilities){
			abilitySelector.innerHTML += /*html*/`<option value="${ability.name}">${ability.name}</option>`;
		}
	}
}

// Show the info menu and hide the other menus
function openInfoMenu() {
	infoMenuElement.style.display = "block";
	movesMenuElement.style.display = "none";
	statsMenuElement.style.display = "none";
	infoMenuButtonElement.style.borderBottomWidth = "0px";
	movesMenuButtonElement.style.borderBottomWidth = "1px";
	statsMenuButtonElement.style.borderBottomWidth = "1px";

	// populate menu from pokemon object
	const pokemon = currentTeam[currentPokemonSlotIndex];
	document.getElementById("pokemonPicker").value = pokemon ? pokemon.id : "empty";
	document.getElementById("current-pokemon-level").value = pokemon ? 50 : pokemon.level;
	generateAbilities(pokemon);
}

// Show the moves menu and hide the other menus
function openMovesMenu() {
	infoMenuElement.style.display = "none";
	movesMenuElement.style.display = "block";
	statsMenuElement.style.display = "none";
	infoMenuButtonElement.style.borderBottomWidth = "1px";
	movesMenuButtonElement.style.borderBottomWidth = "0px";
	statsMenuButtonElement.style.borderBottomWidth = "1px";
}

// Show the stats menu and hide the other menus
function openStatsMenu() {
	infoMenuElement.style.display = "none";
	movesMenuElement.style.display = "none";
	statsMenuElement.style.display = "block";
	infoMenuButtonElement.style.borderBottomWidth = "1px";
	movesMenuButtonElement.style.borderBottomWidth = "1px";
	statsMenuButtonElement.style.borderBottomWidth = "0px";
}

// Set current move slot
function setCurrentMoveSlot(slot) {
	currentMoveSlotElement = document.getElementById(slot);
}

// Add a move
function addMove(name, type, basePower, category, description) {
	
	// Create the div element
	let moveSlotInformationElement = document.createElement("div");
	
	// Set its class to move-information
	moveSlotInformationElement.setAttribute("class", "move-information");
	
	// Set id to name
	moveSlotInformationElement.setAttribute("id", name);
	
	// Set onclick function to equipMove(name)
	moveSlotInformationElement.setAttribute("onclick", 'equipMove("' + name +'");');
	
	// Create Move Name Heading
	let moveNameElement = document.createElement("h5");
	moveNameElement.setAttribute("id", name + "-name");
	moveNameElement.innerHTML = name;
	
	// Add Move Name Heading to div
	moveSlotInformationElement.appendChild(moveNameElement);
	
	// Create Type Heading
	let moveTypeElement = document.createElement("h6");
	moveTypeElement.innerHTML = "Type: ";
	
	// Add Type Heading to div
	moveSlotInformationElement.appendChild(moveTypeElement);

	// Create Type Paragraph
	let moveTypeParagraphElement = document.createElement("p");
	moveTypeParagraphElement.setAttribute("id", name + "-type");
	moveTypeParagraphElement.innerText = type;
	
	// Add Type Paragraph to div
	moveSlotInformationElement.appendChild(moveTypeParagraphElement);
	
	// Create Base Power Heading
	let moveBasePowerElement = document.createElement("h6");
	moveBasePowerElement.innerHTML = "Base Power: ";
	
	// Add Base Power Heading to div
	moveSlotInformationElement.appendChild(moveBasePowerElement);
	
	// Create Base Power Paragraph
	let moveBasePowerParagraphElement = document.createElement("p");
	moveBasePowerParagraphElement.setAttribute("id", name + "-basepower");
	moveBasePowerParagraphElement.innerText = basePower;
	
	// Add Base Power Paragraph to div
	moveSlotInformationElement.appendChild(moveBasePowerParagraphElement);
	
	// Create Category Heading
	let moveCategoryElement = document.createElement("h6");
	moveCategoryElement.innerHTML = "Category: ";
	
	// Add Category Heading to div
	moveSlotInformationElement.appendChild(moveCategoryElement);
	
	// Create Category Paragraph
	let moveCategoryPargraphElement = document.createElement("p");
	moveCategoryPargraphElement.setAttribute("id", name + "-category");
	moveCategoryPargraphElement.innerHTML = category;
	
	// Add Category Paragraph to div
	moveSlotInformationElement.appendChild(moveCategoryPargraphElement);
	
	// Create Description Heading
	let moveDescriptionElement = document.createElement("h6");
	moveDescriptionElement.setAttribute("id", name + "-description");
	moveDescriptionElement.innerHTML = description;
	moveSlotInformationElement.appendChild(moveDescriptionElement);
	
	currentMoveList.appendChild(moveSlotInformationElement);
}

// Set move name 
function equipMove(slot) {
	// If user selected a slot
	if (currentMoveSlotElement) {
		// Get selected slot
		let chosenMove = document.getElementById(slot);
		
		if (currentMoveSlotElement.innerText != "Empty") {
			let moveName = currentMoveSlotElement.firstChild.id.substr(0, currentMoveSlotElement.firstChild.id.length-5);
			console.log(moveName);
			addMove(moveName, document.getElementById(moveName + "-type").innerText, document.getElementById(moveName + "-basepower").innerText, document.getElementById(moveName + "-category").innerText, document.getElementById(moveName + "-description").innerText);
		}

		// Set selected slots HTMl to chosen move's HTML
		currentMoveSlotElement.innerHTML = chosenMove.innerHTML;
		
		// Remove item from list
		currentMoveList.removeChild(chosenMove);
	} else {
		alert("Select a move slot!");
	}
}