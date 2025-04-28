import userModel from '../models/usermodel.js';

export const getUserData = async(req, res) => {
    try {
        // Get userId from the authenticated user's session
        const userId = req.user._id;  
        
        const user = await userModel.findById(userId);
        if(!user){
            return res.json({success: false, message:'User not found'});
        }
        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        })
    } catch (error) {
        return res.json({success: false, message: error.message});
    }
}