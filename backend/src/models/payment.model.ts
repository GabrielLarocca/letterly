import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { PaymentAttributes } from '../interfaces';

class Payment extends Model<PaymentAttributes> {
  public id!: number;
  public letterId?: number | null;
  public userId?: number | null;
  public amount!: number;
  public currency!: string;
  public paymentMethod?: string;
  public paymentStatus!: string;
  public transactionId!: string;
  public metadata?: any;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Payment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    letterId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'letters',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'BRL'
    },
    paymentMethod: {
      type: DataTypes.STRING,
      allowNull: true
    },
    paymentStatus: {
      type: DataTypes.STRING,
      allowNull: false
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true
    }
  },
  {
    sequelize,
    tableName: 'payments',
    timestamps: true
  }
);

export default Payment;
