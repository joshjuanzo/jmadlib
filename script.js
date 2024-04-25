  const firebaseConfig = {
    apiKey: "AIzaSyAnWFDClviIDhiikJ9HFOsOUWAWCnQ9NhA",
    authDomain: "madlibs-42561.firebaseapp.com",
    projectId: "madlibs-42561",
    storageBucket: "madlibs-42561.appspot.com",
    messagingSenderId: "396455509428",
    appId: "1:396455509428:web:52b3071e484aae1d4086e1"
  };

  const app = firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  console.log("Firebase setup complete!");

  function createMadLib() {
    console.log("createMadLib() called");
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

    var storyName = document.getElementById("storyName").value;

document.getElementById("story").innerHTML = "The realm of <span class='noun'>" + noun_place + "</span> was a happy place until the evil knight, Sir <span class='adjective'>" + adjective + "</span> <span class='noun'>" + noun_things_plural + "</span>, stole the king's prized horse. '<span class='interjection'>" + interjection + "</span>! That's <span class='pronoun'>" + pronoun + "</span>,' yelled the king as the evil knight fled. The king gathered all of his townspeople and announced, 'Someone stole my horse and I know I won't feel better <span class='conjunction'>" + conjunction + "</span> horses <span class='verb'>" + verb + "</span> <span class='adverb'>" + adverb + "</span>. Who dares to fight this knight?' The crowd was silent. Then a young child named <span class='noun'>" + noun_person + "</span> stepped forward and said, 'I will!'. The child left before dusk, and in the morning, everyone was surprised because the child returned safely while riding the king's prized horse. 'The child did it,' the town cheered. There was much rejoicing <span class='preposition'>" + preposition + "</span> the horses. The end." + storyName;

var story = document.getElementById("story").innerHTML 
console.log("story: " + story);

    var storyData = {
      timestamp: Date.now(),
      story: storyHTML,
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
      storyName: storyName,
    };

    var storyJSON = JSON.stringify(storyData);
    console.log("storyJSON: " + storyJSON);

    return storyData;
  }

  function saveMadlib() {
    console.log("saveMadlib() called");

    var storyData = createMadLib();
    db.collection("madlibs").doc(storyData.storyName).set(storyData)
      .then(() => {
        alert(storyData.storyName + " saved to database!");
      })
      .catch((error) => {
        console.error("Error saving document: ", error);
        alert("Failed to save madlib!");
      });
  }

  function retrieveMadlib() {
    console.log("retrieveMadlib() called");

    var storyName = prompt("Enter the name of the story you want to look up:");
    db.collection("madlibs").doc(storyName).get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          var storyData = doc.data();

          document.getElementById("noun_person").value = storyData.noun_person;
          document.getElementById("noun_place").value = storyData.noun_place;
          document.getElementById("adjective").value = storyData.adjective;
          document.getElementById("noun_things_plural").value = storyData.noun_things_plural;
          document.getElementById("interjection").value = storyData.interjection;
          document.getElementById("preposition").value = storyData.preposition;
          document.getElementById("conjunction").value = storyData.conjunction;
          document.getElementById("pronoun").value = storyData.pronoun;
          document.getElementById("verb").value = storyData.verb;
          document.getElementById("adverb").value = storyData.adverb;

          document.getElementById("outputData").value = storyData.storyName;

          document.getElementById("story").innerHTML = storyData.story;
        } else {
          console.log("No such document!");
          document.getElementById("story").innerHTML = "Story not found!";
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
        document.getElementById("story").innerHTML = "Error retrieving story!";
      });
  }

  function deleteMadLib() {
    console.log("deleteMadLib() called");
    var storyName = prompt("Enter the name of the story you want to delete:");
    db.collection("madlibs").doc(storyName).get()
      .then((doc) => {
        if (doc.exists) {
          console.log("Document data:", doc.data());
          var storyData = doc.data();
          document.getElementById("story").innerHTML = storyData.storyName + " successfully deleted!";
          db.collection("madlibs").doc(storyName).delete();
        } else {
          console.log("No such document!");
          document.getElementById("story").innerHTML = "Story not found!";
        }
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
        document.getElementById("story").innerHTML = "Error deleting story!";
      });
  }