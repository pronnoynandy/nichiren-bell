document.addEventListener('DOMContentLoaded', () => {
    const bellButton = document.getElementById('bellButton');
    const soundSelector = document.getElementById('soundSelector');
    const dampenButton = document.getElementById('dampenButton');

    // --- IMPORTANT: Make sure your sound files exist at these paths ---
    // These are now dynamically read from the soundSelector's options
    // Example initial sound files (ensure these match your <option> values in HTML)
    // const defaultSound1 = 'sounds/bell_recording.mp3';
    // const defaultSound2 = 'sounds/yt_sgi_bell.mp3';

    let activeSounds = []; // Array to keep track of currently playing sounds

    if (bellButton && soundSelector && dampenButton) {
        bellButton.addEventListener('click', playSelectedSound);

        dampenButton.addEventListener('click', dampenAllSounds);

    } else {
        console.error("One or more essential page elements (bellButton, soundSelector, dampenButton) not found.");
    }

    function playSelectedSound() {
        const selectedSoundFile = soundSelector.value; // Get the selected sound file path
        if (!selectedSoundFile) {
            console.error("No sound file selected or sound path is invalid.");
            return;
        }

        const audio = new Audio(selectedSoundFile);
        activeSounds.push(audio); // Add to our list of active sounds

        audio.play()
            .then(() => {
                // console.log(`Playing: ${selectedSoundFile}`);
            })
            .catch(error => {
                console.error("Error playing sound:", selectedSoundFile, error);
                // Remove from active sounds if playback fails immediately
                activeSounds = activeSounds.filter(sound => sound !== audio);
            });

        // When a sound finishes playing, remove it from the activeSounds array
        audio.addEventListener('ended', () => {
            activeSounds = activeSounds.filter(sound => sound !== audio);
            // console.log(`Finished playing, removed from active list. Count: ${activeSounds.length}`);
        });
    }

    function dampenAllSounds() {
        // console.log(`Dampening ${activeSounds.length} sounds.`);
        activeSounds.forEach(audio => {
            audio.pause();       // Stop the sound
            audio.currentTime = 0; // Reset its playback position
        });
        activeSounds = []; // Clear the list of active sounds
        // console.log("All sounds dampened and list cleared.");
    }

    // Optional: Preload the initially selected sound for faster first play.
    // This is less critical now with multiple sounds, but can still help for the default.
    // function preloadInitialSound() {
    //     if (soundSelector.options.length > 0) {
    //         const initialSound = new Audio(soundSelector.options[0].value);
    //         initialSound.preload = 'auto';
    //     }
    // }
    // preloadInitialSound();
});