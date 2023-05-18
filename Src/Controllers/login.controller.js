const file = require("../Services/login.service");
const FileService = new file();

module.exports = { loginWebUser, logoutWebUser, loginMobileUser , forgotWebUser, forgotMobileUser };

/**
 * @description Find email and authenticate with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function loginWebUser(req, res) {
  try {
    const result = await FileService.loginAndAuthenticateWeb(req.body);
    return res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Status: 500, Success: false, Error: `${err.name} : ${err.message}` });
  }
}


/**
 * @description Find email and authenticate with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function forgotWebUser(req, res) {
  try {
    const result = await FileService.forgotWebUser(req.body);
    return res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Status: 500, Success: false, Error: `${err.name} : ${err.message}` });
  }
}


/**
 * @description Find email and authenticate with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function forgotMobileUser(req, res) {
  try {
    const result = await FileService.forgotMobileUser(req.body);
    return res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Status: 500, Success: false, Error: `${err.name} : ${err.message}` });
  }
}



/**
 * @description Find email and authenticate with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function loginMobileUser(req, res) {
  try {
    const result = await FileService.loginAndAuthenticateMobile(req.body);
    return res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Status: 500, Success: false, Error: `${err.name} : ${err.message}` });
  }
}


/**
 * @description Find email and authenticate with the provided body
 * @param req {object} Express req object 
 * @param res {object} Express res object
 * @returns {object} success or failure object
 */
async function logoutWebUser(req, res) {
  try {
    res.cookie('Cookie', "cookie=loggedout", { maxAge: -1, httpOnly: true, sameSite: 'none', secure: true })
    return res.status(200);
  } catch (err) {
    console.log(err);
    res.status(500).send({ Status: 500, Success: false, Error: `${err.name} : ${err.message}` });
  }
}
