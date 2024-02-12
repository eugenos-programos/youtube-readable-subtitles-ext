import { extract_subtitles } from "./transkript.js";
import { normalize_subtitles } from "./utils.js";



async function fetchAndNormalizeSubtitles(url)
{
    try
    {
        const subtitles = await extract_subtitles(url);
        const result = await normalize_subtitles(subtitles);
        console.log(`${result}`);
    }
    catch (error)
    {
        console.error('An error occured', error);
    }
}


fetchAndNormalizeSubtitles('https://www.youtube.com/watch?v=qRODjitiKP8');
