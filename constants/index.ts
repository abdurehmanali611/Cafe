export const NavbarContent = [
  {
    id: 1,
    name: "Home",
  },
  {
    id: 2,
    name: "About",
  },
  {
    id: 3,
    name: "Gallery",
  },
  {
    id: 4,
    name: "Menu",
  },
  {
    id: 5,
    name: "Events",
  },
];

export const menu = [
  {
    id: 1,
    name: "Veggie Pizza",
    image: "/assets/pizza.jpg",
    description:
      "Stone-baked pizza with mozzarella, tomato sauce, and roasted garden vegetables.",
    ingredients: ["Mozzarella", "Tomato sauce", "Bell pepper", "Olives", "Onion"],
    price: 640,
    popular: true,
    category: "Main",
  },
  {
    id: 2,
    name: "Chocolate Cake",
    image: "/assets/cake.jpg",
    description:
      "Soft chocolate sponge layered with cream and finished with a smooth cocoa glaze.",
    ingredients: ["Chocolate sponge", "Cream", "Cocoa glaze"],
    price: 160,
    popular: true,
    category: "Dessert",
  },
  {
    id: 3,
    name: "Club Sandwich",
    image: "/assets/sandwich.jpg",
    description:
      "Toasted sandwich stacked with chicken, lettuce, tomato, and creamy house spread.",
    ingredients: ["Chicken", "Lettuce", "Tomato", "House sauce", "Toasted bread"],
    price: 420,
    popular: true,
    category: "Main",
  },
  {
    id: 4,
    name: "Fresh Juice",
    image: "/assets/drink.jpg",
    description:
      "Seasonal juice served chilled and blended fresh daily with ripe fruit.",
    ingredients: ["Seasonal fruit", "Ice"],
    price: 170,
    popular: true,
    category: "Drink",
  },
  {
    id: 5,
    name: "Classic Burger",
    image: "/assets/burger.jpg",
    description:
      "Juicy beef burger layered with crisp lettuce, tomato, cheese, and signature sauce.",
    ingredients: ["Beef patty", "Cheese", "Lettuce", "Tomato", "Brioche bun"],
    price: 560,
    popular: false,
    category: "Main",
  },
  {
    id: 6,
    name: "French Fries",
    image: "/assets/frenchfries.jpg",
    description: "Golden crispy fries seasoned lightly and served hot from the fryer.",
    ingredients: ["Potato", "Sea salt", "House seasoning"],
    price: 220,
    popular: false,
    category: "Side",
  },
  {
    id: 7,
    name: "Garden Salad",
    image: "/assets/salad.jpg",
    description:
      "Fresh lettuce, tomato, cucumber, and herbs with a bright house dressing.",
    ingredients: ["Lettuce", "Tomato", "Cucumber", "Herbs", "House dressing"],
    price: 280,
    popular: false,
    category: "Light",
  },
  {
    id: 8,
    name: "Vanilla Ice Cream",
    image: "/assets/icecream.jpg",
    description:
      "Creamy vanilla ice cream finished with a delicate sweet drizzle.",
    ingredients: ["Fresh cream", "Vanilla", "Sweet topping"],
    price: 180,
    popular: false,
    category: "Dessert",
  },
];

export const specialMenus = menu.filter((item) => item.popular).slice(0, 3);

export const gallery = [
  {
    id: 1,
    image: "/assets/gallery1.jpg",
    title: "Moody coffee corner",
    message: "Warm lighting and slow mornings in our most loved corner.",
  },
  {
    id: 2,
    image: "/assets/gallery2.jpg",
    title: "Freshly plated favorites",
    message: "Signature dishes prepared to look as good as they taste.",
  },
  {
    id: 3,
    image: "/assets/gallery3.jpg",
    title: "Cozy indoor seating",
    message: "Comfortable spaces designed for work, dates, and long catch-ups.",
  },
  {
    id: 4,
    image: "/assets/gallery4.jpg",
    title: "Dessert moments",
    message:
      "Beautiful sweets, soft textures, and a little indulgence after every meal.",
  },
  {
    id: 5,
    image: "/assets/gallery5.jpg",
    title: "Coffee in motion",
    message: "A closer look at the craft behind every rich and smooth pour.",
  },
  {
    id: 6,
    image: "/assets/gallery7.jpg",
    title: "Cafe atmosphere",
    message: "The everyday scenes that make Cafi feel familiar and special.",
  },
];

