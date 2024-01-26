// google sheet submission
const scriptURL =
  "https://script.google.com/macros/s/AKfycbxmjnbu8WaEjK8TNZrVoGV7EusMCZMAavYkJuPQa3lxt2UUNhtRu5IfsMQf8fukdc2o3Q/exec";

function GoogleSheetPost() {
  const userName = document.getElementById("name-input").value;
  // Create FormData object
  let formData = new FormData();

  // Append data to FormData
  formData.append("User-Name", userName);
  formData.append("User-Score", userScore);
  formData.append("Certificate-Link", formatedCertificateurl);

  // Log the entire form data
  for (let pair of formData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  // Submit the form data
  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => response.json())
    .then((data) => {
      console.log("Thank you! Your data is submitted successfully.");
      // Handle the response or reload the page after a short delay if needed
    })
    .catch((error) => console.error("Error!", error.message));
}
