'use server'

import { faker } from '@faker-js/faker';
import databaseConnector from '../../database';
import { Post } from '../../database/models';

export async function postSeedAction() {
   await databaseConnector();
   await Post.create(
      {
        'title': faker.lorem.words(5),
        'description': faker.lorem.paragraph(50)
      }
   );
}