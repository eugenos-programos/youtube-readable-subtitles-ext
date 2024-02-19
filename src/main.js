const langchain = require("langchain");


async function extractSubtitles(video_url)
{
  const loader = YoutubeLoader.createFromUrl(video_url, {
    language: "en",
    addVideoInfo: true,
  });

  const docs = await loader.load();
  return docs[0].pageContent;
}

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

async function callPunctuationModel(subtitles)
{
    let out = await query({"inputs": subtitles});
    return out;
}

async function normalizeSubtitles(subtitles) 
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
  document.getElementById('subtitleOutput').value = 'Error fetching subtitles__';
  var videoUrl = document.getElementById('videoUrl').value;
  var subtitles = fetchAndNormalizeSubtitles(videoUrl);
  document.getElementById('subtitleOutput').value = subtitles;
  document.getElementById('subtitleOutput').value = 'Error fetching subtitles';
}


function displayMessage() {
    // Получаем ссылку из поля ввода
    var link = document.getElementById('linkInput').value;
    
    // Проверяем, не пустая ли ссылка
    if (link.trim() === '') {
        // Если ссылка пустая, выводим сообщение об ошибке
        document.getElementById('messageOutput').innerText = "Please enter a valid link.";
    } else {
        // Если ссылка не пустая, отображаем её
        document.getElementById('messageOutput').innerHTML = "Your link: <a href='" + link + "' target='_blank'>" + link + "</a>";
    }
}
