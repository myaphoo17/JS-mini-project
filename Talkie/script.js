document.addEventListener('DOMContentLoaded', function () {
    const textToSpeakInput = document.getElementById('text-to-speak');
    const speakButton = document.getElementById('speak-button');
    const speechInputButton = document.getElementById('speech-input');
    const speechToSpeakInput = document.getElementById('speech-to-speak');

  
    const recognition = new webkitSpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
  
    
    recognition.onresult = function (event) {
      let finalTranscript = '';
      let interimTranscript = '';
  
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
  
      
      speechToSpeakInput.value = finalTranscript;
    };
  
  
    recognition.onerror = function (event) {
      console.error('Speech recognition error', event.error);
    };
  

    speakButton.addEventListener('click', function () {
      const text = textToSpeakInput.value;
      const speechSynthesisUtterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(speechSynthesisUtterance);
    });
  
   
    speechInputButton.addEventListener('click', function () {
      if (recognition.lang === '') {
       
        recognition.lang = 'en-US';
      }
  
      if (recognition.running) {
        recognition.stop();
   
      } else {
        recognition.start();
        
      }
    });
  });
  