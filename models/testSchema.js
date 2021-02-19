const mongoose = require("mongoose");
const Review = require("./Review");
const Product = require("./Product");
const faker = require("faker");
const bcrypt = require("bcryptjs");

const cleanData = async () => {
  try {
    await mongoose.connection.dropDatabase();
  } catch (error) {
    console.log(error);
  }
};

const images = [
  {
    name: "Gỏi Cuốn",
    url: "https://i.ibb.co/vPStQ3B/Vietnamese-style-Cold-Rolls1.jpg",
    price: 50,
    category: "Vietnamese Cuisine",
    info: "",
  },
  {
    name: "Dalgona Cafe",
    url:
      "https://i.pinimg.com/474x/6b/5e/12/6b5e12c735eb5e79c85e52deac0c329c.jpg",
    price: 65,
    category: "Cafe",
    info: "",
  },
  {
    name: "Bò Kho",
    url:
      "https://pupswithchopsticks.com/wp-content/uploads/bo-kho-portrait-new.jpg",
    price: 120,
    category: "Vietnamese Cuisine",
    info: "",
  },

  {
    name: "Cơm Tấm",
    url:
      "https://www.cooking-therapy.com/wp-content/uploads/2020/06/Com-Suon-5-scaled.webp",
    price: 50,
    category: "Vietnamese Cuisine",
    info: "",
  },

  {
    name: "Bánh Mì",
    url:
      "https://i.pinimg.com/originals/b5/9a/c2/b59ac265cc9d8af62bc37b611748de63.jpg",
    price: 20,
    category: "Vietnamese Cuisine",
    info: "",
  },

  {
    name: "Cafe Sữa Đá",
    url:
      "https://i.pinimg.com/474x/07/83/e8/0783e8e23350266ecf66f5ad0758e46b.jpg",
    price: 20,
    category: "Cafe",
    info: "",
  },
  {
    name: " Bạc Sỉu",
    url:
      "https://i.pinimg.com/474x/5f/98/90/5f9890cb510cd553a1cf8416869c6bb0.jpg",
    price: 32,
    category: "Cafe",
    info: `Theo chân những người gốc Hoa đến định cư tại Sài Gòn, Bạc sỉu là cách gọi tắt của "Bạc tẩy sỉu phé" trong tiếng Quảng Đông, chính là: Ly sữa trắng kèm một chút cà phê.`,
  },

  {
    name: "Chè Dưỡng Nhan",
    url:
      "https://i.pinimg.com/564x/d3/c3/40/d3c340a6324440ba398e3993a758d850.jpg",
    price: 20,
    category: "dessert",
    info: "",
  },

  {
    name: "Trà đào cam xả",
    url:
      "https://images.squarespace-cdn.com/content/v1/53883795e4b016c956b8d243/1546250129547-1N2EH9UHV68A27A7XFJL/ke17ZwdGBToddI8pDm48kPxsHqATejRA5moR2RGgs0AUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8PaoYXhp6HxIwZIk7-Mi3Tsic-L2IOPH3Dwrhl-Ne3Z24_hv09MkdbP-FVwyWw_5DHlgnoSQtDWLhpO1Tfk-8aY6liCGkj4dr9PBmyqqYlee/chup-anh-mon-an-com-ga-thuong-hai-3.jpg",
    price: 35,
    category: "tea",
    info: "",
  },

  {
    name: "Soda Dâu",
    url:
      "https://i.pinimg.com/474x/96/66/23/966623b0e577a00c2313c6283edcd210.jpg",
    price: 35,
    category: "drink",
    info: "",
  },
  {
    name: "Trà Dâu",
    url:
      "https://i.pinimg.com/originals/79/24/60/792460b574de9c5ce2dadccc0fe3076e.jpg",
    price: 40,
    category: "drink",
    info: "",
  },
  {
    name: "Trà Sữa Trân Châu",
    url:
      "https://image.tuoitreplus.com/upload/2021/01/11/660/5-loai-thuc-pham-1-inmqux.jpg",
    price: 30,
    category: "tea",
    info: "",
  },
  {
    name: "Café Phin",
    url:
      "https://i.pinimg.com/474x/98/d0/23/98d0237449f83e93c03219ad39a85622.jpg",
    price: 20,
    category: "Cafe",
    info: "",
  },
  {
    name: "Chè Khúc Bạch ",
    url:
      "https://media.cooky.vn/recipe/g2/13033/s/recipe13033-635685093483911595.jpg",
    price: 30,
    category: "dessert",
    info: "",
  },
  {
    name: "Chè Khoai Đài Loan",
    url:
      "https://afamilycdn.com/2019/6/25/che-khoai-deo-6-1561476865028287150704-crop-15614772986531986203180.jpg",
    price: 20,
    category: "dessert",
    info: "",
  },
  {
    name: "Tàu Hủ Nước Đường",
    url:
      "https://i.pinimg.com/originals/7d/b7/ba/7db7ba751f6505a6c5ed7daf5deb9e21.jpg",
    price: 20,
    category: "dessert",
    info: "",
  },
  {
    name: "Tiramisu",
    url: "https://cf.shopee.vn/file/1da213cb26e04ea5551e37a4d519b645",
    price: 35,
    category: "dessert",
    info: "",
  },
  {
    name: "Chè Trôi Nước",
    url:
      "https://giadinh.tv/wp-content/uploads/2020/09/cach-nau-che-troi-nuoc-5-1.jpg",
    price: 20,
    category: "dessert",
    info: "",
  },
  {
    name: "Cơm Hấp Lá Sen",
    url:
      "https://200monanchay.weebly.com/uploads/1/1/1/8/111814259/mon-com-chay-goi-la-sen_orig.jpg",
    price: 120,
    category: "Vietnamese Cuisine",
    info: "",
  },
  {
    name: "Bánh Xèo",
    url:
      "https://i.pinimg.com/564x/d0/e4/23/d0e423a228f3d7fadd2d2324dc89e2c0.jpg",
    price: 55,
    category: "Vietnamese Cuisine",
    info: "",
  },
];

const createRandomProduct = async (productNum) => {
  try {
    console.log(`CREATING ${productNum} products`);
    console.log("--------------------------");
    products = [];
    for (let i = 0; i < productNum; i++) {
      const product = await Product.create({
        name: images[i].name,
        price: images[i].price,
        images: images[i].url,
        category: images[i].category,
        info: images[i].info,
      });
      products.push(product);
    }
    console.log("PRODUCTS CREATED---------------");
    return products;
  } catch (error) {
    console.log(error);
  }
};

const main = async (genData = true) => {
  if (genData) {
    await cleanData();

    const products = await createRandomProduct(images.length);
    // const reviews = await createRandomReviews(blogs, users);
  }
};

main();
