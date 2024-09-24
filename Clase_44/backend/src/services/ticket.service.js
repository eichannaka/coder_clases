import persistence from '../persistence/dao/factory.js';
const { ticketDao, cartDao, prodDao } = persistence;


export const createPurchaseTicket = async (user) => {
    try {
        //Obtener el carrito por id
        const cart = await cartDao.getById(user.cart);
        
        if(!cart) {
            throw new Error('Cart not found');
        }
        let amountAcc = 0;

        if(cart.products.length > 0) {
            for (const prodInCart of cart.products) {
                const idProd = prodInCart.product;
                const prodDB = await prodDao.getById(idProd);

                if(prodInCart.quantity <= prodDB.stock) {
                    const amount = prodInCart.quantity * prodDB.price;
                    amountAcc += amount;
                } else {
                    throw new Error(`Not enough stock for product ${idProd}`);
                }
            }   
        }

        const ticket = await ticketDao.create(
            {
                purchase_datetime: new Date().toLocaleString(),
                amount: amountAcc,
                products: cart.products,
                purchaser: user.email
            }
        );

        await cartDao.cleanCart(user.cart);

        return ticket;
    } catch (error) {
        throw new Error(error);
    }
};

export const getAllTickets = async () => {
    try {
        return await ticketDao.getAll();
    } catch (error) {
        throw new Error(error);
    }
}


export const getTicketsById = async (tid) => {
    try {
        return await ticketDao.getById(tid);
    } catch (error) {
        throw new Error(error);
    }
};

export const getTicketsByUser = async (userId) => {
    try {
        return await ticketDao.getByUserId(userId);
    } catch (error) {
        throw new Error(error.message);
    }
};


