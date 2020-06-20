import Sequelize, { Model } from 'sequelize';

export default class Order extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING, 
        }, { sequelize });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Recipient, { foreignKey: 'recipient_id', as: 'recipient' });
        this.belongsTo(models.Deliveryman, { foreignKey: 'deliveryman_id', as: 'deliveryman' });
        this.belongsTo(models.File, { foreignKey: 'signature_id', as: 'signature' });
    }
};