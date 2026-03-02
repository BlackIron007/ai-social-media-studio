const API_BASE = "https://ai-social-media-studio-production.up.railway.app";

function getInputData() {
  return {
    product: document.getElementById("productName").value.trim(),
    description: document.getElementById("description").value.trim(),
    audience: document.getElementById("audience").value.trim(),
    platform: document.getElementById("platform").value.trim()
  };
}

function validateInputs(requiredFields) {
  const data = getInputData();

  for (const field of requiredFields) {
    if (!data[field]) {
      alert(`Please fill the ${field} field.`);
      return false;
    }
  }
  return true;
}

function toggleButtons(disabled) {
  document.querySelectorAll("button").forEach(btn => {
    btn.disabled = disabled;
    btn.classList.toggle("opacity-50", disabled);
    btn.classList.toggle("cursor-not-allowed", disabled);
  });
}

async function generateText() {
  if (!validateInputs(["product", "description", "audience", "platform"])) return;
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

    if (!response.ok) {
      throw new Error("Text generation failed");
    }

    const data = await response.json();
    textResult.innerHTML = marked.parse(data.result);

    textCard.open = true;
    status.innerText = "";
    textCard.scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    console.error(error);
    status.innerText = "An error occurred while generating text.";
  } finally {
    toggleButtons(false);
  }
}

async function generateImage() {
  if (!validateInputs(["product", "description"])) return;
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

    if (!response.ok) {
      throw new Error("Image generation failed");
    }

    const data = await response.json();
    image.src = `data:image/png;base64,${data.image_base64}`;
    image.classList.remove("hidden");

    imageCard.open = true;
    status.innerText = "";
    imageCard.scrollIntoView({ behavior: "smooth" });

  } catch (error) {
    console.error(error);
    status.innerText = "An error occurred while generating image.";
  } finally {
    toggleButtons(false);
  }
}