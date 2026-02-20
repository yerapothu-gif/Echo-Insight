import fs from "fs";
const extractTextFromPDF = async (filePath) => {
  try {
    const pdfParse = (await import("pdf-parse")).default;
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    return data.text;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default extractTextFromPDF;
