import Recipient from '../models/Recipient';

class RecipientController {
    async index(req, res) {
        const recipients = await Recipient.findAll();
        res.json(recipients);
    }
    async store(req, res) {
        const recipient = await Recipient.create(req.body);
        return res.json(recipient);
    }
    async update(req, res) {
        const recipient = await Recipient.findByPk(req.params.id);
        recipient.update(req.body);
        return res.json(recipient);
    }
}

export default new RecipientController();