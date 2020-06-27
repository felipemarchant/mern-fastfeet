import Order from '../models/Order';
import { Op } from 'sequelize';

class DeliveryController {
    async index(req, res) {
        const { deliveryman: deliveryman_id } = req.params;
        const orders = await Order.findAll({ where: { deliveryman_id, canceled_at: null, end_date: null } });
        return res.json(orders);
    }

    async update(req, res) {
        const { deliveryman: deliveryman_id } = req.params;
        const { start_date, end_date } = req.body;
        const orders = await Order.findAll({ where: { deliveryman_id, canceled_at: null } });
        let data = start_date ? { start_date: new Date() } : {};
        data = end_date ? { ...data, end_date: new Date() } : data;
        orders.update(data);
        return res.json(orders);
    }

    async delivered(req, res) {
        const { deliveryman: deliveryman_id } = req.params;
        const orders = await Order.findAll({ where: { deliveryman_id, end_date: { [Op.not]: null } } });
        return res.json(orders);
    }
}

export default new DeliveryController();