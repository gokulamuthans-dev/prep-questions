const QUESTIONS_API_URL = "https://www.algoexpert.io/api/fe/questions";
const SUBMISSIONS_API_URL = "https://www.algoexpert.io/api/fe/submissions";

const fetchQuestionsWithSubmission = async () => {
  const [questions, submissions] = await Promise.all([
    fetch(QUESTIONS_API_URL),
    fetch(SUBMISSIONS_API_URL),
  ])
    .then(async ([questionResponse, submissionResponse]) => {
      return [await questionResponse.json(), await submissionResponse.json()];
    })
    .catch(() => [[], []]);
  const categories = {};
  questions.forEach((quest) => {
    const status =
      submissions.filter((x) => x.questionId === quest.id)?.[0]?.status ??
      "UNATTEMPTED";
    const questionInfo = { ...quest, status };
    if (categories[quest.category]) {
      categories[quest.category].push(questionInfo);
    } else {
      categories[quest.category] = [questionInfo];
    }
  });
  return categories;
};

const getClassByStatus = (status) => {
  const statusCss = {};
  statusCss.CORRECT = "correct";
  statusCss.INCORRECT = "incorrect";
  statusCss.PARTIALLY_CORRECT = "partial";
  statusCss.UNATTEMPTED = "unattempt";
  return statusCss[status];
};

const renderQuestionsForCategory = (category, questions) => {
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = `${category} - ${
    questions.filter((x) => x.status === "CORRECT").length
  } / ${questions.length}`;
  div.appendChild(h2);
  questions?.forEach((question) => {
    const innerDiv = document.createElement("div");
    const statusDiv = document.createElement("div");
    statusDiv.classList.add("status", getClassByStatus(question.status));
    innerDiv.appendChild(statusDiv);
    const h3 = document.createElement("h3");
    h3.id = question.id;
    h3.textContent = question.name;
    innerDiv.appendChild(h3);
    div.appendChild(innerDiv);
  });
  return div;
};

const render = async () => {
  const questionsByCategory = await fetchQuestionsWithSubmission();
  const wrapperDiv = document.getElementById("wrapper");
  for (const [category, questions] of Object.entries(questionsByCategory)) {
    wrapperDiv.appendChild(renderQuestionsForCategory(category, questions));
  }
};

render();
