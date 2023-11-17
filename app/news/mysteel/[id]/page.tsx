async function getArticle(id: string) {
  console.log("🚀 ~ file: page.tsx:4 ~ getArticle ~ id:", id);
  const articleResponse = await fetch(
    `http://localhost:3000/api/news/mysteel/${id}`,
    { cache: "no-store" }
  );

  const article = await articleResponse.json();

  return article;
}

const MySteelArticle = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const article = await getArticle(id);
  return <div>{JSON.stringify(article)}</div>;
};

export default MySteelArticle;
