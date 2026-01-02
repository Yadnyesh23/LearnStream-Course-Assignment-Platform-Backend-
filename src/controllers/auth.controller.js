import { User } from '../models/user.model.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {AsyncHandler} from '../utils/AsyncHandler.js'

const registerUser = AsyncHandler(async (req, res) => {
    const {name, email, password, role} = req.body

    if(!name || !email || !password || ! role){
        throw new ApiError(400, "All fields are required.")
    }

    const existedUser = await User.findOne( {$or : [{name} , {email}]})
    if(existedUser){
        throw new ApiError(409, "User already registered")
    }
    const user = await User.create({
        name,
        email,
        password,
        role,
    })

    const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

    res.status(201).json(new ApiResponse(201,"Registered user successfully!!", createdUser))
})

const loginUser = AsyncHandler(async(req, res) => {
    const {email, password} = req.body

    if(!email || !password){
        throw new ApiError(400, "All Fields are required")
    }

    const user = await User.findOne({email}).select('+password')
    if(!user){
        throw new ApiError(400, "Invalid credentials")
    }

    const isPasswordCorrect = await user.validatePassword(password);
    if(!isPasswordCorrect){
        throw new ApiError(401, 'Invalid Credentials')
    }

    const accessToken = await user.generateAccessToken()
    const refreshToken = await user.generateRefreshToken()

    user.refreshToken = refreshToken

    await user.save({validateBeforeSave:false})

    const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
    res.status(200).json(new ApiResponse(201, "Login user successfully!!" ,{loggedInUser, accessToken}))
})

const logoutUser = (req, res) => {
    res.status(200).json(new ApiResponse(201, "Logged out user successfully!!"))
}

const regenerateRefreshToken = (req, res) => {
    res.status(200).json(new ApiResponse(201, "Regenerated refresh token successfully!!"))
}

export { registerUser , loginUser , logoutUser ,  regenerateRefreshToken}
