import Problem from '../models/Problems';
import Order from '../models/Order';

class ProblemController {
    async index(req, res) {
        const problems = await Problem.findAll({ include: [{ model: Order, as: 'order', attributes: ['id', 'product'] }] });
        return res.json(problems);
    }

    async show(req, res) {
        const { delivery: order_id } = req.params;
        const problems = await Problem.findAll({ where: { order_id } });
        return res.json(problems);
    }

    async store(req, res) {
        const { delivery: order_id } = req.params;
        const { description } = req.body;
        const problem = await Problem.create({ order_id, description });
        return res.status(201).json(problem);
    }

    async cancel(req, res) {
        const { problem: id } = req.params;
        const { order_id } = await Problem.findByPk(id);
        await Order.update({ canceled_at: new Date() }, { where: { id: order_id } });
        return res.json();
    }
}

export default new ProblemController();