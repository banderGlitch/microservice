import express from 'express';
import { register, login, refresh_Token } from '../controllers/authController.js';
import { registerValidator, loginValidator } from '../middlewares/validators.js';
import validateRequest from '../middlewares/validateRequest.js';
import verifyToken from '../middlewares/verifyToken.js';


const router = express.Router();

// ✅ Register route with validation middleware

router.post('/register', registerValidator, validateRequest, register)

// ✅ Login route with validation middleware

router.post('/login', loginValidator, validateRequest, login)

// ✅ Refresh token route (no validation required here)

router.post('/refresh-token', refresh_Token);

// ✅ Profile route (no validation required here)


router.get('/profile', verifyToken, (req, res) => {
    res.json({ message: `Welcome ${req.user.username}`, user: req.user });
});


// ✅ Protected delete route (example, can be delete user later)

router.delete('/id', verifyToken, (req, res) => {
    return res.json({ message: "User delete logic goes here ✅", user: req.user });
  });


export default router;



