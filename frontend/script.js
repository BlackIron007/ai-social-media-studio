const API_BASE = "http://127.0.0.1:8000";

function getInputData() {
  return {
    product: document.getElementById("product").value,
    description: document.getElementById("description").value,
    audience: document.getElementById("audience").value,
    platform: document.getElementById("platform").value,
  };
}

async function generateText() {
  document.getElementById("textResult").innerText = "Generating text...";

  const response = await fetch(`${API_BASE}/generate/text`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getInputData())
  });

  const data = await response.json();
  document.getElementById("textResult").innerText = data.result;
}

async function generateImage() {
  document.getElementById("imageResult").classList.add("hidden");

  const response = await fetch(`${API_BASE}/generate/image`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(getInputData())
  });

  const data = await response.json();

  const img = document.getElementById("imageResult");
  img.src = `data:image/png;base64,${data.image_base64}`;
  img.classList.remove("hidden");
}