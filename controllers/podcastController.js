import Paper from "../models/Paper.js";
import Podcast from "../models/Podcast.js";
import { generatePodcastScript } from "../services/aiService.js";

export const generatePodcast = async (req, res) => {
  try {
    const { paperId } = req.body;
    const paper = await Paper.findOne({ _id: paperId, uploadedBy: req.user._id });
    if (!paper) return res.status(404).json({ message: "Paper not found" });
    const script = await generatePodcastScript(paper.extractedText);
    const podcast = await Podcast.create({ paper: paper._id, script, createdBy: req.user._id });
    res.status(201).json(podcast);
  } catch (error) { res.status(500).json({ message: error.message }); }
};
