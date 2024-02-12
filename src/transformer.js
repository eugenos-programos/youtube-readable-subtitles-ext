import { pipeline } from '@xenova/transformers';


export async function call_normalization_model(subtitles)
{
    let pipe = await pipeline("token-classification", "ldenoue/fullstop-punctuation-multilang-large");
    let out = await pipe(subtitles);
    return out;
}
