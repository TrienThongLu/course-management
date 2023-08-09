import redis from "redis";

const client = redis.createClient({
  url: "redis://127.0.0.1:6379",
});

const config = async (url) => {
  await client.connect();

  client.ping().then((response) => console.log(response));
};

export default { config, client };
