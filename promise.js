// create a promise function
const delayFunction = (ms) => {
  return new Promise((resolve, reject) => {
    if (ms <= 0) {
      reject("Delay Time cannot be negative or zero");
    } else {
      setTimeout(resolve, ms);
    }
  });
};

const iterateWithAsyncAwait = async (array) => {
  //loop through each element of the array
  for (eachElement of array) {
    try {
      //wait for one second
      await delayFunction(1000);
      //print each element
      console.log(eachElement);
    } catch (err) {
      console.log(err);
      break;
    }
  }
};
// iterateWithAsyncAwait([5, 10, 15, 20, 25]);

const awaitCall = async () => {
  try {
    const data = await fetch("https://jsonplaceholder.typicode.com/posts");
    const dataObject = await data.json();
    console.log(dataObject);
  } catch (err) {
    console.log("Failed to load resource", err);
  }
};
// awaitCall();

const log1 = async () => {
  await delayFunction(1000);
  console.log("first message");
};

const log2 = async () => {
  await delayFunction(1000);
  console.log("Second message");
};

const log3 = async () => {
  await delayFunction(1000);
  console.log("Third message");
};

const chainedAsyncFunction = async () => {
  await log1();
  await log2();
  await log3();
};
// chainedAsyncFunction();

const concurrentRequest = async () => {
  //parrallel calls
  try {
    const [todosData, usersData] = await Promise.all([
      fetch("https://jsonplaceholder.typicode.com/todos"),
      fetch("https://jsonplaceholder.typicode.com/users"),
    ]);
    const [todos, users] = await Promise.all([
      todosData.json(),
      usersData.json(),
    ]);
    console.log(todos);
    console.log(users);
  } catch (err) {
    console.log(err);
  }
};
// concurrentRequest();

const parrallelCalls = async (urlArray) => {
  const dataJson = await Promise.all(
    urlArray.map((eachurl) => {
      return fetch(eachurl);
    })
  );
  const data = await Promise.all(
    dataJson.map((eachData) => {
      return eachData.json();
    })
  );
  console.log(data);
  //.map returns something like [fetch('https....'), fetch('https.....')]
};

parrallelCalls([
  "https://jsonplaceholder.typicode.com/todos",
  "https://jsonplaceholder.typicode.com/users",
  "https://jsonplaceholder.typicode.com/comments",
  "https://jsonplaceholder.typicode.com/posts",
]);
