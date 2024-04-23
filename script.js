const firebaseConfig = {
    apiKey: "AIzaSyDWm7CFaAQ6mS32fOk1ITe09l1URRW1DH8",
    authDomain: "madlibs-2a935.firebaseapp.com",
    projectId: "madlibs-2a935",
    storageBucket: "madlibs-2a935.appspot.com",
    messagingSenderId: "130267669017",
    appId: "1:130267669017:web:5db8e9365603966eaf8088"
  };

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
console.log("firebase setup complete!");

function saveMadlib(){
  console.log("saveMadlib() called");

var outputData = createMadlib();
db.collection("madlibs").doc(outputData.outputName).set(outputData);
alert(outputData.outputName + " saved to database!");
}

function printMadLib() {
  console.log("printMadLib() called");
  var noun_person = document.getElementById('noun_person').value;
  var noun_place = document.getElementById('noun_place').value;
  var adjective = document.getElementById('adjective').value;
  var noun_things_plural = document.getElementById('noun_things_plural').value;
  var interjection = document.getElementById('interjection').value;
  var preposition = document.getElementById('preposition').value;
  var conjunction = document.getElementById('conjunction').value;
  var pronoun = document.getElementById('pronoun').value;
  var verb = document.getElementById('verb').value;
  var adverb = document.getElementById('adverb').value;

  document.getElementById('output').innerHTML = "The realm of <span class='noun'>" + noun_place + "</span> was a happy place until the evil knight, Sir <span class='adjective'>" + adjective + "</span> <span class='noun'>" + noun_things_plural + "</span>, stole the king's prized horse. '<span class='interjection'>" + interjection + "</span>! That's <span class='pronoun'>" + pronoun + "</span>,' yelled the king as the evil knight fled. The king gathered all of his townspeople and announced, 'Someone stole my horse and I know I won't feel better <span class='conjunction'>" + conjunction + "</span> horses <span class='verb'>" + verb + "</span> <span class='adverb'>" + adverb + "</span>. Who dares to fight this knight?' The crowd was silent. Then a young child named <span class='noun'>" + noun_person + "</span> stepped forward and said, 'I will!'. The child left before dusk, and in the morning, everyone was surprised because the child returned safely while riding the king's prized horse. 'The child did it,' the town cheered. There was much rejoicing <span class='preposition'>" + preposition + "</span> the horses. The end."; 
var output = document.getElementById("output").innerHTML;
console.log("story: " + output);

  var outputData = {
    timestamp: Date.now(),
    story: output,
    noun_person: noun_person,
    noun_place: noun_place,
    adjective: adjective,
    noun_things_plural: noun_things_plural,
    interjection: interjection,
    preposition: preposition,
    conjunction: conjunction,
    pronoun: pronoun,
    verb: verb,
    adverb: adverb,
};

var outputJSON = JSON.stringify(outputData)
console.log("outputJSON: "+ outputJSON);
  }
  
