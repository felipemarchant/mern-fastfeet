import Sequelize, { Model } from 'sequelize';

export default class Deliveryman extends Model {
    static init(sequelize) {
        super.init({
            name: Sequelize.STRING,
            email: Sequelize.STRING, 
        }, { sequelize, tableName: 'deliverymen' });
        return this;
    }

    static associate(models) {
        this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
    }
};
