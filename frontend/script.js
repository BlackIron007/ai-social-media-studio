const API_BASE = "http://127.0.0.1:8000";

function getInputData() {
  return {
    product_name: document.getElementById("productName").value,
    description: document.getElementById("description").value,
    audience: document.getElementById("audience").value,
    platform: document.getElementById("platform").value
  };
}

function toggleButtons(disabled) {
  document.querySelectorAll("button").forEach(btn => {
    btn.disabled = disabled;
    btn.classList.toggle("opacity-50", disabled);
    btn.classList.toggle("cursor-not-allowed", disabled);
  });
}

async function generateText() {
  toggleButtons(true);
  const status = document.getElementById("status");
  const textCard = document.getElementById("textCard");
  const textResult = document.getElementById("textResult");

  status.innerText = "Generating text...";

  try {
    const response = await fetch(`${API_BASE}/generate/text`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getInputData())
    });

    const data = await response.json();

    textResult.innerHTML = marked.parse(data.result);

    textCard.open = true;
    status.innerText = "";

    textCard.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Error generating text:", error);
    status.innerText = "An error occurred while generating text.";
  } finally {
    toggleButtons(false);
  }
}

async function generateImage() {
  toggleButtons(true);
  const status = document.getElementById("status");
  const imageCard = document.getElementById("imageCard");
  const image = document.getElementById("imageResult");

  status.innerText = "Generating image...";
  image.classList.add("hidden");

  try {
    const response = await fetch(`${API_BASE}/generate/image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(getInputData())
    });

    const data = await response.json();

    image.src = `data:image/png;base64,${data.image_base64}`;
    image.classList.remove("hidden");

    imageCard.open = true;
    status.innerText = "";

    imageCard.scrollIntoView({ behavior: "smooth" });
  } catch (error) {
    console.error("Error generating image:", error);
    status.innerText = "An error occurred while generating image.";
  } finally {
    toggleButtons(false);
  }
}