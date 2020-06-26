import * as Yup from 'yup';

import Order from '../models/Order';
import Deliveryman from '../models/Deliveryman';
import Files from '../models/Files';
import Recipient from '../models/Recipient';

class OrderController {

    async index(req, res) {
        const orders = await Order.findAll(select);
        res.json(orders);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number().required(),
            deliveryman_id: Yup.number().required(),
            product: Yup.string().required()
        });
        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });
        const order = await Order.create({ ...req.body });
        res.json(order);
    }

    async show(req, res) {
        const order = await Order.findByPk(req.params.order, select);
        res.json(order);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            recipient_id: Yup.number(),
            deliveryman_id: Yup.number(),
            product: Yup.string(),
            signature_id: Yup.number()
        });
        if (!(await schema.isValid(req.body)))
            return res.status(400).json({ error: 'Validation fails' });
        const id = req.params.order;
        let order = await Order.findByPk(id, { attributes: ['id'] });
        if (!order) return res.status(204).json();
        await order.update(req.body);
        let orderUpdated = await Order.findByPk(req.params.order, select);
        return res.json(orderUpdated);
    }

    async delete(req, res) {
        const id = req.params.order;
        const order = await Order.findByPk(id, { attributes: ['id'] });
        if (!order) res.status(204).json();
        await order.destroy();
        return res.json();
    }
}

const select = {
    attributes: {
        exclude: ['recipient_id', 'deliveryman_id', 'signature_id']
    },
    include: [
        {
            model: Deliveryman,
            as: 'deliveryman',
            attributes: { exclude: ['avatar_id'] },
            include: [{ model: Files, as: 'avatar', attributes: ['url', 'id', 'path'] }]
        },
        { model: Files, as: 'signature' },
        { model: Recipient, as: 'recipient' },
    ]
};

export default new OrderController();