import Sequelize, { Model } from 'sequelize';

export default class Problems extends Model {
    static init(sequelize) {
        super.init({
            description: Sequelize.STRING
        }, { sequelize, tableName: 'delivery_problems' });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.Order, { foreignKey: 'order_id', as: 'order' });
    }
};