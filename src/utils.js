

async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/unikei/distilbert-base-re-punctuate",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

export function normalize_subtitles(subtitles) {
    subtitles = clean_subtitles(subtitles);
    query({"inputs": subtitles}).then((response) => {
        let result = '';
        for (let i = 0; i < response.length; i++) {
            let curr_entity_group = response[i]['entity_group'];
            let curr_word = response[i]['word'];
            if (curr_entity_group.startsWith('Upper')) {
                result += curr_word.charAt(0).toUpperCase() + curr_word.slice(1);
            }
            else if (curr_entity_group.startsWith('lower')){
                result += curr_word.charAt(0).toLowerCase() + curr_word.slice(1);
            }
            if (!curr_entity_group.endsWith('_')) {
                result += curr_entity_group.charAt(curr_entity_group.length - 1);
            }
            result += ' ';
        }
        return result;
    }).catch((error) => {
        console.error('Error:', error);
    });
}

export function clean_subtitles(subtitles){
    let cleaned_subtitles = subtitles.toString().replace(/\([^)]*\)/g, '');
    return cleaned_subtitles;
}
