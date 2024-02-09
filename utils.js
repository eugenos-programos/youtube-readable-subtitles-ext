// Function to retrieve YouTube video transcription by video ID
function getVideoTranscription(videoId, apiKey) {
  // Constructing the request URL
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=${apiKey}`;

  // Making a GET request to the YouTube Data API
  fetch(url)
      .then(response => {
          // Checking if the response is successful
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          // Extracting the video title
          const videoTitle = data.items[0].snippet.title;
          console.log(`Video Title: ${videoTitle}`);

          // Extracting the video's automatic caption track ID
          const captionTrackId = data.items[0].snippet.captions.default;
          if (!captionTrackId) {
              console.log("This video does not have automatic captions available.");
              return;
          }

          // Requesting the captions using the caption track ID
          return fetch(`https://www.googleapis.com/youtube/v3/captions/${captionTrackId}?key=${apiKey}`);
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text();
      })
      .then(text => {
          // Printing the transcription
          console.log("Transcription:\n", text);
      })
      .catch(error => {
          console.error('There was a problem with the request:', error);
      });
}

const apiKey = 'AIzaSyDHyQkcF7vB_8aqYJXJtwIW_ORQ4sql-zA';
// Replace 'VIDEO_ID' with the ID of the YouTube video you want to retrieve the transcription for
const videoId = '8I3Tu9x9YA8';

// Calling the function to retrieve the transcription
getVideoTranscription(videoId, apiKey);
