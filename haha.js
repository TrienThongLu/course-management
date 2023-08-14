const hello = async (s, t) => {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(s);
      resolve();
    }, t);
  });
};

const helloo = async (s, t) => {
  return setTimeout(() => {
    console.log(s);
  }, t);
};

const run = async () => {
  await hello("a", 2000);
  await hello("b", 2000);
  await hello("c", 2000);
};

// run();

function getUp() {
  console.log("I am waking up");
}

function makeCoffee() {
  setTimeout(() => {
    console.log("Making coffee in 5 minutes");
  }, 0);
}

function haveBreakfast() {
  new Promise((resolve, reject) => {
    resolve();
  }).then(() => {
    console.log("I have my breakfast");
  });
}

makeCoffee();
haveBreakfast();
getUp();
