module.exports = (dbInstance) => {
  return {
    get(userId) {
      return dbInstance.getUser([userId])
        .then(users => users[0])
    },

    create(userId, firstName, lastName) {
      return dbInstance.createUser([userId, firstName, lastName])
        .then(users => users[0])
    },

    getAll() {
      return dbInstance.getAllUsers()
    }
  }
}

