async function query(data) {
	const response = await fetch(
		"https://api-inference.huggingface.co/models/oliverguhr/fullstop-punctuation-multilang-large",
		{
			headers: { Authorization: "Bearer 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" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	const result = await response.json();
	return result;
}

export async function callPunctuationModel(subtitles)
{
    let out = await query({"inputs": subtitles});
    return out;
}
