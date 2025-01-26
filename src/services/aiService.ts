import { GoogleGenerativeAI } from "@google/generative-ai";
import { Coordinates } from "../hooks/useGeoLocation";

const genAI = new GoogleGenerativeAI("AIzaSyBsairWPkwIRpSKW0QXp-keG0s0gNiU_nA");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", generationConfig: {responseMimeType: "application/json"} });

const getRecommendation = (coordinates: Coordinates) => {
  const abortController = new AbortController();
  const prompt = `Write review for a good restaurant in JSON format.
  The restaurant should be near the following coordinates: ${JSON.stringify(coordinates)}
  Rating field is integer from 1 to 5.
  priceTypes field is in format like "$$ - $$$".
  I want in the response only the json so I will do JSON.parse in JS and I will get an object.

  Use this JSON schema:
  
  Restaurant = {'name': str, 'address': str, 'cuisines': str[], 'priceTypes': str}
  Return: {'content': str, 'rating': number, 'restaurant': Restaurant}`

  const request = model.generateContent(prompt, {signal: abortController.signal});
  return { request, abort: () => abortController.abort() };
};

export default { getRecommendation };
