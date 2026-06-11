const { sequelize, City } = require('../models');

/**
 * Seed cities table with 100+ popular travel destinations
 */
const seedCities = async () => {
  try {
    await sequelize.sync();

    const cities = [
      // Europe
      { name: 'Paris', country: 'France', region: 'Western Europe', description: 'The City of Light', cost_index: 150.00, popularity: 98, image_url: '/images/cities/paris.jpg' },
      { name: 'London', country: 'United Kingdom', region: 'Northern Europe', description: 'Historic capital with royal heritage', cost_index: 160.00, popularity: 96, image_url: '/images/cities/london.jpg' },
      { name: 'Rome', country: 'Italy', region: 'Southern Europe', description: 'The Eternal City', cost_index: 120.00, popularity: 94, image_url: '/images/cities/rome.jpg' },
      { name: 'Barcelona', country: 'Spain', region: 'Southern Europe', description: 'Gaudi architecture and beaches', cost_index: 100.00, popularity: 92, image_url: '/images/cities/barcelona.jpg' },
      { name: 'Amsterdam', country: 'Netherlands', region: 'Western Europe', description: 'Canals and museums', cost_index: 130.00, popularity: 88, image_url: '/images/cities/amsterdam.jpg' },
      { name: 'Berlin', country: 'Germany', region: 'Central Europe', description: 'History and culture hub', cost_index: 90.00, popularity: 85, image_url: '/images/cities/berlin.jpg' },
      { name: 'Prague', country: 'Czech Republic', region: 'Central Europe', description: 'City of a hundred spires', cost_index: 60.00, popularity: 87, image_url: '/images/cities/prague.jpg' },
      { name: 'Vienna', country: 'Austria', region: 'Central Europe', description: 'Imperial elegance', cost_index: 110.00, popularity: 83, image_url: '/images/cities/vienna.jpg' },
      { name: 'Budapest', country: 'Hungary', region: 'Central Europe', description: 'Thermal baths and ruins', cost_index: 55.00, popularity: 84, image_url: '/images/cities/budapest.jpg' },
      { name: 'Lisbon', country: 'Portugal', region: 'Southern Europe', description: 'Colorful hills and trams', cost_index: 70.00, popularity: 89, image_url: '/images/cities/lisbon.jpg' },
      { name: 'Athens', country: 'Greece', region: 'Southern Europe', description: 'Ancient cradle of civilization', cost_index: 65.00, popularity: 80, image_url: '/images/cities/athens.jpg' },
      { name: 'Florence', country: 'Italy', region: 'Southern Europe', description: 'Renaissance art capital', cost_index: 100.00, popularity: 86, image_url: '/images/cities/florence.jpg' },
      { name: 'Venice', country: 'Italy', region: 'Southern Europe', description: 'Floating city of canals', cost_index: 140.00, popularity: 90, image_url: '/images/cities/venice.jpg' },
      { name: 'Dublin', country: 'Ireland', region: 'Northern Europe', description: 'Literary pubs and history', cost_index: 120.00, popularity: 78, image_url: '/images/cities/dublin.jpg' },
      { name: 'Edinburgh', country: 'United Kingdom', region: 'Northern Europe', description: 'Scottish castle city', cost_index: 110.00, popularity: 82, image_url: '/images/cities/edinburgh.jpg' },
      { name: 'Copenhagen', country: 'Denmark', region: 'Northern Europe', description: 'Hygge and design', cost_index: 170.00, popularity: 81, image_url: '/images/cities/copenhagen.jpg' },
      { name: 'Stockholm', country: 'Sweden', region: 'Northern Europe', description: 'Scandinavian beauty', cost_index: 160.00, popularity: 79, image_url: '/images/cities/stockholm.jpg' },
      { name: 'Oslo', country: 'Norway', region: 'Northern Europe', description: 'Fjords and modern architecture', cost_index: 180.00, popularity: 75, image_url: '/images/cities/oslo.jpg' },
      { name: 'Brussels', country: 'Belgium', region: 'Western Europe', description: 'Chocolate and EU capital', cost_index: 120.00, popularity: 76, image_url: '/images/cities/brussels.jpg' },
      { name: 'Zurich', country: 'Switzerland', region: 'Western Europe', description: 'Alpine finance hub', cost_index: 250.00, popularity: 77, image_url: '/images/cities/zurich.jpg' },
      
      // Asia
      { name: 'Tokyo', country: 'Japan', region: 'East Asia', description: 'Neon lights and tradition', cost_index: 140.00, popularity: 97, image_url: '/images/cities/tokyo.jpg' },
      { name: 'Kyoto', country: 'Japan', region: 'East Asia', description: 'Temples and geisha', cost_index: 110.00, popularity: 91, image_url: '/images/cities/kyoto.jpg' },
      { name: 'Seoul', country: 'South Korea', region: 'East Asia', description: 'K-pop and palaces', cost_index: 100.00, popularity: 88, image_url: '/images/cities/seoul.jpg' },
      { name: 'Bangkok', country: 'Thailand', region: 'Southeast Asia', description: 'Street food and temples', cost_index: 40.00, popularity: 93, image_url: '/images/cities/bangkok.jpg' },
      { name: 'Singapore', country: 'Singapore', region: 'Southeast Asia', description: 'Garden city-state', cost_index: 150.00, popularity: 90, image_url: '/images/cities/singapore.jpg' },
      { name: 'Bali', country: 'Indonesia', region: 'Southeast Asia', description: 'Tropical paradise', cost_index: 50.00, popularity: 92, image_url: '/images/cities/bali.jpg' },
      { name: 'Hanoi', country: 'Vietnam', region: 'Southeast Asia', description: 'Old quarter charm', cost_index: 35.00, popularity: 82, image_url: '/images/cities/hanoi.jpg' },
      { name: 'Ho Chi Minh City', country: 'Vietnam', region: 'Southeast Asia', description: 'Dynamic southern hub', cost_index: 40.00, popularity: 80, image_url: '/images/cities/hcmc.jpg' },
      { name: 'Chiang Mai', country: 'Thailand', region: 'Southeast Asia', description: 'Mountain temples', cost_index: 35.00, popularity: 85, image_url: '/images/cities/chiangmai.jpg' },
      { name: 'Phuket', country: 'Thailand', region: 'Southeast Asia', description: 'Beach resort island', cost_index: 60.00, popularity: 87, image_url: '/images/cities/phuket.jpg' },
      { name: 'Kuala Lumpur', country: 'Malaysia', region: 'Southeast Asia', description: 'Twin towers and food', cost_index: 50.00, popularity: 81, image_url: '/images/cities/kl.jpg' },
      { name: 'Manila', country: 'Philippines', region: 'Southeast Asia', description: 'Island gateway', cost_index: 45.00, popularity: 72, image_url: '/images/cities/manila.jpg' },
      { name: 'Hong Kong', country: 'China', region: 'East Asia', description: 'Skyline and dim sum', cost_index: 160.00, popularity: 89, image_url: '/images/cities/hk.jpg' },
      { name: 'Shanghai', country: 'China', region: 'East Asia', description: 'Futuristic metropolis', cost_index: 100.00, popularity: 86, image_url: '/images/cities/shanghai.jpg' },
      { name: 'Beijing', country: 'China', region: 'East Asia', description: 'Forbidden City and Great Wall', cost_index: 80.00, popularity: 88, image_url: '/images/cities/beijing.jpg' },
      { name: 'Taipei', country: 'Taiwan', region: 'East Asia', description: 'Night markets and mountains', cost_index: 70.00, popularity: 83, image_url: '/images/cities/taipei.jpg' },
      { name: 'Mumbai', country: 'India', region: 'South Asia', description: 'Bollywood gateway', cost_index: 40.00, popularity: 78, image_url: '/images/cities/mumbai.jpg' },
      { name: 'Delhi', country: 'India', region: 'South Asia', description: 'Historic capital', cost_index: 35.00, popularity: 75, image_url: '/images/cities/delhi.jpg' },
      { name: 'Jaipur', country: 'India', region: 'South Asia', description: 'Pink City palaces', cost_index: 40.00, popularity: 80, image_url: '/images/cities/jaipur.jpg' },
      { name: 'Goa', country: 'India', region: 'South Asia', description: 'Beaches and Portuguese heritage', cost_index: 45.00, popularity: 82, image_url: '/images/cities/goa.jpg' },
      { name: 'Dubai', country: 'UAE', region: 'Middle East', description: 'Luxury and skyscrapers', cost_index: 180.00, popularity: 91, image_url: '/images/cities/dubai.jpg' },
      { name: 'Abu Dhabi', country: 'UAE', region: 'Middle East', description: 'Grand mosque and culture', cost_index: 160.00, popularity: 80, image_url: '/images/cities/abudhabi.jpg' },
      { name: 'Istanbul', country: 'Turkey', region: 'Middle East', description: 'Where East meets West', cost_index: 60.00, popularity: 90, image_url: '/images/cities/istanbul.jpg' },
      
      // Americas
      { name: 'New York City', country: 'USA', region: 'North America', description: 'The Big Apple', cost_index: 200.00, popularity: 98, image_url: '/images/cities/nyc.jpg' },
      { name: 'Los Angeles', country: 'USA', region: 'North America', description: 'Hollywood dreams', cost_index: 180.00, popularity: 92, image_url: '/images/cities/la.jpg' },
      { name: 'San Francisco', country: 'USA', region: 'North America', description: 'Golden Gate and tech', cost_index: 200.00, popularity: 90, image_url: '/images/cities/sf.jpg' },
      { name: 'Las Vegas', country: 'USA', region: 'North America', description: 'Entertainment capital', cost_index: 150.00, popularity: 88, image_url: '/images/cities/vegas.jpg' },
      { name: 'Miami', country: 'USA', region: 'North America', description: 'Art Deco beaches', cost_index: 170.00, popularity: 87, image_url: '/images/cities/miami.jpg' },
      { name: 'Chicago', country: 'USA', region: 'North America', description: 'Windy City architecture', cost_index: 150.00, popularity: 84, image_url: '/images/cities/chicago.jpg' },
      { name: 'Boston', country: 'USA', region: 'North America', description: 'Freedom Trail history', cost_index: 160.00, popularity: 80, image_url: '/images/cities/boston.jpg' },
      { name: 'Seattle', country: 'USA', region: 'North America', description: 'Coffee and space needle', cost_index: 150.00, popularity: 82, image_url: '/images/cities/seattle.jpg' },
      { name: 'Washington DC', country: 'USA', region: 'North America', description: 'Museums and monuments', cost_index: 160.00, popularity: 83, image_url: '/images/cities/dc.jpg' },
      { name: 'Toronto', country: 'Canada', region: 'North America', description: 'CN Tower and diversity', cost_index: 140.00, popularity: 85, image_url: '/images/cities/toronto.jpg' },
      { name: 'Vancouver', country: 'Canada', region: 'North America', description: 'Mountains and ocean', cost_index: 150.00, popularity: 86, image_url: '/images/cities/vancouver.jpg' },
      { name: 'Montreal', country: 'Canada', region: 'North America', description: 'French-Canadian culture', cost_index: 110.00, popularity: 82, image_url: '/images/cities/montreal.jpg' },
      { name: 'Mexico City', country: 'Mexico', region: 'Central America', description: 'Aztec heritage and food', cost_index: 50.00, popularity: 85, image_url: '/images/cities/mexicocity.jpg' },
      { name: 'Cancun', country: 'Mexico', region: 'Central America', description: 'Caribbean beaches', cost_index: 100.00, popularity: 88, image_url: '/images/cities/cancun.jpg' },
      { name: 'Playa del Carmen', country: 'Mexico', region: 'Central America', description: 'Riviera Maya paradise', cost_index: 90.00, popularity: 84, image_url: '/images/cities/playa.jpg' },
      { name: 'Buenos Aires', country: 'Argentina', region: 'South America', description: 'Tango and steak', cost_index: 50.00, popularity: 86, image_url: '/images/cities/buenosaires.jpg' },
      { name: 'Rio de Janeiro', country: 'Brazil', region: 'South America', description: 'Carnival and Christ statue', cost_index: 70.00, popularity: 90, image_url: '/images/cities/rio.jpg' },
      { name: 'São Paulo', country: 'Brazil', region: 'South America', description: 'Business and culture hub', cost_index: 60.00, popularity: 78, image_url: '/images/cities/saopaulo.jpg' },
      { name: 'Lima', country: 'Peru', region: 'South America', description: 'Gastronomy capital', cost_index: 50.00, popularity: 82, image_url: '/images/cities/lima.jpg' },
      { name: 'Cusco', country: 'Peru', region: 'South America', description: 'Gateway to Machu Picchu', cost_index: 45.00, popularity: 88, image_url: '/images/cities/cusco.jpg' },
      { name: 'Santiago', country: 'Chile', region: 'South America', description: 'Andean capital', cost_index: 70.00, popularity: 77, image_url: '/images/cities/santiago.jpg' },
      { name: 'Bogotá', country: 'Colombia', region: 'South America', description: 'High-altitude culture', cost_index: 40.00, popularity: 76, image_url: '/images/cities/bogota.jpg' },
      { name: 'Cartagena', country: 'Colombia', region: 'South America', description: 'Colonial Caribbean port', cost_index: 60.00, popularity: 83, image_url: '/images/cities/cartagena.jpg' },
      
      // Africa & Oceania
      { name: 'Cape Town', country: 'South Africa', region: 'Southern Africa', description: 'Table Mountain beauty', cost_index: 60.00, popularity: 87, image_url: '/images/cities/capetown.jpg' },
      { name: 'Marrakech', country: 'Morocco', region: 'North Africa', description: 'Red City souks', cost_index: 50.00, popularity: 85, image_url: '/images/cities/marrakech.jpg' },
      { name: 'Cairo', country: 'Egypt', region: 'North Africa', description: 'Pyramids and Nile', cost_index: 40.00, popularity: 82, image_url: '/images/cities/cairo.jpg' },
      { name: 'Nairobi', country: 'Kenya', region: 'East Africa', description: 'Safari gateway', cost_index: 55.00, popularity: 74, image_url: '/images/cities/nairobi.jpg' },
      { name: 'Sydney', country: 'Australia', region: 'Oceania', description: 'Opera House harbour', cost_index: 170.00, popularity: 92, image_url: '/images/cities/sydney.jpg' },
      { name: 'Melbourne', country: 'Australia', region: 'Oceania', description: 'Coffee and laneways', cost_index: 150.00, popularity: 88, image_url: '/images/cities/melbourne.jpg' },
      { name: 'Auckland', country: 'New Zealand', region: 'Oceania', description: 'City of sails', cost_index: 140.00, popularity: 82, image_url: '/images/cities/auckland.jpg' },
      { name: 'Queenstown', country: 'New Zealand', region: 'Oceania', description: 'Adventure capital', cost_index: 130.00, popularity: 85, image_url: '/images/cities/queenstown.jpg' },
      { name: 'Fiji Islands', country: 'Fiji', region: 'Oceania', description: 'Tropical island paradise', cost_index: 120.00, popularity: 84, image_url: '/images/cities/fiji.jpg' }
    ];

    // Clear existing cities
    await City.destroy({ truncate: true });

    // Insert cities
    await City.bulkCreate(cities);

    console.log(`✓ Seeded ${cities.length} cities`);
    return cities.length;
  } catch (err) {
    console.error('Error seeding cities:', err);
    throw err;
  }
};

if (require.main === module) {
  seedCities()
    .then(() => {
      console.log('Cities seeder completed');
      process.exit(0);
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = { seedCities };
