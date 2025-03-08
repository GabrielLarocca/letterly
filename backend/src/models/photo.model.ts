import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { PhotoAttributes } from '../interfaces/index';

class Photo extends Model<PhotoAttributes> {
  public id!: number;
  public letterId!: number;
  public imageUrl!: string;
  public displayOrder?: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Photo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    letterId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    displayOrder: {
      type: DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    sequelize,
    tableName: 'photos'
  }
);

export default Photo;
