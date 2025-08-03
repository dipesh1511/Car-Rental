

// Function to Check Availability of a Car for a given Date

import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

const checkAvailability = async (car, pickupDate, returnDate) => {
    
        const bookings = await Booking.find({
            car,
            pickupDate: { $lte: returnDate },
            returnDate: { $gte: pickupDate }
        });
        return bookings.length === 0; // If no bookings found, the car is available
}

// API to check Availability of Cars for the given Date and location
export const checkAvailabilityofCar = async (req, res) => {
   try {
        const { pickupDate, returnDate, location } = req.body;


        // Find available cars based on location and availability
        const cars = await Car.find({ location, isAvailable: true });

        // check car availability for the given date range using promise
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
            return  {...car._doc,isAvailable:isAvailable}; 
        });

        const availableCars = await Promise.all(availableCarsPromises);
        // Filter out cars that are not available
        availableCars = availableCars.filter(car => car.isAvailable === true);

        res.json({ success: true, availableCars });
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
    
}

// API to Create a Booking for a Car
export const createBooking = async (req, res) => {
    try {
        const { car, pickupDate, returnDate } = req.body;
        const {_id} = req.user;


        // Check if the car is available for the given dates
        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if (!isAvailable) {
            return res.json({ success: false, message: 'Car is not available for the selected dates' });
        }

        // Find the car details
        const carData = await Car.findById(car);

        // calculate total amount based on the price and number of days
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = noOfDays * carData.pricePerDay;

        
        // Create a new booking in the Booking model
        await Booking.create({car,owner: carData.owner, user: _id, pickupDate, returnDate, totalAmount: price});

        res.json({ success: true, message: 'Car booked successfully' });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

// API to List User Bookings 

export const getUserBookings = async (req,res)=>{

    try {
        const {_id} = req.user;
        const bookings = await Booking.find({user :_id }).populate("car").sort({createdAt: -1})

        res.json({success: true,bookings});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message });
    }
}

// API to get Owner Booking

export const getOwnerBookings = async (req,res)=>{

    try {
       if(req,user,role !== 'owner'){
            return res.json({success: false, message: "Unauthorized"})
       }

       const bookings = await Booking.find({owner:req.user._id}).populate
       ('car user').select("-user.password").sort({createdAt: -1})

       res.json({success:true,bookings})
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message });
    }
}

// API to change Booking status

export const changeBookingStatus = async (req,res)=>{

    try {
        const {_id} = req.user;
        const {bookingId,status} = req.body

        const booking = await Booking.findById(bookingId)

        if(booking.owner.toString() !== _id.toString()){
            return res.json({success: false, message: "Unauthorized"})
        }

        booking.status = status;
        await booking.save();
        res.json({success: true,message : "Status Updated"});
    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message });
    }
}