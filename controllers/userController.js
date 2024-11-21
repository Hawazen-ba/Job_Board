const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// User registration 
exports.createUser = async (req, res) =>{
    try{
       const {name, email, password , role} = req.body;
       const user = new user({name, email , password, role});
       await user.save();
       res.status(201).json ({
        message : 'User created successfully',
        user
       })
    }catch(err){
       res.status(400).json({
        message : "Error creating user", err
       })
    }
};

exports.loginUser = async (req, res) => {
    try{
       const {email, password } = req.body;
       const user = await User.findOne({email});
       if(!user) return res.status(404).json({message: 'Invalid email or password'});

       const isMatched = await bcrypt.compare(password, user.password);
       if(!isMatched) return res.status(400).json({message : "Invalid password or email"});

       const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1h'});
       res.status(200).json({
        message : 'Login successfully',
        token
       })
    }catch(err){
   res.status(400).json({message: 'Error logging in user', err})
    }
}; 


//Get all users
exports.getAllUsers = async (req, res) =>{
    try{
        const users = await User.find();
         res.status(201).json(users);
     }catch(err){
      res.status(400).json({
         message : "error finding users", err
      })
     }
};


// Get users by id
exports.getUser = async (req, res) => {
    try{
       const user = await User.findById(req.parms.id);
       if(!user){
        return res.status(404).json({
            message: 'User not found'
        });
       }
       res.status(200).json(user);
    }catch(err){
        res.status(400).json({
            message: 'Error getting user by id', err
        });
    }
};


//Update user informations 
exports.updateUser = async (req, res) => {
    try{
        const user = await User.findByIdAndUpdate(req.params.id , req.body , {new:true});
        if(!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({
        message: 'User updated successfully'
    })
   }
   catch(err){
    res.status(400 ).json({
        message: 'Error updating user', err
    })
   }
};

//Delete user 
exports.deleteUser = async (req, res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id);
        if(!user) return res.status(404).json({message: "User not found"});
        res.status(200).json({
        message: 'User deleted successfully'
    })
   }
   catch(err){
    res.status(400 ).json({
        message: 'Error deleting user', err
    })
   }
};


// Filter users (usually bytheir roles )
exports.user = async (req, res) => {
    
    try {
        let query= {...  req.query};      
        const users = await User.find( query); 
        res.status(203).json({
            message: "Users found",
            data:{users},
        });
    }
    catch (err) {
        res.status(400).json({
            message: "Users not found!",
            err:err,
        });
    }
};
