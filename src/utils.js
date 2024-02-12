import { call_normalization_model } from "./transformer.js";


const inputTextLength = 1500;

export async function normalize_subtitles(subtitles) {
    subtitles = clean_subtitles(subtitles);
    let result = '';
    do
    {
        let last_space_index = extractLastSpaceIndex(subtitles);
        let truncated_text = subtitles.substring(0, last_space_index);
        let out = await call_normalization_model(truncated_text);
        let tmp_norm_text = '';
        Object.keys(out).forEach((key) => {
            tmp_norm_text += out[key]['word'];
            if (out[key]['entity'] != '0')
            {
                tmp_norm_text += out[key]['entity'];
            }
            tmp_norm_text += ' ';
        })
        result += tmp_norm_text.substring(0, tmp_norm_text.lastIndexOf('.'));
        subtitles = tmp_norm_text.substring(tmp_norm_text.lastIndexOf('.')) + subtitles.substring(last_space_index);
        console.log(subtitles.length);
    }
    while (subtitles.length > inputTextLength);
    return result;
}

function extractLastSpaceIndex(text) {
    if (text.length <= inputTextLength) {
        return text.length;
    } else {
        const trimmedText = text.substring(0, inputTextLength);
        const lastSpaceIndex = trimmedText.lastIndexOf(' ');
        return lastSpaceIndex;
    }
}

export function clean_subtitles(subtitles){
    let cleaned_subtitles = subtitles.toString().replace(/\([^)]*\)/g, '');
    return cleaned_subtitles;
}
