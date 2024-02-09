import { YoutubeLoader } from "langchain/document_loaders/web/youtube";

const loader = YoutubeLoader.createFromUrl("https://www.youtube.com/watch?v=-BwUyTrU9fo", {
  language: "en",
  addVideoInfo: true,
});

const docs = await loader.load();

console.log(docs);
