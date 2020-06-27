import Problem from '../models/Problems';
import Order from '../models/Order';

class ProblemController {
    async index(req, res) {
        const problems = await Problem.findAll({ include: [{ model: Order, as: 'order', attributes: ['id', 'product'] }] });
        return res.json(problems);
    }

    async store(req, res) {
        const { delivery: order_id } = req.params;
        const { description } = req.body;
        const problem = await Problem.create({ order_id, description });
        return res.status(201).json(problem);
    }
}

export default new ProblemController();