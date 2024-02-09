import { YoutubeLoader } from "langchain/document_loaders/web/youtube";


export async function extract_subtitles(video_url)
{
  const loader = YoutubeLoader.createFromUrl(video_url, {
    language: "en",
    addVideoInfo: true,
  });

  const docs = await loader.load();
  return docs[0].pageContent;
}