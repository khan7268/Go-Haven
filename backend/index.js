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
const allowedOrigins = [
  'http://localhost:5173',
  'https://go-haven-1.onrender.com'
];
app.use(cors(
  {
    credentials: true,
    origin: allowedOrigins
  }
))
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
    // if (!name || !email || !password) {
    //   return res.status(422).json({ error: "All fields are required" });
    // }

    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(422).json({ error: "Email already exists" });
    // }
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
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const pass = bcrypt.compareSync(password, user.password);
    if (pass) {
      jwt.sign({ email: user.email, id: user._id, name: user.name }, jwtSecret, {}, (err, token) => {
        if (err) throw err;
        res.cookie('token', token).json(user);
      });
    }
    else {
      res.json("Password not Ok");
    }
  }
  else {
    res.json("Not found")
  }
})

//Another way for login end point
// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     const isPasswordValid = bcrypt.compareSync(password, user.password);
//     if (!isPasswordValid) {
//       return res.status(401).json({ error: "Invalid credentials" });
//     }

//     // Generate JWT token
//     const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, { expiresIn: '1h' });

//     res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
//   } catch (error) {
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });


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
app.post('/places', (req, res) => {
  const { title, address, addedPhotos,
    perks, description, extraInfo,
    checkIn, checkOut, maxGuests, price } = req.body;
  const { token } = req.cookies;
  jwt.verify(token, jwtSecret, {}, async (err, userData) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" }); // Handle invalid token
    }
    const placeDoc = await Place.create({
      owner: userData.id,
      title, address, photos: addedPhotos,
      perks, description, extraInfo,
      checkIn, checkOut, maxGuests, price
    })
    res.json(placeDoc);
  });
})

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
app.get('/bookings', async (req,res) => {
 const userData = await getUserDataFromReq(req);
 res.json(await Booking.find({user:userData.id}).populate('place'));
})


app.listen(port,  () => {
  console.log(`Example app listening on port ${port}`)
})
