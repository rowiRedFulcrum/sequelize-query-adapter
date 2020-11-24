var Sequelize = require('sequelize');
const Op = Sequelize.Op

const opAlias = {
  $like: Op.like,
  $gte: Op.gte,
  $lte: Op.lte,
  $eq: Op.eq
}


class SequelAdapter  {
  replaceWithSymbol(symbol) {
    return opAlias[symbol]
  }

  sequelMapper(query) {

    var result = {}
    var where = query.where
    var sort = query.sort
    var limit = query.limit
    var offset = query.offset

    if(where) {
      const filterObjects = Object.keys(where).map(i => where[i])

      for(var item of filterObjects) {
        const cloneItem = item
        for (var [key, value] of Object.entries(cloneItem)) {
          item[this.replaceWithSymbol(key)] = value
          delete item[key]
        }
      }
      const filterKeys = Object.entries(where).map(([key, value]) => (key));

      var whereDataFinal = {}

      for(var i in filterKeys) {
        whereDataFinal[filterKeys[i]] = filterObjects[i]
      }

      console.log(whereDataFinal)
      result.where = {
        [Op.or]: {
          ...whereDataFinal
        }
      }
    }

    if(sort) {
      sort = Object.keys(sort).map((key) => [key, sort[key]]);
      result.order = sort
    }

    if(offset && limit) {
      result.offset = offset
      result.limit = limit
    }

    console.log(result)
    return result
  }


}

module.exports = SequelAdapter
