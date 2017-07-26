module.exports = (dbInstance) => {
  return {
    add (userId, locationId, url, isPublic) {
      return dbInstance.addImage([userId, locationId, url, isPublic])
    }
  }
}



