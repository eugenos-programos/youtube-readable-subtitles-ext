import { extractSubtitles } from "./transkript.js";
import { normalizeSubtitles } from "./utils.js";


async function fetchAndNormalizeSubtitles(videoUrl) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const subtitles = extractSubtitles(url);
      const result = normalizeSubtitles(subtitles);
      resolve(result);
    }, 1000);
  });
}

async function fetchAndNormalizeSubtitles(url)
{
    try
    {
        const subtitles = await extractSubtitles(url);
        const result = await normalizeSubtitles(subtitles);
        return result;
    }
    catch (error)
    {
        console.error('An error occured', error);
    }
}

function fetchSubtitles() {
  console.log("fmslkfdmfd");
  var videoUrl = document.getElementById('videoUrl').value;
  fetchAndNormalizeSubtitles(videoUrl)
    .then(subtitles => {
      document.getElementById('subtitleOutput').value = subtitles;
    })
    .catch(error => {
      console.error('Error fetching subtitles:', error);
      document.getElementById('subtitleOutput').value = 'Error fetching subtitles';
    });
}
    