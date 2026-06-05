const output = document.getElementById("output");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" }
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");

    img.src = url;

    img.onload = () => resolve(img);

    img.onerror = () => reject(`Failed to load image: ${url}`);
  });
}

output.textContent = "Loading...";

Promise.all(
  images.map((image) => downloadImage(image.url))
)
  .then((imgs) => {
    output.innerHTML = "";

    imgs.forEach((img) => {
      output.appendChild(img);
    });
  })
  .catch((error) => {
    output.innerHTML = error;
  });