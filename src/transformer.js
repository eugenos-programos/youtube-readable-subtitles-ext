import { pipeline } from '@xenova/transformers';


let pipe = await pipeline("token-classification", "ldenoue/fullstop-punctuation-multilang-large");
let out = await pipe("hello world how are you");
console.log(out);


