var infoMenuElement;
var movesMenuElement;
var statsMenuElement;
var teamElement;
var currentPokemonMenuElement;
var currentMoveSlotElement;
var currentMoveList;

function onLoad() {
	infoMenuElement = document.getElementById("info-menu");
	movesMenuElement = document.getElementById("moves-menu");
	statsMenuElement = document.getElementById("stats-menu");
	teamElement = document.getElementById("team");
	currentPokemonMenuElement = document.getElementById("current-pokemon-menu");
	currentMoveList = document.getElementById("move-list-menu");
	
	addMove("test", "test", 32, "test", "test",);
}

// Hide Team Menu and Show Current Pokemon Menu
function chooseTeamSlot(slot) {
	teamElement.style.display = "none";
	currentPokemonMenuElement.style.display = "block";
	openInfoMenu();
}

// Hide Current Pokemon Menu and Show Team Menu
function goBack() {
	teamElement.style.display = "block";
	currentPokemonMenuElement.style.display = "none";
}

// Show the info menu and hide the other menus
function openInfoMenu() {
	infoMenuElement.style.display = "block";
	movesMenuElement.style.display = "none";
	statsMenuElement.style.display = "none";
}

// Show the moves menu and hide the other menus
function openMovesMenu() {
	infoMenuElement.style.display = "none";
	movesMenuElement.style.display = "block";
	statsMenuElement.style.display = "none";
}

// Show the stats menu and hide the other menus
function openStatsMenu() {
	infoMenuElement.style.display = "none";
	movesMenuElement.style.display = "none";
	statsMenuElement.style.display = "block";
}

// Set current move slot
function setCurrentMoveSlot(slot) {
	currentMoveSlotElement = document.getElementById(slot);
}

// Add a move
function addMove(name, type, basePower, category, description) {
	
	let moveSlotInformationElement = document.createElement("div");
	moveSlotInformationElement.setAttribute("class", "move-information");
	moveSlotInformationElement.setAttribute("id", name);
	moveSlotInformationElement.setAttribute("onclick", 'equipMove("' + name +'");');
	
	let moveNameElement = document.createElement("h5");
	moveNameElement.innerHTML = name;
	moveSlotInformationElement.appendChild(moveNameElement);
	
	let moveTypeElement = document.createElement("h6");
	moveTypeElement.innerHTML = "Type: " + type;
	moveSlotInformationElement.appendChild(moveTypeElement);
	
	let moveBasePowerElement = document.createElement("h6");
	moveBasePowerElement.innerHTML = "Base Power: " + basePower;
	moveSlotInformationElement.appendChild(moveBasePowerElement);
	
	let moveCategoryElement = document.createElement("h6");
	moveCategoryElement.innerHTML = category;
	moveSlotInformationElement.appendChild(moveCategoryElement);
	
	let moveDescriptionElement = document.createElement("h6");
	moveDescriptionElement.innerHTML = description;
	moveSlotInformationElement.appendChild(moveDescriptionElement);
	
	currentMoveList.appendChild(moveSlotInformationElement);
}

// Set move name 
function equipMove(slot) {
	if (currentMoveSlotElement) {
		let chosenMove = document.getElementById(slot);
		currentMoveSlotElement.innerHTML = chosenMove.innerHTML;
		currentMoveList.removeChild(chosenMove);
	} else {
		alert("Select a move slot!");
	}
}