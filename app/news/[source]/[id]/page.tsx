import FullArticle from "../../../components/FullArticle";

interface IArticle {
  message: string;
  status: boolean;
  data: {
    title: string;
    summary: string;
    date: string;
    content: string;
    link: string;
    source: string;
  };
}

async function getArticle(id: string, source: string): Promise<IArticle> {
  const articleResponse = await fetch(
    `http://localhost:3000/api/news/${source}/${id}`
  );
  const article = await articleResponse.json();
  return article;
}

const ArticlePage = async ({
  params,
}: {
  params: { id: string; source: string };
}) => {
  const { id, source } = params;
  const article = await getArticle(id, source);
  const { message, data } = article;
  if (message !== "Success") {
    return <>Not Found</>;
  }
  return (
    <div>
      <FullArticle {...data} />
    </div>
  );
};

export default ArticlePage;
