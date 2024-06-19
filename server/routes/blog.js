const express = require("express");
const router = express.Router();
const BlogEvents = require("../models/BlogEvents");

router.get("/", async (req, res) => {
  let searchOptions = {};
  let events = await BlogEvents.find();

  if (req.query.search != null && req.query.search !== "") {
    searchOptions.title = new RegExp(req.query.search, "i");
    events = await BlogEvents.find(searchOptions);
  }

  if (req.query.max != null) {
    const max = parseInt(req.query.max);
    events = await BlogEvents.find(searchOptions).limit(max);
  }

  try {
    res.status(201).json(events);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const events = await BlogEvents.findById(req.params.id);
    res.status(201).json(events);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.post("/", async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "blog is required" });
  }

  /* validation for empty data */
  if (
    !req.body.title?.trim() &&
    !req.body.description?.trim() &&
    !req.body.location?.trim() &&
    !req.body.image?.trim() &&
    !req.body.time?.trim()
  ) {
    return res.status(400).json({ message: "invalid data provided" });
  }

  try {
    const blogNew = new BlogEvents(req.body);
    const blog = await blogNew.save();

    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

router.patch("/edit", async (req, res, next) => {
  if (
    !req.body.title?.trim() ||
    !req.body.description?.trim() ||
    !req.body.location?.trim() ||
    !req.body.image?.trim() ||
    !req.body.time?.trim()
  ) {
    return res.status(400).json({ message: "invalid data provided updated" });
  }

  try {
    const blog = await BlogEvents.findByIdAndUpdate(req.body._id, { ...req.body }, { new: true });
    res.status(201).json(blog);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id/delete", async (req, res) => {
  try {
    await BlogEvents.findByIdAndDelete(req.params.id);
    res.status(201).json({ message: "blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

module.exports = router;
