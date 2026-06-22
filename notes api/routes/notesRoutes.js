const express = require("express");
const { body, validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const filePath = path.join(__dirname, "../data/notes.json");

// Helper functions
const readNotes = () => JSON.parse(fs.readFileSync(filePath, "utf-8"));
const writeNotes = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

/* ---------------- CREATE Note ---------------- */
router.post(
  "/",
  [
    body("title").notEmpty().withMessage("Title is required"),
    body("content").isLength({ min: 5 }).withMessage("Content must be at least 5 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const notes = readNotes();
    const newNote = {
      id: notes.length + 1,
      title: req.body.title,
      content: req.body.content,
    };

    notes.push(newNote);
    writeNotes(notes);

    res.status(201).json({ success: true, note: newNote });
  }
);

/* ---------------- READ All Notes ---------------- */
router.get("/", (req, res) => {
  const notes = readNotes();
  res.json({ success: true, count: notes.length, notes });
});

/* ---------------- READ Single Note ---------------- */
router.get("/:id", (req, res) => {
  const notes = readNotes();
  const note = notes.find((n) => n.id === parseInt(req.params.id));

  if (!note) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  res.json({ success: true, note });
});

/* ---------------- UPDATE Note ---------------- */
router.put(
  "/:id",
  [
    body("title").optional().notEmpty().withMessage("Title cannot be empty"),
    body("content").optional().isLength({ min: 5 }).withMessage("Content must be at least 5 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const notes = readNotes();
    const noteIndex = notes.findIndex((n) => n.id === parseInt(req.params.id));

    if (noteIndex === -1) {
      return res.status(404).json({ success: false, message: "Note not found" });
    }

    // Update note
    notes[noteIndex] = { ...notes[noteIndex], ...req.body };
    writeNotes(notes);

    res.json({ success: true, note: notes[noteIndex] });
  }
);

/* ---------------- DELETE Note ---------------- */
router.delete("/:id", (req, res) => {
  const notes = readNotes();
  const newNotes = notes.filter((n) => n.id !== parseInt(req.params.id));

  if (notes.length === newNotes.length) {
    return res.status(404).json({ success: false, message: "Note not found" });
  }

  writeNotes(newNotes);
  res.json({ success: true, message: "Note deleted successfully" });
});

module.exports = router;
