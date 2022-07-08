const fs = require('fs');

module.exports = class Container {
  constructor(filename) {
    this.filename = filename
  }

  // Se agrega un producto... Si no existe el archivo, se crea... Si existe, se agrega al array... Se retorna el id del producto...
  save = async (object) => {
    try {
      let objects = await this.getAll()
        .then(objects => { return objects })
        .catch(error => { return error })
      // Se usa reduce para determinar el mayor id... Y se le suma 1 para que sea el nuevo id...
      object.id = objects.reduce((max, obj) => { return obj.id > max ? obj.id : max }, 0) + 1
      objects.push(object)
      await fs.promises.writeFile(this.filename, JSON.stringify(objects))
      return object.id
    } catch (error) {
      console.error(error)
    }
  }

  // Se obtienen todos los productos...
  getAll = async () => {
    try {
        const objects = await fs.promises.readFile(this.filename, 'utf8')
        if (objects) {
          return JSON.parse(objects)
        } else {
          // Si no hay productos, se crea un array vacio...
          return []
        }
    } catch (error) {
      switch (error.code) {
        case 'ENOENT':
          // Si no existe el archivo, se devuelve un array vacío...
          return []
        default:
          console.error(error)
          break
      }
    }
  }

  // Se obtiene el producto con id...
  getById = async (id) => {
    try {
        const object = await this.getAll().then(objects => { return objects.filter(obj => obj.id === id) })
        return object
    } catch (error) {
      console.error(error)
    }
  }

  // Se elimina el producto con id...
  deleteById = async (id) => {
    try {
      const objects = await this.getAll().then(data => {
        return data.filter(obj => obj.id !== id)
      })
      await fs.promises.writeFile(this.filename, JSON.stringify(objects))
    } catch (error) {
      console.error(error)
    }
  }

  // Se eliminan todos los productos...
  deleteAll = async () => {
    try {
        await fs.promises.writeFile(this.filename, '[]')
    } catch (error) {
      console.error(error)
    }
  }

}