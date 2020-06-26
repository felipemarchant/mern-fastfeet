import Order from '../models/Order';

class DeliveryController {
    async index(req, res) {
        const { deliveryman: deliveryman_id } = req.params;
        const orders = await Order.findAll({ where: { deliveryman_id, canceled_at: null, end_date: null } });
        res.json(orders);
    }
}

export default new DeliveryController();