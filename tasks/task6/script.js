// Функция для проверки валидности числа
function isValidNumber(value) {
  return !isNaN(value) && value >= 1 && value <= 10;
}

// Функция для получения и отображения картинок
function fetchImages() {
  const page = document.getElementById("page").value;
  const limit = document.getElementById("limit").value;
  const messageElement = document.getElementById("message");
  const imageContainer = document.getElementById("imageContainer");

  messageElement.textContent = "";
  imageContainer.innerHTML = "";

  if (!isValidNumber(page) && !isValidNumber(limit)) {
    messageElement.removeAttribute("hidden");
    messageElement.textContent =
      "Ошибка: Номер страницы и лимит вне диапазона от 1 до 10";
    return;
  }

  if (!isValidNumber(page)) {
    messageElement.removeAttribute("hidden");
    messageElement.textContent =
      "Ошибка: Номер страницы вне диапазона от 1 до 10";
    return;
  }

  if (!isValidNumber(limit)) {
    messageElement.removeAttribute("hidden");
    messageElement.textContent = "Ошибка: Лимит вне диапазона от 1 до 10";
    return;
  }

  const url = `https://picsum.photos/v2/list?page=${page}&limit=${limit}`;
  
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Existing code that processes the data
      data.forEach((image) => {
        const img = document.createElement("img");
        img.src = image.download_url;
        img.alt = "Image";
        img.width = 200;
        imageContainer.appendChild(img);
      });

      // Save the last successful request to localStorage
      localStorage.setItem("lastRequest", JSON.stringify({ page, limit }));
    })
    .catch((error) => {
      console.error("Fetch error:", error);
      messageElement.removeAttribute("hidden");
      messageElement.textContent = "Произошла ошибка при загрузке изображений. Если вы из России, то обязательно включите VPN!";
    });
}

// Восстановление последнего успешного запроса при перезагрузке страницы
window.onload = function () {
  const lastRequest = JSON.parse(localStorage.getItem("lastRequest"));
  if (lastRequest) {
    document.getElementById("page").value = lastRequest.page;
    document.getElementById("limit").value = lastRequest.limit;
    fetchImages();
  }
};

document.getElementById("btn_clear").addEventListener("click", function () {
  localStorage.clear();
  alert("localStorage очищен");
});
