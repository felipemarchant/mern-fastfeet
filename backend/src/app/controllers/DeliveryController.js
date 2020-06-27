import Order from '../models/Order';
import { Op } from 'sequelize';
import { startOfDay, endOfDay } from 'date-fns';

class DeliveryController {
    async index(req, res) {
        const { deliveryman: deliveryman_id } = req.params;
        const orders = await Order.findAll({ where: { deliveryman_id, canceled_at: null, end_date: null } });
        return res.json(orders);
    }

    async update(req, res) {
        const { deliveryman: deliveryman_id, delivery: id } = req.params;
        const { start_date, end_date } = req.body;
        const order = await Order.findOne({ where: { id, deliveryman_id, canceled_at: null } });
        const date = new Date();
        const limit = start_date ?
            await Order.count({ where: { id, deliveryman_id, start_date: { [Op.between]: [startOfDay(date), endOfDay(date)] } } }) :
            0;
        console.log(limit);
        if (limit >= 5)
            return res.status(400).json({ error: 'The Limit is five deliveries per day' });
        let data = start_date ? { start_date: new Date() } : {};
        data = end_date ? { ...data, end_date: new Date() } : data;
        await order.update(data);
        return res.json(order);
    }

    async delivered(req, res) {
        const { deliveryman: deliveryman_id } = req.params;
        const orders = await Order.findAll({ where: { deliveryman_id, end_date: { [Op.not]: null } } });
        return res.json(orders);
    }
}

export default new DeliveryController();