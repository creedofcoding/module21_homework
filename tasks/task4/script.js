const generateRandomNumberPromise = new Promise((resolve, reject) => {
  setTimeout(() => {
    const randomNumber = Math.floor(Math.random() * 100) + 1;
    if (randomNumber % 2 === 0) {
      resolve(randomNumber);
    } else {
      reject(randomNumber);
    }
  }, 3000);
});

generateRandomNumberPromise
  .then((number) => {
    console.log(`Завершено успешно. Сгенерированное число чётное - ${number}`);
  })
  .catch((number) => {
    console.log(`Завершено с ошибкой. Сгенерированное число нечётное - ${number}`);
  });