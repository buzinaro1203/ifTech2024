function fetchJSONData() {
  fetch("https://thingspeak.mathworks.com/channels/2682894/fields/1.json?results=1")
    .then((res) => {
      if (!res.ok) {
        throw new Error
          (`HTTP error! Status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) =>
      console.log(data))
    .catch((error) =>
      console.error("Unable to fetch data:", error));
}
fetchJSONData();
