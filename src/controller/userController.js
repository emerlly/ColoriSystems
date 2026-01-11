const UserService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const user = await UserService.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'CPF já cadastrado'
      });
    }

    return res.status(500).json({
      message: 'Erro ao criar usuário ' + error.message
    });
  }

};

const getAllUsers = async (req, res) => {
  try {
    const user = await UserService.findAll();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar usuários', error: error.message });
  }
};

module.exports = { createUser, getAllUsers };
