const Comment = require('../Modules/comments'); // Import the Comment Model
const Blog = require('../Modules/BlogModels'); // Import the Blog Model


const addComment = async (req, res) => {
    const { blogId } = req.params;
    const { comment } = req.body;

    // Create a new comment
    const newComment = new Comment({
        comment,
        blogId,
        userEmail: req.user.email,
    });

    await newComment.save();

    // Update the blog by pushing the new comment's ID
    const blogUpdate = await Blog.findByIdAndUpdate(
        blogId,
        { $push: { comments: newComment._id } }, // Use newComment._id here
        { new: true }
    );
    res.redirect(`/allblog`);
};

module.exports = {
    addComment,
};
