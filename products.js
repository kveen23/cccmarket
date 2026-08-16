const products = [
    {
        id: 1,
        name: "Acrylc Marker",
        price: 42.00,
        category: "art",
        desc: "24 colours",
        image: "jpg/ACRYLIC MARKER.jpg",
        colors: [
            { name: "24 colours", code: "#000000" }
        ]
    },
    {
        id: 2,
        name: "A4 Clipboard",
        price: 40.00,
        category: "stationery",
        desc: "10 Pcs",
        image: "jpg/CLIPBOARD.jpg",
        colors: [
            { name: "Black", code: "#ffffff" }
        ]
    },
    {
        id: 34,
        name: "3 Tier Library Cart",
        price: 300.00,
        category: "stationery",
        desc: "Type V",
        image: "jpg/3 tier cart.jpg",
        colors: [
            { name: "Standard", code: "#000000" }
        ]
    },
    {
        id: 35,
        name: "3 Tier Library Cart",
        price: 300.00,
        category: "stationery",
        desc: "Type T",
        image: "jpg/3 Tier Storage cart.jpg",
        colors: [
            { name: "Standard", code: "#000000" }
        ]
    },
    {
        id: 41,
        name: "3 Tier Library Cart",
        price: 300.00,
        category: "stationery",
        desc: "Type L",
        image: "jpg/3 Tier Cart L.jpg",
        colors: [
            { name: "Standard", code: "#000000" }
        ]
    },
    {
        id: 44,
        name: "2 Tier Library Cart",
        price: 250.00,
        category: "stationery",
        desc: "Type V",
        image: "jpg/2 Tier Cart V.jpg",
        colors: [
            { name: "Standard", code: "#000000" }
        ]
    },
    {
        id: 45,
        name: "2 Tier Library Cart",
        price: 255.00,
        category: "stationery",
        desc: "Flat",
        image: "jpg/2 Tier Cart FLAT.jpg",
        colors: [
            { name: "Standard", code: "#000000" }
        ]
    },
    {
        id: 3,
        name: "Basketball Size 5",
        price: 138,
        category: "sports",
        desc: "PU Leather",
        image: "jpg/PINK BASKETBALL S5.jpg",
        colors: [
            { name: "Pink", code: "#000000" }
        ]
    },
    {
        id: 4,
        name: "Folding Mattress",
        price: 388,
        category: "sports",
        desc: "200x100x20cm",
        image: "jpg/FOLDING MONEY.jpg",
        colors: [
            { name: "Green", code: "#55855e" }
        ]
    },
    {
        id: 5,
        name: "Pickle Ball Set",
        price: 80.00,
        category: "sports",
        desc: "Free 2 Balls",
        image: "jpg/PB.jpg",
        colors: [
            { name: "Black", code: "#eab308" }
        ]
    },
    {
        id: 6,
        name: "Table Tennis Set",
        price: 30.00,
        category: "sports",
        desc: "2 Bats + 3 Balls",
        image: "jpg/TTR 2.jpg",
        colors: [
            { name: "Red", code: "#ef4444" }
        ]
    },
    {
        id: 7,
        name: "Table Tennis Set DF",
        price: 15.00,
        category: "sports",
        desc: "2 Bats + 6 Balls",
        image: "jpg/TTR DF.jpg",
        colors: [
            { name: "Red", code: "#8b5cf6" }
        ]
    },
    {
        id: 8,
        name: "Marking Disc Set",
        price: 14.00,
        category: "sports",
        desc: "10 pieces, storage bag",
        image: "jpg/MARKER.jpg",
        colors: [
            { name: "Multicolour", code: "#000000" }
        ]
    },
    {
        id: 9,
        name: "Joinfit Strength Rubber",
        price: 35.00,
        category: "sports",
        desc: "15-35 pounds",
        image: "jpg/JF PB 15-35.jpg",
        colors: [
            { name: "Red", code: "#d97706" }
        ]
    },
    {
        id: 10,
        name: "Joinfit Strength Rubber",
        price: 48.00,
        category: "sports",
        desc: "25-65 pounds",
        image: "jpg/JF PB 25-65.jpg",
        colors: [
            { name: "black", code: "#92400e" }
        ]
    },
    {
        id: 11,
        name: "Football",
        price: 120.00,
        category: "Sports",
        desc: "Molten No.4",
        image: "jpg/SOCCER NO 4.jpg",
        colors: [
            { name: "Blue", code: "#10b981" }
        ]
    },
    {
        id: 12,
        name: "Water Rocket Set",
        price: 58.50,
        category: "stem",
        desc: "Rocket Launcher, rocket body set",
        image: "jpg/WATER ROCKET.jpg",
        colors: [
            { name: "Multicolour", code: "#2563eb" }
        ]
    },
    {
        id: 13,
        name: "Gold Trophy 03",
        price: 23,
        category: "trophy-medal",
        desc: "Resin Trophy",
        image: "jpg/RESIN TROPHY 03.jpg",
        colors: [
            { name: "Gold", code: "#eab308" }
        ]
    },
    {
        id: 14,
        name: "Gold Trophy 26",
        price: 23.00,
        category: "trophy-medal",
        desc: "Premium Trophy Award",
        image: "jpg/RESIN TROPHY 26.jpg",
        colors: [
            { name: "Gold", code: "#eab308" }
        ]
    },
    {
        id: 15,
        name: "Camping Tent",
        price: 100.00,
        category: "camping",
        desc: "2x1.8x1.2m",
        image: "jpg/CP2.jpg",
        colors: [
            { name: "Green", code: "#16a34a" }
        ]
    },
    {
        id: 16,
        name: "Sleeping Bag",
        price: 52.00,
        category: "camping",
        desc: "0.95kg lightweight Sleeping Bag",
        image: "jpg/SLEEPING BAG.jpg",
        colors: [
            { name: "Black", code: "#000000" }
        ]
    },
    {
        id: 17,
        name: "3d Pen",
        price: 52.00,
        category: "stem",
        desc: "Free 3 roll PLA fiments",
        image: "jpg/3D PEN.jpg",
        colors: [
            { name: "Blue", code: "#2563eb" }
        ]
    },
    {
        id: 18,
        name: "Camping Tent",
        price: 58.00,
        category: "camping",
        desc: "2x1.25x1.1m",
        image: "jpg/CP1.jpg",
        colors: [
            { name: "Green", code: "#2563eb" }
        ]
    },
    {
        id: 19,
        name: "Agility Hurdles",
        price: 43.00,
        category: "sports",
        desc: "15cm x 5",
        image: "jpg/AGILITY HURDLES.jpg",
        colors: [
            { name: "Blue", code: "#2563eb" }
        ]
    },
    {
        id: 20,
        name: "Large Wheat Medal",
        price: 4.00,
        category: "trophy-medal",
        desc: "65mm x 4mm",
        image: "jpg/LARGE WHEAR MEDAL.jpg",
        colors: [
            { name: "Gold", code: "#2563eb" },
            { name: "Silver", code: "#2563eb" },
            { name: "Bronze", code: "#2563eb" }
        ]
    },
    {
        id: 21,
        name: "Steel Scoreboard",
        price: 78.00,
        category: "sports",
        desc: "36.5cmx13.5cmx23cm",
        image: "jpg/RB SCOREBOARD.jpg",
        colors: [
            { name: "Red Blue", code: "#2563eb" }
        ]
    },
    {
        id: 22,
        name: "Shuttlecocks Launcher",
        price: 350.00,
        category: "sports",
        desc: "Free 6 Shuttlecocks",
        image: "jpg/SC LAUNCHER.jpg",
        colors: [
            { name: "White", code: "#2563eb" }
        ]
    },
    {
        id: 23,
        name: "Table Tennis Ball Launcher",
        price: 95.00,
        category: "sports",
        desc: "Free 10 balls",
        image: "jpg/TT LAUNCHER.jpg",
        colors: [
            { name: "White", code: "#2563eb" }
        ]
    },
    {
        id: 24,
        name: "Multipurpose Scoreboard",
        price: 90.00,
        category: "sports",
        desc: "38.8cm x 19cm x 20cm",
        image: "jpg/BY SCOREBOARD.jpg",
        colors: [
            { name: "Black", code: "#2563eb" }
        ]
    },
    {
        id: 42,
        name: "Shuttlecocks",
        price: 95.00,
        category: "sports",
        desc: "DHS 12 pieces",
        image: "jpg/DHS SHUTTLECOCKS.jpg",
        colors: [
            { name: "DHS", code: "#000000" }
        ]
    },
    {
        id: 43,
        name: "Pertable Net",
        price: 130.00,
        category: "sports",
        desc: "one set with 3.1M lenght Net",
        image: "jpg/Portable Net 3.1.jpg",
        colors: [
            { name: "Standard", code: "#000000" }
        ]
    },
    {
        id: 26,
        name: "Gold Trophy 30",
        price: 23.00,
        category: "trophy-medal",
        desc: "Premium Trophy Award",
        image: "jpg/RESIN TROPHY 30.jpg",
        colors: [
            { name: "Gold", code: "#eab308" }
        ]
    },
    {
        id: 27,
        name: "Micro bit",
        price: 80.00,
        category: "stem",
        desc: "BBC micro bit",
        image: "jpg/STEM MB.jpg",
        colors: [
            { name: "Multicolor", code: "#eab308" }
        ]
    },
    {
        id: 28,
        name: "Micro Bit Set",
        price: 280.00,
        category: "stem",
        desc: "Starter Kit",
        image: "jpg/STEM MBSK.jpg",
        colors: [
            { name: "Multicolor", code: "#eab308" }
        ]
    },
    {
        id: 29,
        name: "Percussion set",
        price: 60.00,
        category: "music",
        desc: "in set of 7 percussion",
        image: "jpg/Percussion set 7 pcs.jpg",
        colors: [
            { name: "Multicolor", code: "#eab308" }
        ]
    },
    {
        id: 33,
        name: "Glockenspiel",
        price: 130.00,
        category: "music",
        desc: "16 Notes",
        image: "jpg/Glockenspiel.jpg",
        colors: [
            { name: "Multicolor", code: "#000000" }
        ]
    },
    {
        id: 36,
        name: "Alice Rhythm Egg Shaker",
        price: 8.00,
        category: "music",
        desc: "1 piece",
        image: "jpg/Alice Rhythm Egg Shaker.jpg",
        colors: [
            { name: "Purple", code: "#8b5cf6" },
            { name: "Red", code: "#ef4444" },
            { name: "Green", code: "#22c55e" },
            { name: "Blue", code: "#2563eb" },
            { name: "Black", code: "#000000" },
            { name: "Yellow", code: "#eab308" }
        ]
    },
    {
        id: 37,
        name: "Rhythm Egg Shaker",
        price: 3.00,
        category: "music",
        desc: "2 pieces",
        image: "jpg/Rhythm Egg Shaker.jpg",
        colors: [
            { name: "Red", code: "#ef4444" },
            { name: "Blue", code: "#2563eb" },
            { name: "Yellow", code: "#eab308" },
            { name: "Green", code: "#22c55e" },
            { name: "Pink", code: "#ec4899" }
        ]
    },
    {
        id: 38,
        name: "Wooden Claves",
        price: 5.00,
        category: "music",
        desc: "1 pair",
        image: "jpg/Wooden Claves.jpg",
        colors: [
            { name: "Wooden", code: "#000000" }
        ]
    },
    {
        id: 39,
        name: "TAMBOURINE",
        price: 6.00,
        category: "music",
        desc: "11 cm x 13cm",
        image: "jpg/TAMBOURINE.jpg",
        colors: [
            { name: "Red", code: "#ef4444" },
            { name: "Yellow", code: "#eab308" },
            { name: "Blue", code: "#2563eb" },
            { name: "Green", code: "#22c55e" },
            { name: "Pink", code: "#ec4899" },
            { name: "White", code: "#ffffff" },
            { name: "Black", code: "#000000" }
        ]
    },
    {
        id: 40,
        name: "Drum",
        price: 70.00,
        category: "music",
        desc: "35 cm",
        image: "jpg/drum 35cm.jpg",
        colors: [
            { name: "Red", code: "#ef4444" }
        ]
    },
    {
        id: 30,
        name: "Custom 3D Printed Collectible",
        price: 0,
        priceText: "Contact Us",
        category: "printing",
        desc: "Custom made 3D printed figure",
        image: "jpg/printing-3d.jpg",
        colors: [
            { name: "Custom Made", code: "#facc15" }
        ]
    },
    {
        id: 31,
        name: "Custom 3D Printed Keepsake",
        price: 0,
        priceText: "Contact Us",
        category: "printing",
        desc: "Personalized 3D printed display figure",
        image: "jpg/printing-3d-2.jpg",
        colors: [
            { name: "Custom Made", code: "#facc15" }
        ]
    },
    {
        id: 32,
        name: "Custom 3D Printed Story Figure",
        price: 0,
        priceText: "Contact Us",
        category: "printing",
        desc: "Made to last personalized collectible",
        image: "jpg/printing-3d-3.jpg",
        colors: [
            { name: "Custom Made", code: "#facc15" }
        ]
    },
];
