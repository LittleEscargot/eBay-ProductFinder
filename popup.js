// Focus on input when the extension is open
const inputElement = document.getElementById("urlInput");
if (inputElement) {
  inputElement.focus();
}

// Setup and open url
const urlStart = "https://www.ebay.fr/sch/i.html?_nkw=";
const urlEnd = "&rt=nc&LH_Sold=1&LH_Complete=1";

document.getElementById("myForm").addEventListener("submit", function (event) {
  event.preventDefault();

  const productName = document.getElementById("urlInput").value.trim();
  const checkbox = document.getElementById("myCheckbox");

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const currentTab = tabs[0];
    let tabUrl;

    if (checkbox.checked) {
      tabUrl = `${urlStart}${productName}${urlEnd}`;
    } else {
      tabUrl = `${urlStart}${productName}`;
    }

    chrome.tabs.create({ url: tabUrl, index: currentTab.index + 1 });
  });

  document.getElementById("urlInput").value = "";
});