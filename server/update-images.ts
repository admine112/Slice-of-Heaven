import { db } from './db';
import { pizzas } from '@shared/schema';

async function updateImages() {
  console.log('🖼️  Updating pizza images...');

  const imageUrl = '/attached_assets/generated_images/pizza_slice_icon.png';

  await db.update(pizzas).set({ imageUrl });

  console.log('✅ All pizza images updated to:', imageUrl);
  process.exit(0);
}

updateImages().catch((error) => {
  console.error('❌ Update failed:', error);
  process.exit(1);
});
