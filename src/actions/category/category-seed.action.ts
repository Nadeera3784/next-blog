'use server'

import databaseConnector from '@/database';
import { Category } from '@/database/models';

export async function categorySeedAction() {
   await databaseConnector();
   await Category.create([
      {
         name: "Business"
      },
      {
         name: "Music"
      },
      {
         name: "Lifestyle"
      },
      {
         name: "Fashion"
      },
      {
         name: "Finance"
      },
      {
         name: "Travel"
      },
      {
         name: "Sports"
      }
   ]);
}