'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('letters', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      plan_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'plans',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      },
      phrase: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      font: Sequelize.STRING,
      color_scheme: Sequelize.STRING,
      animation: Sequelize.STRING,
      background_music_url: Sequelize.STRING,
      unique_link: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
      },
      qr_code: Sequelize.STRING,
      expiry_date: Sequelize.DATE,
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('letters');
  }
};