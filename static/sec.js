document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("downloadForm");
  const input = form.querySelector('input[name="link"]');

  form.addEventListener("submit", (e) => {
    const url = input.value.trim();
    if (!url) {
      e.preventDefault();
      alert("ksj");
      return;
    }
    const ytRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;

    if (!ytRegex.test(url)) {
      e.preventDefault();
      alert("ksj");
    }
  });
});
