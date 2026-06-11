const { sequelize, City, CityActivity } = require('../models');

/**
 * Seed city_activities table with activities for each city
 */
const seedActivities = async () => {
  try {
    await sequelize.sync();

    // Get all cities from database
    const cities = await City.findAll();
    
    if (cities.length === 0) {
      console.log('No cities found. Please run cities seeder first.');
      return 0;
    }

    const allActivities = [];

    // Activity templates by category
    const activityTemplates = {
      sightseeing: [
        { name: 'City Walking Tour', est_duration: 3, est_cost: 25, description: 'Explore the city on foot with a local guide' },
        { name: 'Historic Landmark Visit', est_duration: 2, est_cost: 15, description: 'Visit iconic historical sites' },
        { name: 'Museum Entry', est_duration: 2.5, est_cost: 20, description: 'Explore art and history museums' },
        { name: 'Observation Deck', est_duration: 1.5, est_cost: 30, description: 'Panoramic city views from above' },
        { name: 'Cathedral/Church Tour', est_duration: 1, est_cost: 10, description: 'Architectural and religious heritage' }
      ],
      food: [
        { name: 'Local Food Market Tour', est_duration: 2, est_cost: 35, description: 'Taste local specialties at markets' },
        { name: 'Traditional Restaurant Dinner', est_duration: 2, est_cost: 40, description: 'Authentic local cuisine experience' },
        { name: 'Street Food Crawl', est_duration: 3, est_cost: 25, description: 'Sample best street food spots' },
        { name: 'Cooking Class', est_duration: 3, est_cost: 60, description: 'Learn to cook local dishes' },
        { name: 'Wine/Beer Tasting', est_duration: 2, est_cost: 45, description: 'Regional beverage tasting experience' }
      ],
      adventure: [
        { name: 'Hiking Trail', est_duration: 4, est_cost: 20, description: 'Nature trails with scenic views' },
        { name: 'Water Sports', est_duration: 2, est_cost: 50, description: 'Kayaking, surfing, or snorkeling' },
        { name: 'Zip-lining', est_duration: 2, est_cost: 65, description: 'Adrenaline rush through nature' },
        { name: 'Rock Climbing', est_duration: 3, est_cost: 55, description: 'Guided climbing experience' },
        { name: 'Bicycle Tour', est_duration: 3, est_cost: 30, description: 'Explore the city on two wheels' }
      ],
      culture: [
        { name: 'Traditional Performance', est_duration: 2, est_cost: 40, description: 'Local music, dance, or theater' },
        { name: 'Art Gallery Visit', est_duration: 1.5, est_cost: 15, description: 'Contemporary and classic art' },
        { name: 'Cultural Workshop', est_duration: 2, est_cost: 35, description: 'Hands-on traditional crafts' },
        { name: 'Temple/Shrine Visit', est_duration: 1.5, est_cost: 10, description: 'Spiritual and cultural sites' },
        { name: 'Local Festival Experience', est_duration: 3, est_cost: 20, description: 'Seasonal cultural celebrations' }
      ],
      shopping: [
        { name: 'Souvenir Market', est_duration: 2, est_cost: 50, description: 'Browse local crafts and gifts' },
        { name: 'Designer District', est_duration: 3, est_cost: 100, description: 'High-end shopping experience' },
        { name: 'Flea Market Hunt', est_duration: 2, est_cost: 30, description: 'Vintage and antique finds' },
        { name: 'Local Artisan Shops', est_duration: 2, est_cost: 40, description: 'Handmade local products' },
        { name: 'Mall Experience', est_duration: 3, est_cost: 75, description: 'Modern shopping centers' }
      ],
      nightlife: [
        { name: 'Rooftop Bar', est_duration: 2, est_cost: 35, description: 'Drinks with city views' },
        { name: 'Live Music Venue', est_duration: 3, est_cost: 30, description: 'Local bands and performances' },
        { name: 'Night Club', est_duration: 4, est_cost: 40, description: 'Dancing and DJ sets' },
        { name: 'Pub Crawl', est_duration: 4, est_cost: 45, description: 'Tour of best local bars' },
        { name: 'Evening River Cruise', est_duration: 2, est_cost: 50, description: 'Scenic night boat tour' }
      ],
      nature: [
        { name: 'Botanical Garden', est_duration: 2, est_cost: 15, description: 'Peaceful plant collections' },
        { name: 'National Park Day Trip', est_duration: 6, est_cost: 40, description: 'Natural wonders nearby' },
        { name: 'Beach Day', est_duration: 4, est_cost: 20, description: 'Relaxation by the sea' },
        { name: 'Wildlife Sanctuary', est_duration: 3, est_cost: 30, description: 'Animal encounters' },
        { name: 'Sunset Viewpoint', est_duration: 2, est_cost: 10, description: 'Golden hour photography' }
      ],
      wellness: [
        { name: 'Spa Treatment', est_duration: 2, est_cost: 80, description: 'Massage and relaxation' },
        { name: 'Yoga Class', est_duration: 1.5, est_cost: 25, description: 'Mindfulness and stretching' },
        { name: 'Thermal Baths', est_duration: 3, est_cost: 45, description: 'Natural hot springs' },
        { name: 'Meditation Retreat', est_duration: 2, est_cost: 35, description: 'Inner peace session' },
        { name: 'Wellness Center Visit', est_duration: 2, est_cost: 50, description: 'Holistic health treatments' }
      ]
    };

    // Generate activities for each city
    cities.forEach(city => {
      // Each city gets 2-3 activities per category
      Object.entries(activityTemplates).forEach(([category, templates]) => {
        const numActivities = Math.floor(Math.random() * 2) + 2; // 2-3 per category
        const selectedTemplates = templates.sort(() => 0.5 - Math.random()).slice(0, numActivities);
        
        selectedTemplates.forEach(template => {
          allActivities.push({
            city_id: city.id,
            name: template.name,
            category: category,
            description: template.description,
            est_duration: template.est_duration,
            est_cost: template.est_cost + (city.cost_index * 0.1), // Adjust cost based on city
            image_url: `/images/activities/${category}_${Math.floor(Math.random() * 5)}.jpg`
          });
        });
      });
    });

    // Clear existing activities
    await CityActivity.destroy({ truncate: true });

    // Insert activities
    await CityActivity.bulkCreate(allActivities);

    console.log(`✓ Seeded ${allActivities.length} activities across ${cities.length} cities`);
    return allActivities.length;
  } catch (err) {
    console.error('Error seeding activities:', err);
    throw err;
  }
};

if (require.main === module) {
  seedActivities()
    .then(() => {
      console.log('Activities seeder completed');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { seedActivities };
