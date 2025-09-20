const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./models/Users');
const Place = require('./models/Place');
const Booking = require('./models/Booking');
const mongoose = require('mongoose');
// //dotenv is used to access elements of .env file
require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const port = process.env.PORT || 4000;
const jwtSecret = "khanarmankkhanarmankhan";
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs');

app.use('/uploads', express.static(__dirname + '/uploads'))
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://go-haven-1.onrender.com'
// ];
// app.use(cors(
//   {
//     credentials: true,
//     origin: allowedOrigins
//   }
// ))

const allowedOrigins = [
  'http://localhost:5173',
  'https://go-haven-1.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));

// const corsOptions = {
//   credentials: true,  // Allow cookies to be sent with requests
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('CORS policy: Not allowed'), false);
//     }
//   }
// };

// app.use(cors(corsOptions));

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO_URL);

function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    })
  });
}

app.get('/test', (req, res) => {
  res.send('Hello World!')
})

//API for registering the user
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      return res.status(422).json({ error: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(422).json({ error: "Email already exists" });
    }
    const salt = bcrypt.genSaltSync(10);
    const user = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, salt)
    });
    res.json(user);
  } catch (error) {
    // console.error("Registration Error:", error); // Logs actual error for debugging
    res.json({ error: error.message || "Some error occurred! Please try again." });
  }
})


//API for login the user
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });
//   if (user) {
//     const pass = bcrypt.compareSync(password, user.password);
//     if (pass) {
//       jwt.sign({ email: user.email, id: user._id, name: user.name }, jwtSecret, {}, (err, token) => {
//         if (err) throw err;
//        res.cookie('token', token, { httpOnly: true, secure: true, sameSite: 'None'}).json(user);
//         });
//     }
//     else {
//       res.json("Password not Ok");
//     }
//   }
//   else {
//     res.json("Not found")
//   }
// })

//Another way for login end point
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    jwt.sign({ email: user.email, id: user._id, name: user.name }, jwtSecret, { expiresIn: '30d' }, (err, token) => {
      if (err) throw err;
      res.cookie('token', token, {
        httpOnly: true,
        sameSite: 'lax',
        secure: false, // Set to true in production with HTTPS
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
      }).json(user);
    });
    // const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' });

    // res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


//API for viewing the profile of the user by verifying the token 
app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" }); // Handle invalid token
      }
      const user = await User.findById(userData.id); // Use userData.id or userData._id
      if (!user) {
        return res.status(404).json({ error: "User not found" }); // Handle user not found
      }
      const { name, email, _id } = user;
      res.json({ name, email, _id });
    })

  }
  else {
    res.json(null);
  }
})


//API for logout the user
app.post('/logout', (req, res) => {
  res.cookie('token', '').json(true);
})

//API for uploading photo by using link
// console.log({__dirname})
app.post('/upload-by-link', async (req, res) => {
  const { link } = req.body;
  const newName = 'photo' + Date.now() + '.jpg';
  await imageDownloader.image({
    url: link,
    dest: __dirname + '/uploads/' + newName,
  });
  res.json(newName)

})


//API for uploading the photo from device by using the upload button
const photosMiddleware = multer({ dest: 'uploads/' });
app.post('/upload', photosMiddleware.array('photos', 100), (req, res) => {
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split('.');
    const ext = parts[parts.length - 1];
    const newPath = path + '.' + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(require('path').basename(newPath));
    // uploadedFiles.push(newPath.replace('uploads/',''));
  }
  res.json(uploadedFiles);
});

//API for redirecting to the accomodation page after adding the place to see his listing places
// app.post('/places', (req, res) => {
//   const { title, address, addedPhotos,
//     perks, description, extraInfo,
//     checkIn, checkOut, maxGuests, price } = req.body;
//   const { token } = req.cookies;
//   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//     if (err) {
//       return res.status(401).json({ error: "Invalid token" }); // Handle invalid token
//     }
//     const placeDoc = await Place.create({
//       owner: userData.id,
//       title, address, photos: addedPhotos,
//       perks, description, extraInfo,
//       checkIn, checkOut, maxGuests, price
//     })
//     res.json(placeDoc);
//   });
// })

