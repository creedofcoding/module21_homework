// Функция для форматирования даты и времени
function formatDate(date) {
  const options = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleString("ru-RU", options);
}

// Проверяем, есть ли данные о пользователе в localStorage
const userName = localStorage.getItem("userName");
const lastVisitDate = localStorage.getItem("lastVisitDate");

if (!userName) {
  // Если пользователь зашел в первый раз
  const name = prompt("Добро пожаловать! Назовите, пожалуйста, ваше имя");
  const currentDate = new Date();

  localStorage.setItem("userName", name);
  localStorage.setItem("lastVisitDate", currentDate);
} else {
  if (userName === "null") {
    const name = prompt("Добро пожаловать! Назовите, пожалуйста, ваше имя");
    const currentDate = new Date();

    localStorage.setItem("userName", name);
    localStorage.setItem("lastVisitDate", currentDate);
  } else {
    // Если пользователь уже был на сайте ранее
    const lastVisit = new Date(lastVisitDate);
    const formattedDate = formatDate(lastVisit);
    const currentDate = new Date();

    alert(`Добрый день, ${userName}! Давно не виделись. В последний раз вы были у нас ${formattedDate}`);
    localStorage.setItem("lastVisitDate", currentDate);
  }
}

document.getElementById("btn_clear").addEventListener("click", function () {
  localStorage.clear();
  alert("localStorage очищен");
});
