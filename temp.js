var fs = require("fs");
// let q = fs.readFileSync("./src/Quiz.json");
let q = require("./src/Quiz.json");
// q = JSON.parse(q);
let questions = [];
const entities = {
  "&#039;": "'",
  "&quot;": '"',
  // add more if needed
};
q.map((e) => {
  let questionText = e.questionText;
  let answerOption = e.answerOption;
  let correct = e.correct;
  questionText = questionText.replace(/&#?\w+;/g, (match) => entities[match]);

  answerOption = answerOption.map((e) => {
    const answerText = e.answerText.replace(
      /&#?\w+;/g,
      (match) => entities[match]
    );
    const isCorrect = e.isCorrect;
    return { isCorrect, answerText };
  });
  correct = correct.replace(/&#?\w+;/g, (match) => entities[match]);

  // console.log(questionText, answerOption);
  e.answerOption = answerOption;
  e.questionText = questionText;
  e.correct = correct;
  questions.push({ questionText, correct, answerOption });
});
console.log(questions[0].answerOption);

fs.writeFile("./src/Quiz.json", JSON.stringify(questions), (err) => {
  if (err) throw err;
  console.log("file created");
});

/*


[
  {
    "questionText": "In any programming language, what is the most common way to iterate through an array?",
    "correct": "&#039;For&#039; loops",
    "answerOption": [
      { "answerText": "&#039;For&#039; loops", "isCorrect": true },
      { "answerText": "&#039;If&#039; Statements", "isCorrect": false },
      { "answerText": "&#039;Do-while&#039; loops", "isCorrect": false },
      { "answerText": "&#039;While&#039; loops", "isCorrect": false }
    ]
  },
  {
    "questionText": "Which computer hardware device provides an interface for all other connected devices to communicate?",
    "correct": "Motherboard",
    "answerOption": [
      { "answerText": "Central Processing Unit", "isCorrect": false },
      { "answerText": "Hard Disk Drive", "isCorrect": false },
      { "answerText": "Motherboard", "isCorrect": true },
      { "answerText": "Random Access Memory", "isCorrect": false }
    ]
  },
  {
    "questionText": "If you were to code software in this language you&#039;d only be able to type 0&#039;s and 1&#039;s",
    "correct": "Binary",
    "answerOption": [
      { "answerText": "JavaScript", "isCorrect": false },
      { "answerText": "Binary", "isCorrect": true },
      { "answerText": "C++", "isCorrect": false },
      { "answerText": "Python", "isCorrect": false }
    ]
  },
  {
    "questionText": "The series of the Intel HD graphics generation succeeding that of the 5000 and 6000 series (Broadwell) is called:",
    "correct": "HD Graphics 500",
    "answerOption": [
      { "answerText": "HD Graphics 700 ", "isCorrect": false },
      { "answerText": "HD Graphics 600", "isCorrect": false },
      { "answerText": "HD Graphics 500", "isCorrect": true },
      { "answerText": "HD Graphics 7000", "isCorrect": false }
    ]
  },
  {
    "questionText": "How many kilobytes in one gigabyte (in decimal)?",
    "correct": "1000000",
    "answerOption": [
      { "answerText": "1000000", "isCorrect": true },
      { "answerText": "1024", "isCorrect": false },
      { "answerText": "1000", "isCorrect": false },
      { "answerText": "1048576", "isCorrect": false }
    ]
  },
  {
    "questionText": "This mobile OS held the largest market share in 2012",
    "correct": "iOS",
    "answerOption": [
      { "answerText": "Android", "isCorrect": false },
      { "answerText": "BlackBerry", "isCorrect": false },
      { "answerText": "iOS", "isCorrect": true },
      { "answerText": "Symbian", "isCorrect": false }
    ]
  },
  {
    "questionText": "The C programming language was created by this American computer scientist ",
    "correct": "Dennis Ritchie",
    "answerOption": [
      { "answerText": "Tim Berners Lee", "isCorrect": false },
      { "answerText": "al-Khwārizmī", "isCorrect": false },
      { "answerText": "Dennis Ritchie", "isCorrect": true },
      { "answerText": "Willis Ware", "isCorrect": false }
    ]
  },
  {
    "questionText": "Which programming language shares its name with an island in Indonesia?",
    "correct": "Java",
    "answerOption": [
      { "answerText": "Python", "isCorrect": false },
      { "answerText": "C", "isCorrect": false },
      { "answerText": "Java", "isCorrect": true },
      { "answerText": "Jakarta", "isCorrect": false }
    ]
  },
  {
    "questionText": "How long is an IPv6 address?",
    "correct": "128 bits",
    "answerOption": [
      { "answerText": "32 bits", "isCorrect": false },
      { "answerText": "64 bits", "isCorrect": false },
      { "answerText": "128 bits", "isCorrect": true },
      { "answerText": "128 bytes", "isCorrect": false }
    ]
  },
  {
    "questionText": "What language does Nodejs use?",
    "correct": "JavaScript",
    "answerOption": [
      { "answerText": "Java", "isCorrect": false },
      { "answerText": "Java Source", "isCorrect": false },
      { "answerText": "JavaScript", "isCorrect": true },
      { "answerText": "Joomla Source Code", "isCorrect": false }
    ]
  },
  {
    "questionText": "What does CPU stand for?",
    "correct": "Central Processing Unit",
    "answerOption": [
      { "answerText": "Central Process Unit", "isCorrect": false },
      { "answerText": "Central Processing Unit", "isCorrect": true },
      { "answerText": "Computer Personal Unit", "isCorrect": false },
      { "answerText": "Central Processor Unit", "isCorrect": false }
    ]
  },
  {
    "questionText": "In web design, what does CSS stand for?",
    "correct": "Cascading Style Sheet",
    "answerOption": [
      { "answerText": "Counter Strike: Source", "isCorrect": false },
      { "answerText": "Cascading Style Sheet", "isCorrect": true },
      { "answerText": "Corrective Style Sheet", "isCorrect": false },
      { "answerText": "Computer Style Sheet", "isCorrect": false }
    ]
  },
  {
    "questionText": "The numbering system with a radix of 16 is more commonly referred to as ",
    "correct": "Hexidecimal",
    "answerOption": [
      { "answerText": "Hexidecimal", "isCorrect": true },
      { "answerText": "Binary", "isCorrect": false },
      { "answerText": "Duodecimal", "isCorrect": false },
      { "answerText": "Octal", "isCorrect": false }
    ]
  },
  {
    "questionText": "How many values can a single byte represent?",
    "correct": "256",
    "answerOption": [
      { "answerText": "8", "isCorrect": false },
      { "answerText": "1", "isCorrect": false },
      { "answerText": "256", "isCorrect": true },
      { "answerText": "1024", "isCorrect": false }
    ]
  },
  {
    "questionText": "What does the computer software acronym JVM stand for?",
    "correct": "Java Virtual Machine",
    "answerOption": [
      { "answerText": "Java Virtual Machine", "isCorrect": true },
      { "answerText": "Java Vendor Machine", "isCorrect": false },
      { "answerText": "Java Visual Machine", "isCorrect": false },
      { "answerText": "Just Virtual Machine", "isCorrect": false }
    ]
  },
  {
    "questionText": "According to the International System of Units, how many bytes are in a kilobyte of RAM?",
    "correct": "1000",
    "answerOption": [
      { "answerText": "512", "isCorrect": false },
      { "answerText": "1024", "isCorrect": false },
      { "answerText": "1000", "isCorrect": true },
      { "answerText": "500", "isCorrect": false }
    ]
  },
  {
    "questionText": "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    "correct": "Final",
    "answerOption": [
      { "answerText": "Static", "isCorrect": false },
      { "answerText": "Private", "isCorrect": false },
      { "answerText": "Final", "isCorrect": true },
      { "answerText": "Public", "isCorrect": false }
    ]
  },
  {
    "questionText": "What is the most preferred image format used for logos in the Wikimedia database?",
    "correct": "svg",
    "answerOption": [
      { "answerText": "png", "isCorrect": false },
      { "answerText": "jpeg", "isCorrect": false },
      { "answerText": "svg", "isCorrect": true },
      { "answerText": "gif", "isCorrect": false }
    ]
  },
  {
    "questionText": "In &quot;Hexadecimal&quot;, what color would be displayed from the color code? &quot;#00FF00&quot;?",
    "correct": "Green",
    "answerOption": [
      { "answerText": "Red", "isCorrect": false },
      { "answerText": "Blue", "isCorrect": false },
      { "answerText": "Green", "isCorrect": true },
      { "answerText": "Yellow", "isCorrect": false }
    ]
  },
  {
    "questionText": "In computing, what does LAN stand for?",
    "correct": "Local Area Network",
    "answerOption": [
      { "answerText": "Long Antenna Node", "isCorrect": false },
      { "answerText": "Light Access Node", "isCorrect": false },
      { "answerText": "Local Area Network", "isCorrect": true },
      { "answerText": "Land Address Navigation", "isCorrect": false }
    ]
  },
  {
    "questionText": "What does the &quot;MP&quot; stand for in MP3?",
    "correct": "Moving Picture",
    "answerOption": [
      { "answerText": "Music Player", "isCorrect": false },
      { "answerText": "Moving Picture", "isCorrect": true },
      { "answerText": "Multi Pass", "isCorrect": false },
      { "answerText": "Micro Point", "isCorrect": false }
    ]
  },
  {
    "questionText": "On Twitter, what is the character limit for a Tweet?",
    "correct": "140",
    "answerOption": [
      { "answerText": "140", "isCorrect": true },
      { "answerText": "120", "isCorrect": false },
      { "answerText": "160", "isCorrect": false },
      { "answerText": "100", "isCorrect": false }
    ]
  },
  {
    "questionText": "What does GHz stand for?",
    "correct": "Gigahertz",
    "answerOption": [
      { "answerText": "Gigahertz", "isCorrect": true },
      { "answerText": "Gigahotz", "isCorrect": false },
      { "answerText": "Gigahetz", "isCorrect": false },
      { "answerText": "Gigahatz", "isCorrect": false }
    ]
  },
  {
    "questionText": "The programming language &#039;Swift&#039; was created to replace what other programming language?",
    "correct": "Objective-C",
    "answerOption": [
      { "answerText": "Objective-C", "isCorrect": true },
      { "answerText": "C#", "isCorrect": false },
      { "answerText": "Ruby", "isCorrect": false },
      { "answerText": "C++", "isCorrect": false }
    ]
  },
  {
    "questionText": "What does LTS stand for in the software market?",
    "correct": "Long Term Support",
    "answerOption": [
      { "answerText": "Long Taco Service", "isCorrect": false },
      { "answerText": "Ludicrous Transfer Speed", "isCorrect": false },
      { "answerText": "Long Term Support", "isCorrect": true },
      { "answerText": "Ludicrous Turbo Speed", "isCorrect": false }
    ]
  },
  {
    "questionText": "In computing, what does MIDI stand for?",
    "correct": "Musical Instrument Digital Interface",
    "answerOption": [
      {
        "answerText": "Musical Interface of Digital Instruments",
        "isCorrect": false
      },
      {
        "answerText": "Musical Instrument Digital Interface",
        "isCorrect": true
      },
      {
        "answerText": "Modular Interface of Digital Instruments",
        "isCorrect": false
      },
      { "answerText": "Musical Instrument Data Interface", "isCorrect": false }
    ]
  },
  {
    "questionText": "What is the code name for the mobile operating system Android 70?",
    "correct": "Nougat",
    "answerOption": [
      { "answerText": "Nougat", "isCorrect": true },
      { "answerText": "Ice Cream Sandwich", "isCorrect": false },
      { "answerText": "Jelly Bean", "isCorrect": false },
      { "answerText": "Marshmallow", "isCorrect": false }
    ]
  },
  {
    "questionText": "What is the domain name for the country Tuvalu?",
    "correct": "tv",
    "answerOption": [
      { "answerText": "tv", "isCorrect": true },
      { "answerText": "tu", "isCorrect": false },
      { "answerText": "tt", "isCorrect": false },
      { "answerText": "tl", "isCorrect": false }
    ]
  },
  {
    "questionText": "Which company was established on April 1st, 1976 by Steve Jobs, Steve Wozniak and Ronald Wayne?",
    "correct": "Apple",
    "answerOption": [
      { "answerText": "Apple", "isCorrect": true },
      { "answerText": "Microsoft", "isCorrect": false },
      { "answerText": "Atari", "isCorrect": false },
      { "answerText": "Commodore", "isCorrect": false }
    ]
  },
  {
    "questionText": "When Gmail first launched, how much storage did it provide for your email?",
    "correct": "1GB",
    "answerOption": [
      { "answerText": "1GB", "isCorrect": true },
      { "answerText": "512MB", "isCorrect": false },
      { "answerText": "5GB", "isCorrect": false },
      { "answerText": "Unlimited", "isCorrect": false }
    ]
  },
  {
    "questionText": "What does the Prt Sc button do?",
    "correct": "Captures what&#039;s on the screen and copies it to your clipboard",
    "answerOption": [
      { "answerText": "Nothing", "isCorrect": false },
      {
        "answerText": "Captures what&#039;s on the screen and copies it to your clipboard",
        "isCorrect": true
      },
      {
        "answerText": "Saves a png file of what&#039;s on the screen in your screenshots folder in photos",
        "isCorrect": false
      },
      { "answerText": "Closes all windows", "isCorrect": false }
    ]
  }
]



*/
