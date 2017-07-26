module.exports = (dbInstance) => {
  return {
    setSchema() {
      return dbInstance.setSchema()
    }
  }
}