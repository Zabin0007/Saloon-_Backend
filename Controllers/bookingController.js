const { json } = require("express")
const booking = require("../Models/bookingSchema")

exports.bookingApi = async (req, res) => {
    console.log('inside the booking api');
    const { username, phoneNo, date, time, services, payment } = req.body;
    const userId = req.payload  //unique id for booking from token
    try {
        // Check if a booking exists for the same date and time
        const existingBooking = await booking.findOne({ date, time });
        console.log('existingBooking:', existingBooking);

        if (existingBooking) {
            // Slot is already booked
            return res.status(400).json({ message: "Slot unavailable" });
        }

        // Proceed to book the slot
        const newBookedSlot = new booking({
            username,
            phoneNo,
            date,
            time,
            services,
            // payment,
            userId
        });

        await newBookedSlot.save();

        res.status(200).json({ message: "Slot booked successfully" });

    } catch (err) {
        console.error('Error during booking:', err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
};

//get booking details api of all customers

exports.AllBookingDetailsAPI = async (req, res) => {
    console.log("inside the bookingdetails api");
    try {
        const getBookingDetails = await booking.find()
        res.status(200).json(getBookingDetails)
    } catch (err) {
        res.status(406).json(err)
    }
}

//get bookingDetails of particular user
exports.UserBookingDetailsAPI = async (req, res) => {
    console.log("inside the bookingdetails api");
    const userId = req.payload
    try {
        const getBookingDetails = await booking.find({ userId })

        res.status(200).json(getBookingDetails)
    } catch (err) {
        res.status(406).json(err)
    }
}

//edit booking slot
exports.editBookingAPI = async (req, res) => {
    console.log('inside the edit booking API');
    const { username, phoneNo, date, time, services, payment } = req.body
    const {bookingId} = req.params
    try {
        const editedSlot = await booking.findByIdAndUpdate({ _id: bookingId },
            {
                date,
                time,
            }
        )
        await editedSlot.save()
        res.status(200).json(editedSlot)

    }
    catch (err) {
        res.status(406).json(err)

    }
}

//delete slot api
exports.deletebookingAPI = async(req,res)=>{
    console.log('inside the delete slot api');
    const {bookingId} = req.params
    try {
            const deletedSlot = await booking.findByIdAndDelete({_id:bookingId})
            res.status(200).json({message: 'Slot deleted', bookingDetails: deletedSlot})
    } 
    catch (error) {
        res.status(406).json(error)
    }
}