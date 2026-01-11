const AuthService = require('../services/AuthService');


const login = async (req, res) => {
    try {
        const result = await AuthService.login(req.body);
        res.status(200).json(result);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const register = async (req, res) => {
    try {
        const result = await AuthService.register(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
    
};

module.exports = { login, register };