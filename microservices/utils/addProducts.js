const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  {
    id: 1,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/5ad8ae85956631.5d8bb61e6835c.gif",
    name: "Party wear",
    description: "Party wear tshirt with leaf print in green color",
    price: "$10.00",
  },
  {
    id: 2,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/1ec49885956631.5d8bb61df18aa.gif",
    name: "Morgan-10 jersy",
    description: "Jersy with number 10 and name Morgan printed on it",
    price: "$20.00",
  },
  {
    id: 3,
    image: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/62dc1d85956631.6065d58050383.gif",
    name: "Cotton T-shirt",
    description: "Cotton tshirt with an asthetic print on it",
    price: "$30.00",
  },
  {
    id: 4,
    image: '/src/assets/discordshirt.gif',
    name: "Discord Tshirt",
    description: "Blue color official discord tshirt with logo on it",
    price: "$40.00",
  },
  {
    id: 5,
    image: '/src/assets/premium.gif',
    name: "Jersy - Mr.360",
    description: "Golder T shirt of Mr 360 AB Devilliers",
    price: "$50.00",
  },
  {
    id: 6,
    image: '/src/assets/bluenow.gif',
    name: "H&M",
    description: "Classic H&M tshirt with blue color and print",
    price: "$60.00",
  },
  {
    id: 7,
    image: "https://adn-static1.nykaa.com/nykdesignstudio-images/pub/media/catalog/product/c/6/c61a106SS-194777_1.jpg?rnd=20200526195200&tr=w-512",
    name: "Pink Hoodie",
    description: "100% cotton Hoodie from H&M in pink color",
    price: "$70.00",
  },
  {
    id: 8,
    image: "https://rukminim2.flixcart.com/image/850/1000/xif0q/t-shirt/o/c/x/xxs-227990-the-souled-store-original-imagtg77ff88xhq3.jpeg?q=90&crop=false",
    name: "Black Hoodie",
    description: "Spiderman logo hoodie in black color from the souled store",
    price: "$80.00",
  },
  {
    id: 9,
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1678714298_6785666.jpg?format=webp&w=300&dpr=1.0",
    name: "Oversized Black Hoodie ",
    description: "Full sleeve black hoodie with a print ",
    price: "$90.00",
  },
  {
    id: 10,
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1667644726_6316268.jpg?format=webp&w=300&dpr=1.0",
    name: "Multi color T shirt",
    description: "Full sleeve multi color tshirt by H&M",
    price: "$100.00",
  },
  {
    id: 11,
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1710507600_4168428.jpg?format=webp&w=300&dpr=1.0",
    name: "Spiderman Backprint",
    description: "Spiderman backprint tshirt from the souled store",
    price: "$110.00",
  },
  {
    id: 12,
    image: "https://prod-img.thesouledstore.com/public/theSoul/uploads/catalog/product/1665589159_9997026.jpg?format=webp&w=300&dpr=1.0",
    name: "Black Hoodie",
    description: "Zipper hoodie in black color from the souled store",
    price: "$120.00",
  },
];


mongoose.connect('mongodb+srv://hollanishan:nishanholla@cluster0.17plk7p.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    addProducts();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));



async function addProducts() {
  try {
    for (const productData of products) {
      const { id, image, name, description, price } = productData;
      
      const product = new Product({
        productId: id.toString(),
        name,
        price: parseFloat(price.replace('$', '')), // Remove '$' and parse as float
        description,
        image
      });

      // Save the product to the database
      await product.save();
      console.log('Product added successfully:', productData);
    }
  } catch (error) {
    console.error('Error adding products:', error);
  } finally {
    // Disconnect from MongoDB after adding products
    mongoose.disconnect();
  }
}
