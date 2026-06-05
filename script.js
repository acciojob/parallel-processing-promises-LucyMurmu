const output = document.getElementById("output");
const errorDiv = document.getElementById("error");
const loading = document.getElementById("loading");

const imageUrls = [
    "https://picsum.photos/id/237/200/300",
    "https://picsum.photos/id/238/200/300",
    "https://picsum.photos/id/239/200/300"
];

function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = document.createElement("img");

        img.src = url;

        img.onload = () => {
            resolve(img);
        };

        img.onerror = () => {
            reject(`Failed to load image: ${url}`);
        };
    });
}

function downloadImages() {
    loading.textContent = "Loading...";
    errorDiv.textContent = "";
    output.innerHTML = "";

    const promises = imageUrls.map(url => downloadImage(url));

    Promise.all(promises)
        .then((images) => {
            loading.textContent = "";

            images.forEach((img) => {
                output.appendChild(img);
            });
        })
        .catch((error) => {
            loading.textContent = "";
            errorDiv.textContent = error;
        });
}

downloadImages();