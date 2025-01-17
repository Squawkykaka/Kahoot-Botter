const kahoot = require("kahoot.js-latest");

const KAHOOT_PIN = process.argv[2];
const NUM_BOTS = process.argv[3];

const usedNames = new Set();

function getUniqueName() {
  let name;
  while (true) {
    name = getName();
    if (!usedNames.has(name)) {
      break;
    }
  }

  usedNames.add(name);
  return name;
}

function getName() {
  const adjs = [
    "Happy",
    "Fun",
    "Cool",
    "Smart",
    "Silly",
    "Sad",
    "Angry",
    "Mad",
    "Crazy",
    "Wild",
    "Savage",
    "Sick",
    "Tired",
    "Sleepy",
    "Bored",
    "Excited",
    "Hyper",
    "Lazy",
    "Dumb",
    "Weird",
    "Strange",
    "Funny",
    "Loud",
    "Quiet",
    "Shy",
    "Brave",
    "Scared",
    "Calm",
    "Clever",
    "Cute",
    "Evil",
    "Gentle",
    "Giant",
    "Glamorous",
    "Graceful",
    "Grouchy",
    "Hairy",
    "Handsome",
    "Helpful",
    "Hilarious",
    "Hungry",
    "Itchy",
    "Jealous",
    "Jittery",
    "Jolly",
    "Kind",
    "Lazy",
    "Light",
    "Lively",
    "Long",
    "Lovely",
    "Lucky",
    "Misty",
    "Motionless",
    "Muddy",
    "Mute",
    "Mysterious",
    "Nervous",
    "Nice",
    "Nutty",
    "Obedient",
    "Obnoxious",
    "Odd",
    "Old-fashioned",
    "Open",
    "Outrageous",
    "Outstanding",
    "Panicky",
    "Perfect",
    "Plain",
    "Pleasant",
    "Poised",
    "Poor",
    "Powerful",
    "Precious",
    "Prickly",
    "Proud",
    "Putrid",
    "Puzzled",
    "Quaint",
    "Real",
    "Relieved",
    "Repulsive",
    "Rich",
    "Scary",
    "Selfish",
    "Shiny",
    "Shy",
    "Silly",
    "Sleepy",
    "Smiling",
    "Sparkling",
    "Spotless",
    "Stormy",
    "Strange",
    "Stupid",
    "Successful",
    "Super",
    "Talented",
    "Tame",
    "Tasty",
    "Tender",
    "Tense",
    "Terrible",
    "Thankful",
    "Thoughtful",
    "Thoughtless",
    "Tired",
    "Tough",
    "Troubled",
    "Ugliest",
    "Ugly",
    "Uninterested",
    "Unsightly",
    "Unusual",
    "Upset",
    "Uptight",
    "Vast",
    "Victorious",
    "Vivacious",
    "Wandering",
    "Weary",
    "Wicked",
    "Wide-eyed",
    "Wild",
    "Witty",
    "Worrisome",
    "Worried",
    "Wrong",
    "Zany",
  ];
  const nouns = [
    "Bot",
    "Player",
    "Dog",
    "Cat",
    "Alien",
    "Human",
    "Person",
    "Thing",
    "Animal",
    "Pig",
  ];

  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    " " +
    nouns[Math.floor(Math.random() * nouns.length)]
  );
}

if (NUM_BOTS <= 0) {
  console.error("Number of bots must be greater than 0");
  process.exit(1);
}
console.log(`${NUM_BOTS} Bots joining on ${KAHOOT_PIN}`);

const clients = [];

// Create a bot with a specified name and using the KAHOOT_PIN
function createBot(name, teamnames) {
  console.log(`Joining as ${name}...`);
  const client = new kahoot();

  client.join(KAHOOT_PIN, name, teamnames).catch((err) => {
    console.log("Failed to join: " + err.description || err.status);
  });

  client.on("Disconnect", (reason) => {
    console.log(`${name} disconnected: ${reason}`);
  });

  clients.push(client);
}

async function createBots() {
  for (let i = 0; i < NUM_BOTS; i++) {
    const name = getUniqueName();
    const teamnames = [
      getUniqueName(),
      getUniqueName(),
      getUniqueName(),
      getUniqueName(),
    ];
    createBot(name, teamnames);

    // Wait 1.5 seconds between each bot to avoid rate limiting
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
}

createBots().then(() => {
  console.log(`Joined all bots!`);

  clients[0].on("QuizStart", () => {
    console.log("The quiz has started!");
  });
  clients[0].on("QuizEnd", () => {
    console.log("The quiz has ended!");
  });

  clients.forEach((client) => {
    client.on("QuestionStart", (question) => {
      let answerIndex;

      answerIndex = Math.floor(Math.random() * 5);

      question.answer(answerIndex);
    });

    client.on("QuizEnd", () => {
      client.leave();
    });
  });
});
