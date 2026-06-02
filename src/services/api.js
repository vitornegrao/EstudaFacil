const QUOTE_API_URL = "http://api.quotable.io/random";
const QUIZ_API_URL = "https://opentdb.com/api.php";

export const fetchQuote = async () => {
  const response = await fetch(QUOTE_API_URL);
  if (!response.ok) {
    throw new Error("Falha ao buscar a frase motivacional.");
  }
  return response.json();
};

export const fetchQuizQuestions = async (
  categoryId,
  amount = 5,
  difficulty = "medium",
) => {
  // Monta a URL dinâmica para a API do OpenTDB
  const url = `${QUIZ_API_URL}?amount=${amount}&category=${categoryId}&difficulty=${difficulty}&type=multiple`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Falha ao buscar as questões do quiz.");
  }

  const data = await response.json();

  // A API do OpenTDB retorna os dados dentro da propriedade 'results'
  return data.results;
};
