import { callPunctuationModel } from "./transformer.js";


const inputTextLength = 1500;

export async function normalizeSubtitles(subtitles) 
{
    subtitles = cleanSubtitles(subtitles);
    let result = '';
    do
    {
        let last_space_index = extractLastSpaceIndex(subtitles);
        let truncated_text = subtitles.substring(0, last_space_index);
        let out = await callPunctuationModel(truncated_text);
        let tmp_norm_text = '';
        Object.keys(out).forEach((key) => {
            tmp_norm_text += out[key]['word'];
            if (out[key]['entity_group'] != '0')
            {
                tmp_norm_text += out[key]['entity_group'];
            }
            tmp_norm_text += ' ';
        })
        if (subtitles.length < inputTextLength)
        {
            result += tmp_norm_text;
            break;
        }
        else
        {
            result += tmp_norm_text.substring(0, tmp_norm_text.lastIndexOf('.'));
        }
        subtitles = tmp_norm_text.substring(tmp_norm_text.lastIndexOf('.') + 1) + subtitles.substring(last_space_index);
    }
    while (true);
    return cleanNormalizedText(result);
}

function cleanNormalizedText(text)
{
    text = capitalizeAfterDot(text);
    return text;
}

function extractLastSpaceIndex(text) 
{
    if (text.length <= inputTextLength) {
        return text.length;
    } else {
        const trimmedText = text.substring(0, inputTextLength);
        const lastSpaceIndex = trimmedText.lastIndexOf(' ');
        return lastSpaceIndex;
    }
}

function capitalizeAfterDot(text) {
    return text.replace(/\.(\s*[a-z])/g, function(match) {
        return match.toUpperCase();
    });
}

function cleanSubtitles(subtitles)
{
    let cleaned_subtitles = subtitles.toString().replace(/\([^)]*\)/g, '');
    return cleaned_subtitles;
}
