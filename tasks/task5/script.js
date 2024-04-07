function getTasks() {
  const userId = document.getElementById("userId").value;
  const url = `https://jsonplaceholder.typicode.com/users/${userId}/todos`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const taskList = document.getElementById("taskList");
      const messageElement = document.getElementById("message");

      taskList.innerHTML = "";

      if (userId === "") {
        messageElement.removeAttribute("hidden");
        messageElement.textContent = "Ошибка: Не был указан ID пользователя";
      } else if (data.length === 0) {
        messageElement.removeAttribute("hidden");
        messageElement.textContent = `Пользователь с указанным ID (${userId}) не имеет задач`;
      } else {
        messageElement.setAttribute("hidden", true);
        data.forEach((task) => {
          const listItem = document.createElement("li");
          listItem.textContent = task.title;
          if (task.completed) {
            listItem.classList.add("completed");
          }
          taskList.appendChild(listItem);
        });
      }
    })
    .catch((error) => {
      console.log("Произошла ошибка:", error);
    });
}
