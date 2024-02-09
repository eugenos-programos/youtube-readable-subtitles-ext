import { extract_subtitles } from "./transkript.js";
import { normalize_subtitles } from "./utils.js";


var url = "https://www.youtube.com/watch?v=-BwUyTrU9fo";
var subtitles = await extract_subtitles(url);
var normalized_subtitles = normalize_subtitles(subtitles);
console.log(normalized_subtitles);
