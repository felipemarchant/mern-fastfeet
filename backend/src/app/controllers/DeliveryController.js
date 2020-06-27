import Order from '../models/Order';
import { Op } from 'sequelize';

class DeliveryController {
    async index(req, res) {
        const { deliveryman: deliveryman_id } = req.params;
        const orders = await Order.findAll({ where: { deliveryman_id, canceled_at: null, end_date: null } });
        return res.json(orders);
    }

    async delivered(req, res) {
        const { deliveryman: deliveryman_id } = req.params;
        const orders = await Order.findAll({ where: { deliveryman_id, end_date: { [Op.not]: null } } });
        return res.json(orders);
    }
}

export default new DeliveryController();