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

query({"inputs": "My name is Sarah Jessica Parker but you can call me Jessica"}).then((response) => {
  result = '';
  for (let i = 0; i < response.length; i++) {
    console.log(response[i])
    curr_entity_group = response[i]['entity_group'];
    curr_word = response[i]['word'];
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
  console.log(result);
});
