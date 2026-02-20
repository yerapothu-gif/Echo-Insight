import Paper from "../models/Paper.js";
import extractTextFromPDF from "../services/pdfService.js";

export const uploadPDF = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });
    const filePath = req.file.path;
    const extractedText = await extractTextFromPDF(filePath);
    const paper = await Paper.create({ title: req.file.originalname, originalFileName: req.file.originalname, filePath, extractedText, uploadedBy: req.user._id });
    res.status(201).json({ success: true, paperId: paper._id, preview: extractedText.substring(0, 500) });
  } catch (error) { next(error); }
};