export const events = [
  {
    id: 1,
    title: "Acoustic Coffee Night",
    description:
      "A relaxed evening of live acoustic music, soft lights, and signature drinks.",
    image: "/assets/event1.jpg",
    startDate: new Date("2026-04-12T18:00:00"),
    endDate: new Date("2026-04-12T21:00:00"),
    ticketPrice: 250,
    location: "Main Lounge",
    featured: true,
    maxRegistrants: 40,
  },
  {
    id: 2,
    title: "Weekend Brunch Social",
    description:
      "Brunch plates, fresh coffee, and an easy social atmosphere for slow weekends.",
    image: "/assets/event2.jpg",
    startDate: new Date("2026-04-19T10:00:00"),
    endDate: new Date("2026-04-19T14:00:00"),
    ticketPrice: 300,
    location: "Garden Side",
    featured: true,
    maxRegistrants: 30,
  },
  {
    id: 3,
    title: "Latte Art Session",
    description:
      "A creative session for coffee lovers who want to learn pours and patterns.",
    image: "/assets/event3.jpg",
    startDate: new Date("2026-04-24T16:00:00"),
    endDate: new Date("2026-04-24T18:00:00"),
    ticketPrice: 350,
    location: "Coffee Bar",
    featured: true,
    maxRegistrants: 20,
  },
  {
    id: 4,
    title: "Dessert Tasting Evening",
    description:
      "Sample a rotating dessert board paired with coffee and house drinks.",
    image: "/assets/event4.jpg",
    startDate: new Date("2026-05-02T17:30:00"),
    endDate: new Date("2026-05-02T20:00:00"),
    ticketPrice: 320,
    location: "Dessert Room",
    featured: false,
    maxRegistrants: 25,
  },
  {
    id: 5,
    title: "Coffee and Conversations",
    description:
      "An open social night for networking, stories, and good coffee.",
    image: "/assets/event5.jpg",
    startDate: new Date("2026-05-10T18:30:00"),
    endDate: new Date("2026-05-10T21:30:00"),
    ticketPrice: 200,
    location: "Upper Deck",
    featured: false,
    maxRegistrants: 35,
  },
  {
    id: 6,
    title: "Chef Special Dinner Pop-Up",
    description:
      "A limited menu evening with elevated plates and a curated dining mood.",
    image: "/assets/event6.jpg",
    startDate: new Date("2026-05-22T19:00:00"),
    endDate: new Date("2026-05-22T22:00:00"),
    ticketPrice: 600,
    location: "Private Hall",
    featured: false,
    maxRegistrants: 18,
  },
];

export const branches = [
  {
    id: 1,
    name: "Cafi Bole Flagship",
    image: "/assets/gallery1.jpg",
    address: "Bole Road, near Medhanialem, Addis Ababa",
    phone: "+251 91 234 5678",
    hours: "Daily, 8:00 AM - 10:00 PM",
    latitude: 8.9806,
    longitude: 38.7578,
    description:
      "Our main branch with signature drinks, a cozy lounge, and the fullest cafe menu.",
  },
  {
    id: 2,
    name: "Cafi Kazanchis",
    image: "/assets/gallery3.jpg",
    address: "Kazanchis Business District, Addis Ababa",
    phone: "+251 91 345 6789",
    hours: "Daily, 7:30 AM - 9:30 PM",
    latitude: 9.0204,
    longitude: 38.7612,
    description:
      "A stylish city branch ideal for coffee meetings, lunch breaks, and evening desserts.",
  },
  {
    id: 3,
    name: "Cafi Sarbet Garden",
    image: "/assets/gallery5.jpg",
    address: "Sarbet, Addis Ababa",
    phone: "+251 91 456 7890",
    hours: "Daily, 8:30 AM - 10:30 PM",
    latitude: 8.9975,
    longitude: 38.7441,
    description:
      "A warmer and quieter branch with relaxed seating, outdoor vibes, and event-friendly corners.",
  },
];

export const sidebarItems = [
  {
    id: 1,
    name: "Dashboard",
    icon: "streamline-sharp-color:dashboard-circle",
  },
  {
    id: 2,
    name: "Update Password",
    icon: "carbon:password",
  },
  {
    id: 3,
    name: "Event Registrants",
    icon: "fluent-color:people-48",
  },
  {
    id: 4,
    name: "Menu",
    icon: "streamline-color:task-list-flat",
  },
  {
    id: 5,
    name: "Events",
    icon: "material-icon-theme:folder-event-open",
  },
  {
    id: 6,
    name: "Branches",
    icon: "glyphs-poly:building",
  },
  {
    id: 7,
    name: "Gallery",
    icon: "flat-color-icons:gallery",
  },
  {
    id: 8,
    name: "Contact",
    icon: "fluent-color:contact-card-32",
  },
];
