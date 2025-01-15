const {json} = require("express")
const Feedback = require("../Models/FeedbackScema")

exports.feedBackAPI = async (req, res) => {
    console.log('Inside the feedback API');
    const { username,feedback } = req.body;
    const userId = req.payload; // Assuming req.payload contains the user ID

    try {
        const existingFeedback = await Feedback.findOne({ feedback });
        if (existingFeedback) {
            console.log('Feedback already exists:', feedback);
            return res.status(400).json("Feedback already exists");
        } else {
            const newFeedback = new Feedback({
                username: username,
                feedback: feedback
            });
            const savedFeedback = await newFeedback.save();
            console.log('New feedback saved:', savedFeedback);
            return res.status(200).json({ message: "Feedback sent successfully", feedback: savedFeedback });
        }
    } catch (error) {
        console.error('Error saving feedback:', error);
        return res.status(500).json({ error: "Internal server error", details: error.message });
    }
};

exports.getFeedback=async(req,res)=>{
    console.log('inside the feedback');
    try{
            const getFeedback = await Feedback.find()
            res.status(200).json(getFeedback)
    }
    catch(err){
        res.status(406).json(err)
    }
}
