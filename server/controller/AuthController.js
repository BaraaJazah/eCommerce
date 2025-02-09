const express = require("express")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const AuthValidation = require("../validation/AuthValidation")
const UserModel = require("../model/User")

// .env 
const dotenv = require("dotenv");
dotenv.config();


class AuthController {

    /****
     * @desc    Login
     * @route   /api/auth/login
     * @method  POST
     * @access  public
     */

    static async Login(req, res) {
        try {
            const { email, password } = req.body;
            const { error } = AuthValidation.loginValidation({ email, password });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }

            const user = await UserModel.findOne({ email })  // {eamil : email , password : password }
            if (!user) {
                res.status(400).json({
                    success: false,
                    message: "Email or password is incorrect"
                })
            } else {
                // compare passwords
                const isMatch = await bcrypt.compare(password, user.password);
                if (!isMatch) {
                    res.status(500).send({
                        success: false,
                        message: "Email or password is incorrect",
                    });
                } else {
                    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY)
                    const userResponse = {
                        name: user.name,
                        surname: user.surname,
                        email: user.email,
                        phone: user.phone,
                        photo: user.photo
                    };
                    res.status(200).send({
                        success: true,
                        message: "Login Successfully",
                        token,
                        user: userResponse,
                    });
                }
            }
        }
        catch (error) {
            console.log(error);
            res.status(500).send({
                success: false,
                message: "Error In Login API",
                error,
            })

        }
    }


    /****
     * @desc    Register
     * @route   /api/auth/register
     * @method  POST
     * @access  public
     */


    static async Register(req, res) {
        try {
            const { name, surname, email, password, photo, phone } = req.body;

            const { error } = AuthValidation.registerValidation({ name, surname, email, password, photo, phone });
            if (error) {
                return res.status(400).json(error.details[0].message);
            }
            const exist = await UserModel.findOne({ email })
            if (exist) {
                return res.status(400).json({
                    success: false,
                    message: "Email already Registerd please Login"
                })
            }


            var salt = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            const user = await UserModel.create({
                name,
                surname,
                email,
                password: hashedPassword,
                photo,
                phone,
                // answer,
            })

            const userResponse = {
                name: user.name,
                surname: user.surname,
                email: user.email,
                phone: user.phone,
            };

            return res.status(200).json({
                success: true,
                message: "Successfully Registered",
                user: userResponse,
            })

        } catch (error) {
            console.log(error);
            if (error.code === 11000) {
                return res.status(500).json({
                    success: false,
                    message: "Phone number already exists.",
                    error,
                })
            }

            return res.status(500).json({
                success: false,
                message: "Error In Register API",
                error,
            })

        }
    }


}

module.exports = AuthController;