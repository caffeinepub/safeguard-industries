import Text "mo:core/Text";
import Array "mo:core/Array";
import Iter "mo:core/Iter";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Order "mo:core/Order";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import Blob "mo:core/Blob";
import Int "mo:core/Int";

actor {
  // Types
  type Product = {
    id : Nat;
    name : Text;
    category : Text;
    price : Float;
    description : Text;
    imageUrl : Text;
    inStock : Bool;
  };

  type ContactSubmission = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    timestamp : Int;
  };

  type Testimonial = {
    id : Nat;
    customerName : Text;
    company : Text;
    rating : Nat;
    review : Text;
    avatarUrl : Text;
  };

  type SafetyArticle = {
    id : Nat;
    title : Text;
    category : Text;
    summary : Text;
    content : Text;
    publishedDate : Int;
  };

  type CartItem = {
    productId : Nat;
    quantity : Nat;
  };

  module CartItem {
    public func compare(x : CartItem, y : CartItem) : Order.Order {
      Nat.compare(x.productId, y.productId);
    };
  };

  // Storage
  let products = Map.empty<Nat, Product>();
  let contactSubmissions = Map.empty<Nat, ContactSubmission>();
  let testimonials = Map.empty<Nat, Testimonial>();
  let safetyArticles = Map.empty<Nat, SafetyArticle>();
  let shoppingCarts = Map.empty<Text, [CartItem]>();

  var nextProductId = 1;
  var nextContactId = 1;
  var nextArticleId = 1;

  // Product Functions
  public query ({ caller }) func getAllProducts() : async [Product] {
    products.values().toArray();
  };

  public query ({ caller }) func getProductsByCategory(category : Text) : async [Product] {
    products.values().toArray().filter(func(p) { p.category == category });
  };

  // Contact Form
  public shared ({ caller }) func submitContactForm(name : Text, email : Text, message : Text) : async Bool {
    let id = nextContactId;
    nextContactId += 1;
    let submission : ContactSubmission = {
      id;
      name;
      email;
      message;
      timestamp = Time.now();
    };
    contactSubmissions.add(id, submission);
    true;
  };

  // Testimonials & Articles
  public query ({ caller }) func getAllTestimonials() : async [Testimonial] {
    testimonials.values().toArray();
  };

  public query ({ caller }) func getAllArticles() : async [SafetyArticle] {
    safetyArticles.values().toArray();
  };

  // Shopping Cart
  public shared ({ caller }) func addToCart(sessionId : Text, productId : Nat, quantity : Nat) : async Bool {
    let currentCart = switch (shoppingCarts.get(sessionId)) {
      case (null) { [] };
      case (?cart) { cart };
    };

    let updatedCart = if (quantity == 0) {
      currentCart.filter(func(item) { item.productId != productId });
    } else {
      let withoutProduct = currentCart.filter(func(item) { item.productId != productId });
      withoutProduct.concat([
        {
          productId;
          quantity;
        },
      ]);
    };

    shoppingCarts.add(sessionId, updatedCart.sort());
    true;
  };

  public query ({ caller }) func getCart(sessionId : Text) : async [CartItem] {
    switch (shoppingCarts.get(sessionId)) {
      case (null) { [] };
      case (?cart) { cart };
    };
  };

  public shared ({ caller }) func removeFromCart(sessionId : Text, productId : Nat) : async Bool {
    switch (shoppingCarts.get(sessionId)) {
      case (null) { false };
      case (?cart) {
        let updatedCart = cart.filter(func(item) { item.productId != productId });
        shoppingCarts.add(sessionId, updatedCart);
        true;
      };
    };
  };

  public shared ({ caller }) func clearCart(sessionId : Text) : async Bool {
    shoppingCarts.remove(sessionId);
    true;
  };

  // Seeding
  public shared ({ caller }) func seedData() : async () {
    addProducts();
    addTestimonials();
    addArticles();
  };

  func addProducts() {
    let sampleProducts : [Product] = [
      {
        id = nextProductId;
        name = "Flame Resistant Coveralls";
        category = "Oil & Gas";
        price = 6599.0;
        description = "Premium flame-resistant coveralls for oil & gas workers.";
        imageUrl = "fr-clothing";
        inStock = true;
      },
      {
        id = nextProductId + 1;
        name = "Gas Detection Monitor";
        category = "Oil & Gas";
        price = 24999.0;
        description = "Portable gas detector for hazardous environments.";
        imageUrl = "gas-detector";
        inStock = true;
      },
      {
        id = nextProductId + 2;
        name = "Chemical Resistant Gloves";
        category = "Chemical Safety";
        price = 1049.0;
        description = "Nitrile gloves resistant to harsh chemicals.";
        imageUrl = "chem-gloves";
        inStock = true;
      },
      {
        id = nextProductId + 3;
        name = "Eyewash Station";
        category = "Chemical Safety";
        price = 13299.0;
        description = "Wall-mounted emergency eyewash station.";
        imageUrl = "eyewash";
        inStock = true;
      },
      {
        id = nextProductId + 4;
        name = "High-Visibility Vest";
        category = "Road Safety";
        price = 1499.0;
        description = "Reflective high-visibility vest for road workers.";
        imageUrl = "reflective-jacket";
        inStock = true;
      },
      {
        id = nextProductId + 5;
        name = "Traffic Cones (Pack of 10)";
        category = "Road Safety";
        price = 3749.0;
        description = "Durable traffic cones for temporary road safety.";
        imageUrl = "traffic-cones";
        inStock = true;
      },
      {
        id = nextProductId + 6;
        name = "Fire Extinguisher (ABC)";
        category = "Fire Safety";
        price = 5399.0;
        description = "Multi-purpose ABC fire extinguisher for emergencies.";
        imageUrl = "fire-extinguisher";
        inStock = true;
      },
      {
        id = nextProductId + 7;
        name = "Chemical Spill Kit";
        category = "Chemical Safety";
        price = 10799.0;
        description = "Complete chemical spill response kit with absorbent pads and hazmat bags.";
        imageUrl = "chemical-spill-kit";
        inStock = true;
      },
      {
        id = nextProductId + 8;
        name = "Road Safety Barricade";
        category = "Road Safety";
        price = 7449.0;
        description = "Sturdy barricade for road construction sites.";
        imageUrl = "barricades";
        inStock = true;
      },
      {
        id = nextProductId + 9;
        name = "Safety Boots (Steel Toe)";
        category = "Personal Protection";
        price = 3999.0;
        description = "Steel toe cap safety boots with anti-slip sole for industrial use.";
        imageUrl = "safety-boots";
        inStock = true;
      },
      {
        id = nextProductId + 10;
        name = "Industrial Hard Hat";
        category = "Personal Protection";
        price = 899.0;
        description = "High-impact ABS hard hat helmet with adjustable suspension.";
        imageUrl = "hard-hat";
        inStock = true;
      },
      {
        id = nextProductId + 11;
        name = "Heavy Duty Work Gloves";
        category = "Personal Protection";
        price = 599.0;
        description = "Cut-resistant, grip-enhanced work gloves for heavy industrial tasks.";
        imageUrl = "work-gloves";
        inStock = true;
      },
      {
        id = nextProductId + 12;
        name = "Radium Reflective Tape";
        category = "Road Safety";
        price = 299.0;
        description = "High-visibility radium reflective tape for road marking and safety gear.";
        imageUrl = "radium-reflective";
        inStock = true;
      },
      {
        id = nextProductId + 13;
        name = "Road Safety Signs Kit";
        category = "Road Safety";
        price = 4499.0;
        description = "Complete road safety signs kit with warning triangles and delineators.";
        imageUrl = "road-safety-kit";
        inStock = true;
      },
      {
        id = nextProductId + 14;
        name = "CO2 Fire Extinguisher";
        category = "Fire Safety";
        price = 4299.0;
        description = "CO2 fire extinguisher ideal for electrical and chemical fires.";
        imageUrl = "fire-extinguisher";
        inStock = true;
      },
    ];

    for (product in sampleProducts.values()) {
      products.add(product.id, product);
    };

    nextProductId += sampleProducts.size();
  };

  func addTestimonials() {
    let testimonialsArray : [Testimonial] = [
      {
        id = 1;
        customerName = "Michael Smith";
        company = "OilIndustry Corp";
        rating = 5;
        review = "SafeGuard's flame-resistant gear has exceeded our expectations. Fast shipping and excellent customer service!";
        avatarUrl = "michael_smith.jpg";
      },
      {
        id = 2;
        customerName = "Sarah Johnson";
        company = "Chemical Solutions";
        rating = 4;
        review = "We've purchased several items for our lab facilities. Great quality at affordable prices.";
        avatarUrl = "sarah_johnson.jpg";
      },
      {
        id = 3;
        customerName = "David Rodriguez";
        company = "Highway Works";
        rating = 5;
        review = "The road safety products have helped keep our crews protected. Highly recommended!";
        avatarUrl = "david_rodriguez.jpg";
      },
      {
        id = 4;
        customerName = "Lisa Chen";
        company = "PetroSafe";
        rating = 5;
        review = "Responsive team and reliable products. SafeGuard is our go-to for all safety equipment.";
        avatarUrl = "lisa_chen.jpg";
      },
    ];

    for (testimonial in testimonialsArray.values()) {
      testimonials.add(testimonial.id, testimonial);
    };
  };

  func addArticles() {
    let articlesArray : [SafetyArticle] = [
      {
        id = 1;
        title = "Top 10 Oil & Gas Safety Tips";
        category = "Oil & Gas";
        summary = "Discover the essential safety practices for oil and gas operations in our latest article.";
        content = "Full content coming soon...";
        publishedDate = Time.now();
      },
      {
        id = 2;
        title = "Handling Hazardous Chemicals Safely";
        category = "Chemical Safety";
        summary = "Learn how to minimize risk when working with dangerous chemicals in industrial settings.";
        content = "Full content coming soon...";
        publishedDate = Time.now();
      },
      {
        id = 3;
        title = "Improving Road Worker Safety";
        category = "Road Safety";
        summary = "Explore the latest advancements in road and construction worker safety equipment.";
        content = "Full content coming soon...";
        publishedDate = Time.now();
      },
    ];

    for (article in articlesArray.values()) {
      safetyArticles.add(article.id, article);
    };

    nextArticleId += articlesArray.size();
  };
};
