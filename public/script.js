const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("questionInput");
const responseBox = document.getElementById("responseBox");
const roleSelect =
document.getElementById("roleSelect");
const difficulty =
document.getElementById("difficulty");
const copyBtn =
document.getElementById("copyBtn");
copyBtn.addEventListener("click", () => {

    navigator.clipboard.writeText(
        responseBox.innerText
    );

    alert("Answer copied!");
});
askBtn.addEventListener("click", async () => {

    const question = questionInput.value;

    responseBox.innerHTML =
        "🤖 Thinking...";

      try {
          if (!question.trim()) {
         responseBox.innerHTML =
          "⚠ Please enter a question.";
         return;
         }

        const response = await fetch("/ask", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
           body: JSON.stringify({
    question,
    role: roleSelect.value,
    difficulty: difficulty.value
})
        });

        const data = await response.json();

        responseBox.innerHTML = data.answer;

    } catch (error) {

        responseBox.innerHTML =
            "❌ Error generating answer";

        console.error(error);
    }
});