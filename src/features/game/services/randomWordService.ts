export const getRandomWord = async () => {
  try {
    const response = await fetch("https://trouve-mot.fr/api/random");
    const data = await response.json();

    return data[0].name as string;
  } catch (error) {
    return "hello";
  }
};
