import StockDTO from '../dto/StockDTO.js'

class RepositorioStock {
    async crearStock(cantidad){
        const stock = await StockDTO.create({cantidad});
        return stock.toJSON();
    }

    async cambiarStock(stock){
        return await StockDTO.update({cantidad: stock.cantidad}, {where: {id: stock.id}});
    }

    async buscarStockPorId(id){
        const stock = await StockDTO.findByPk(id);
        if(!stock){
            return {error: "Stock no encontrado", code: 404};
        }
        return stock.toJSON();
    }
}

export default RepositorioStock;