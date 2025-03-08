import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { PlanAttributes } from '../interfaces/index';

class Plan extends Model<PlanAttributes> {
  public id!: number;
  public name!: string;
  public photoLimit!: number;
  public musicAllowed!: boolean;
  public customization?: any;
  public expiryDuration?: string | null;
  public price!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Plan.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photoLimit: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    musicAllowed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    customization: {
      type: DataTypes.JSONB,
      allowNull: true
    },
    expiryDuration: {
      type: DataTypes.STRING,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'plans'
  }
);

export default Plan;
