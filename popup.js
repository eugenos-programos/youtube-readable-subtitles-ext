// This script handles modifying YouTube transcriptions based on user input.

document.addEventListener('DOMContentLoaded', function() {
    const modifyButton = document.getElementById('modifyButton');
    modifyButton.addEventListener('click', function() {
      const replaceWord = document.getElementById('replaceWord').value;
      const replacementWord = document.getElementById('replacementWord').value;
      modifyTranscriptions(replaceWord, replacementWord);
    });
  });
  
  function modifyTranscriptions(replaceWord, replacementWord) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        function: replaceTextInTranscriptions,
        args: [replaceWord, replacementWord]
      });
    });
  }
  
  function replaceTextInTranscriptions(replaceWord, replacementWord) {
    const transcriptions = document.querySelectorAll('ytd-transcript-body-renderer span');
    transcriptions.forEach(span => {
      const text = span.textContent;
      span.textContent = text.replace(new RegExp(replaceWord, 'gi'), replacementWord);
    });
  }
  