import { DataTypes, Model } from 'sequelize';

/**
 * History model
 */
class History extends Model {
  public id!: number;
  public videoId!: string;
  public title!: string;
  public thumbnail!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

const init = (db) => {
  History.init({
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    videoId: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    title: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
    thumbnail: {
      type: new DataTypes.STRING(128),
      allowNull: false,
    },
  },           {
    sequelize: db,
    tableName: 'history',
  });
};

export {
  History, init,
};