app.post('/places', async (req, res) => {
  // const {
  //   title, address, addedPhotos,
  //   perks, description, extraInfo,
  //   checkIn, checkOut, maxGuests, price
  // } = req.body;

  // const { token } = req.cookies;

  // try {
  //   const userData = jwt.verify(token, jwtSecret); // Verify token

  //   const placeDoc = await Place.create({
  //     owner: userData.id,
  //     title, address, photos: addedPhotos,
  //     perks, description, extraInfo,
  //     checkIn, checkOut, maxGuests, price
  //   });

  //   res.json(placeDoc); // Respond with created place
  // } catch (err) {
  //   console.error("Error in /places route:", err);
  //   res.status(500).json({ error: "Failed to create place" });
  // }
   try {
    // Destructure request body
    const {
      title,
      address,
      addedPhotos,
      perks,
      description,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    } = req.body;

    // Check for token in cookies
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ error: 'Authentication token missing' });
    }

    // Verify token
    let userData;
    try {
      userData = jwt.verify(token, jwtSecret);
    } catch (err) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }

    // Create new place document
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      perks,
      description,
      extraInfo,
      checkIn,
      checkOut,
      maxGuests,
      price
    });

    // Send created document as response
    res.status(201).json(placeDoc);
  } catch (err) {
    console.error('Error in /places route:', err);
    res.status(500).json({ error: 'Failed to create place', message: err.message });
  }
});


//API for getting and listing the places of the user
app.get('/user-places', (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" }); // Handle invalid token
    }
    const { id } = userData;
    res.json(await Place.find({ owner: id }));
  });

})

//API
app.get('/places/:id', async (req, res) => {
  const { id } = req.params;
  res.json(await Place.findById(id));
});

//API for updating the place details
app.put('/places/', async (req, res) => {
  const { token } = req.cookies;
  const { id, title, address, addedPhotos,
    perks, description, extraInfo,
    checkIn, checkOut, maxGuests, price } = req.body;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" }); // Handle invalid token
    }

    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      placeDoc.set({
        title, address, photos: addedPhotos,
        perks, description, extraInfo,
        checkIn, checkOut, maxGuests, price
      });

      await placeDoc.save();
      res.json('Ok');
    }

  });

})

//API for accessing all the places in database for showing it on indexpage
app.get('/places', async (req, res) => {
  res.json(await Place.find());
});

//API for booking
// app.post('/bookings', async (req, res) => {
//   const userData = await getUserDataFromReq(req);
//   const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

//   Booking.create({
//     place, checkIn, checkOut, numberOfGuests, name, phone, price,
//     user:userData.id,
//   }).then((doc) => {
//     res.json(doc);
//   }).catch((err) => {
//     throw err;
//   });
// });
app.post('/bookings', async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);

    if (!userData) {
      return res.status(401).json({ error: 'User not authenticated' });
    }

    const { place, checkIn, checkOut, numberOfGuests, name, phone, price } = req.body;

    const bookingDoc = await Booking.create({
      place,
      checkIn,
      checkOut,
      numberOfGuests,
      name,
      phone,
      price,
      user: userData.id,
    });

    res.json(bookingDoc);

  } catch (err) {
    console.error('Booking creation error:', err);
    res.status(500).json({ error: 'Something went wrong during booking' });
  }
});

//API for accessing the list of user booking
app.get('/bookings', async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(await Booking.find({ user: userData.id }).populate('place'));
})

// Delete booking by ID

// Middleware to verify JWT and attach user to request
const authenticateUser = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decoded = jwt.verify(token,jwtSecret);
    req.user = { _id: decoded.id }; // ✅ FIX
    console.log("Authenticated user ID:", req.user._id);
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Forbidden: Invalid token' });
  }
};


app.delete('/bookings/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid booking ID' });
  }

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if the logged-in user is the one who made the booking
    console.log("Booking user:", booking.user.toString());
console.log("Logged-in user:", req.user._id);
    if (booking.user.toString() !== req.user._id) {
      return res.status(403).json({ message: 'Forbidden: You can only cancel your own bookings' });
    }

    await booking.deleteOne(); // or Booking.findByIdAndDelete(id)
    res.status(200).json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});


//API for deleting accomodations
app.delete('/user-places/:id', authenticateUser, async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const place = await Place.findById(id);
    if (!place) {
      return res.status(404).json({ message: 'Place not found' });
    }

    if (place.owner.toString() !== userId) {
      return res.status(403).json({ message: 'Forbidden: Not the owner of this place' });
    }

    await Place.findByIdAndDelete(id);
    res.status(200).json({ message: 'Place deleted successfully' });
    
  } catch (err) {
    console.error('Delete failed:', err);
    res.status(500).json({ message: 'Server error while deleting place' });
  }
});



app.listen(port,  () => {
  console.log(`Example app listening on port ${port}`)
})


