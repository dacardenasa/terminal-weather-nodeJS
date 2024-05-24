const inquirer = require("inquirer");
require("colors");

const questions = [
  {
    type: "list",
    name: "option",
    message: "what do you wish to do?",
    choices: [
      {
        value: 1,
        name: `${"1.".green} Search city`
      },
      {
        value: 2,
        name: `${"2.".green} Show history`
      },
      {
        value: 0,
        name: `${"0.".green} Exit`
      }
    ]
  }
];

async function mainMenu() {
  console.clear();
  console.log("================================".green);
  console.log("       Select one option:       ".green);
  console.log("================================".green);

  const { option } = await inquirer.prompt(questions);
  return option;
}

async function pause() {
  await inquirer.prompt([
    {
      type: "input",
      name: "confirm",
      message: `Press ${"ENTER".green} to continue...`
    }
  ]);
}

async function readInput(message = "") {
  const question = [
    {
      type: "input",
      name: "field",
      message,
      validate(value) {
        if (value.length === 0) {
          return "field is empty!";
        }
        return true;
      }
    }
  ];

  const { field } = await inquirer.prompt(question);
  return field;
}

async function listPlaces(places = []) {
  if (!places.length) return null;
  const choices = places.map((place, index) => ({
    value: place.id,
    name: `${index + 1}.`.green + ` ${place.name}`
  }));

  choices.push({
    value: "0",
    name: "0.".green + " Cancelar"
  });

  const questions = [
    {
      type: "list",
      name: "id",
      message: "select",
      choices
    }
  ];

  const { id } = await inquirer.prompt(questions);
  return id;
}

module.exports = {
  mainMenu,
  pause,
  readInput,
  listPlaces,
};
