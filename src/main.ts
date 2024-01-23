import "./style.css";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main class="main">
    <!-- <div class="dot-pattern"></div> -->
    <div class="container">
      <div class="container--header">
        <div class="mac-options"></div>
        <h1>xpro</h1>
        <div></div>
      </div>
      <div class="container--body">
        <div class="progress--wrapper">
          <input type="number" class="progress--input" value="50" />
        </div>
        <div class="progress--result">
          Result
        </div>
        <div class="progress--copy">
          <button>Copy</button>
        </div>
      </div>
    </div>
  </main>
`;

const progressResult =
  document.querySelector<HTMLDivElement>(".progress--result"),
  progressInput = document.querySelector<HTMLInputElement>(".progress--input"),
  progressCopy = document.querySelector<HTMLButtonElement>(
    ".progress--copy button",
  );
const drawProgress = (val = 50) => {
  val = val < 0 ? 0 : val > 100 ? 100 : val;
  const fullBar = "█",
    midBar = "▓",
    noBar = "░";
  if (!progressResult) return;
  progressResult.innerHTML =
    new Array(10)
      .fill("")
      .map((_, idx) => {
        const num = idx + 1,
          progress = val * 0.1;
        if (num <= progress) return fullBar;
        if (progress > num - 1 && progress < num) return midBar;
        return noBar;
      })
      .join("") + ` ${parseFloat(val.toFixed(2))}%`;
};

drawProgress(50);

console.log(progressInput);
if (progressInput) {
  progressInput.addEventListener("input", (e) => {
    console.log("drawing");
    drawProgress(Number((e.target as HTMLInputElement).value));
  });
}

if (progressCopy && progressResult) {
  progressCopy.addEventListener("click", async () => {
    try {
      console.log("clicked");
      await navigator.clipboard.writeText(progressResult.innerText);
      progressCopy.innerText = "Copied!";
      setTimeout(() => {
        progressCopy.innerText = "Copy";
      }, 1000);
    } catch (e) {
      console.error("Could not copy");
    }
  });
}
