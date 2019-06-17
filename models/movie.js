'use strict';

const {
  Model
} = require('objection');

class Movie extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'movies';
  }

  // optional and only used for validation
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'year', 'director'],
      properties: {
        name: {
          type: 'string',
          minLength: 1,
          maxLength: 255
        }
      }
    };
  }
}

module.exports = Movie;