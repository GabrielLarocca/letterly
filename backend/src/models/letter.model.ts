import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Letter extends Model {
  public id!: number;
  public userId!: number;
  public planId?: number | null;
  public phrase!: string;
  public font?: string;
  public colorScheme?: string;
  public animation?: string;
  public backgroundMusicUrl?: string;
  public uniqueLink!: string;
  public qrCode?: string;
  public expiryDate?: Date | null;
  public photoUrls!: string[];

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Letter.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    planId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    phrase: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    font: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    colorScheme: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    animation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    backgroundMusicUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    uniqueLink: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    qrCode: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    photoUrls: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
  },
  {
    sequelize,
    tableName: 'letters'
  }
);

export default Letter;
