import { DataTypes, Model } from 'sequelize';

/**
 * History model
 */
class History extends Model {
  public id!: number;
  public url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

/**
 * Connection WhatsIncludedItem with History
 */
class WhatsIncludedItemHistory extends Model {}

const init = (db) => {
  History.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },           {
    sequelize: db,
    tableName: 'History',
  });
};

export {
  History, init,
};
