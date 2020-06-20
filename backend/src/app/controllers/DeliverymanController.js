import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/Files';
import { Op } from 'sequelize';

class DeliverymanController {
    async index(req, res) {
        const deliverymen = await Deliveryman.findAll({
            attributes: { exclude: ['avatar_id'] },
            include: [ { model: File, as: 'avatar', attributes: ['id', 'url', 'path'] } ]
        });
        return res.json(deliverymen);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            name: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) 
            return res.status(400).json({ error: 'Validation fails' });
        const { email } = req.body;
        const existsDeliveryman = await Deliveryman.findOne({ where: { email } }, {
            include: [ { model: File, as: 'avatar', attributes: ['id', 'url', 'path'] } ]
        });
        if (existsDeliveryman) return res.status(400).json({ error: 'E-mail already exists!' });
        const deliveryman = await Deliveryman.create(req.body);
        return res.json(deliveryman);
    }

    async show(req, res) {
        const deliveryman = await Deliveryman.findByPk(req.params.deliveryman, {
            attributes: { exclude: ['avatar_id'] },
            include: [ { model: File, as: 'avatar', attributes: ['id', 'url', 'path'] } ]
        });
        if (!deliveryman) res.status(204).json();
        return res.json(deliveryman);
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            name: Yup.string().required(),
        });
        if (!(await schema.isValid(req.body))) 
            return res.status(400).json({ error: 'Validation fails' });
        const { email } = req.body;
        const id = req.params.deliveryman;
        let deliveryman = await Deliveryman.findByPk(req.params.deliveryman, { attributes: ['id'] });
        if (!deliveryman) return res.status(204).json();
        const existsDeliveryman = await Deliveryman.findOne({ where: { email, id : { [Op.not]: id }} });
        if (existsDeliveryman) return res.status(400).json({ error: 'E-mail already exists!' });
        await deliveryman.update(req.body);
        let deliverymanUpdated = await Deliveryman.findByPk(req.params.deliveryman, {
            attributes: { exclude: ['avatar_id'] },
            include: [ { model: File, as: 'avatar', attributes: ['id', 'url', 'path'] } ]
        });
        return res.json(deliverymanUpdated);
    }

    async delete(req, res) {
        const id = req.params.deliveryman;
        const deliveryman = await Deliveryman.findByPk(id, { attributes: ['id'] });
        if (!deliveryman) res.status(204).json();
        await deliveryman.destroy();
        return res.json();
    }
}

export default new DeliverymanController();