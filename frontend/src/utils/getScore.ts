export const getScoreFromItem = async () => {
  try {
    const response = await fetch(`/api/score/get`, { method: "GET" });
    const data = await response.json();

    return data;
  
  } catch (error) {
    console.error(error);
    return error;
  }
}
