document.addEventListener('DOMContentLoaded', () => {
    const bellButton = document.getElementById('bellButton');
    
    // --- IMPORTANT: Replace with the path to YOUR audio file ---
    const bellSoundFile = 'sounds/yt_sgi_bell.mp3'; 
    // --- You can also use other formats like .wav or .ogg if supported by browsers ---

    if (bellButton) {
        bellButton.addEventListener('click', () => {
            playSound();
        });
    } else {
        console.error("Button with ID 'bellButton' not found.");
    }

    function playSound() {
        // Create a new Audio object each time the button is clicked
        // This allows sounds to overlap (layer)
        const audio = new Audio(bellSoundFile);
        
        audio.play()
            .then(() => {
                // Optional: Code to run after sound starts playing
                // console.log("Bell sound started playing.");
            })
            .catch(error => {
                // Handle potential errors, e.g., file not found, browser restrictions
                console.error("Error playing sound:", error);
                // You might want to inform the user here, e.g.,
                // alert("Could not play the sound. Please check the audio file or browser settings.");
            });
    }

    // Optional: Preload the audio for faster first play, though for layering new instances are made anyway.
    // This might help if the *first* click has a slight delay.
    // function preloadAudio() {
    //     const audio = new Audio(bellSoundFile);
    //     audio.preload = 'auto'; 
    //     // Note: this preloads ONE instance. Subsequent clicks will still create new ones.
    // }
    // preloadAudio(); 
});