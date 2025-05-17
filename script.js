let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

// Speak function
function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-US";
    window.speechSynthesis.speak(text_speak);
}

// Greeting based on time of day
function wishMe() {
    let hours = new Date().getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good Morning sir");
    } else if (hours >= 12 && hours < 16) {
        speak("Good Afternoon sir");
    } else {
        speak("Good Evening sir");
    }
}

// On window load
window.addEventListener("load", () => {
    wishMe();
});

// Speech recognition setup
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.continuous = false;
recognition.lang = "en-US";
recognition.interimResults = false;
recognition.maxAlternatives = 1;

// When the microphone button is clicked
btn.addEventListener("click", () => {
    console.log("Microphone button clicked. Starting recognition...");
    recognition.start();
    btn.style.display = "none"; // Hide button when recognition starts
    voice.style.display = "block"; // Show listening gif
});

// When voice input result is received
recognition.onresult = (event) => {
    let transcript = event.results[0][0].transcript;
    console.log("Transcript received:", transcript);
    content.innerText = transcript;
    takeCommand(transcript.toLowerCase());
};

// Function to process commands
function takeCommand(message) {
    console.log("Command received:", message);

    if (message.includes("hello") || message.includes("hey")) {
        speak("Hello sir, what can I help you?");
    }
    else if (message.includes("who are you")) {
        speak("I am your virtual assistant, created by Sakshi.");
    }
    else if (message.includes("open youtube")) {
        speak("Opening YouTube...");
        setTimeout(() => {  // Wait for speech to finish before opening
            window.open("https://www.youtube.com", "_blank");
        }, 1000);  // Delay added
    }
    else if (message.includes("open google")) {
        speak("Opening Google...");
        setTimeout(() => {  // Wait for speech to finish before opening
            window.open("https://www.google.com", "_blank");
        }, 1000);  // Delay added
    }
    else if (message.includes("open facebook")) {
        speak("Opening Facebook...");
        setTimeout(() => {  // Wait for speech to finish before opening
            window.open("https://www.facebook.com", "_blank");
        }, 1000);  // Delay added
    }
    else if (message.includes("open instagram")) {
        speak("Opening Instagram...");
        setTimeout(() => {  // Wait for speech to finish before opening
            window.open("https://www.instagram.com", "_blank");
        }, 1000);  // Delay added
    }
    else if (message.includes("time")) {
        let time = new Date().toLocaleTimeString();
        speak("Current time is " + time);
    }
    else if (message.includes("date")) {
        let date = new Date().toLocaleDateString();
        speak("Today's date is " + date);
    }
    else {
        let query = message.replace("open", "").replace("search", "").trim();
        if (query) {
            if (message.includes("youtube") || message.includes("song")) {
                let url = `https://www.youtube.com/results?search_query=${query}`;
                speak(`Searching for ${query} on YouTube`);
                window.open(url, "_blank");
            } else {
                let url = `https://www.google.com/search?q=${query}`;
                speak(`Searching for ${query}`);
                window.open(url, "_blank");
            }
        } else {
            speak("Sorry, I couldn't understand the command.");
        }
    }
}

// If there's an error with speech recognition
recognition.onerror = (event) => {
    console.log("Error: " + event.error);
    speak("Sorry, I couldn't hear that. Please try again.");
};

// If speech recognition ends
recognition.onend = () => {
    console.log("Speech recognition ended.");
    btn.style.display = "block";  // Show the mic button again
    voice.style.display = "none";  // Hide the voice gif
};



