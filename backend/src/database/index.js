import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipient from '../app/models/Recipient';
import File from '../app/models/Files';
import Deliveryman from '../app/models/Deliveryman';
import Order from '../app/models/Order';
import Problem from '../app/models/Problems';

import config from '../config/database';

const models = [User, Recipient, File, Deliveryman, Order, Problem];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(config);
        models.map(model => model.init(this.connection))
            .map(model => model.associate && model.associate(this.connection.models))
    }
}

new Database();