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

const resetPassword = async (req, res) => {
  try {
    const user = await UserService.resetPassword(req.params.id, req.body.password);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao resetar senha', error: error.message });
  }
};

const changeName = async (req, res) => {
  try {
    console.log('id', req.params.id);
    const user = await UserService.changeName(req.params.id, req.body.name);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao mudar nome', error: error.message });
  }
}
// desativar usuário
const deactivateUser = async (req, res) => {
  try {
    const user = await UserService.deactivateUser(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao desativar usuário', error: error.message });
  }

};

module.exports = {
  createUser,
  getAllUsers,
  resetPassword,
  changeName,
  deactivateUser
};