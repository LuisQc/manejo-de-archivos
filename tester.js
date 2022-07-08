const Container = require('./container')
const container = new Container('productos.txt')

async function main() {
    const producto = {
        title : 'Coca Cola',
        price : 2.50,
        imagen : 'https://www.cocacola.es/content/dam/one/es/es2/coca-cola/products/productos/dic-2021/CC_Origal.jpg',
    }
    const producto2 = {
        title : 'Inca Cola',
        price : 20,
        imagen : 'https://lacopabrava.com/wp-content/uploads/2022/02/INCA-KOLA-600ML.jpg',
    }
    // Se agrega el producto... Si no existe el archivo, se crea... Si existe, se agrega al array...
    await container.save(producto).then(
        id => console.log(`Se guardó el producto con id: ${id}`),
    )

    // Se agrega otro producto para que hayan dos o más, dependiendo si ya tenía algo el archivo...
    await container.save(producto2).then(
        id => console.log(`Se guardó el otro producto con id: ${id}`),
    )

    // Se muestra la cantidad de productos...
    await container.getAll().then(
        objects => console.log(`Se encontraron ${objects.length} productos`)
    )

    // Se muestra el producto con id 1...
    await container.getById(1).then(
        object => object.length > 0 ? console.log(`Se encontro el producto con title: ${object[0].title}`) : console.log('No se encontró el producto')
    )

    // Si el producto tiene un id que no corresponde ,entonces no se encuentra el producto
    await container.getById(id>2).then(
        object => object.length > 0 ? console.log(`Se encontro el producto con title: ${object[0].title}`) : console.log('No se encontró el producto')
    )

    await container.deleteById(1).then(
        () => console.log('Se eliminó el producto con id 1')
    )

    await container.getAll().then(
        objects => console.log(`Se encontraron ${objects.length} productos`)
    )

     await container.save(producto).then(
        id => console.log(`Se guardó el producto con id: ${id}`)
    )

    // Se borran todos los productos...
    await container.deleteAll().then(
        () => console.log('Se eliminaron todos los productos')
    )
    
    // Se muestra la cantidad de productos nuevamente... Debería haber 0...
    await container.getAll().then(
        objects => console.log(`Se encontraron ${objects.length} productos`)
    )
}

main()