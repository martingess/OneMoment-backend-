const createString = require('../helpers/createString');

module.exports = class MomentToken {
  static create () {
    const token = createString(30);
    const {id, password} = this.decrypt(token);
    return {
      id,
      password,
      token
    }
  }

  static decrypt (token) {
    const id = token.substr(0,15);
    const password = token.substr(15);
    return {id, password}
  }
}