// assets/js/api.js

const API_BASE_URL = "http://localhost/bdjr-web/backend"; // Adjust if your folder name is different

export async function apiRequest(endpoint, method = "GET", data = null) {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = localStorage.getItem("supabase_token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
    const responseData = await response.json();

    if (!response.ok) {
      throw new Error(
        responseData.error?.message ||
          responseData.error ||
          "API Request Failed"
      );
    }

    return responseData;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}
