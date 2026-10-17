function shot(id, width = 1800) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;
}

export const heroShot = shot("photo-1494976388531-d1058494cdd8", 2400);

export const yardCities = [
  "Delhi",
  "Mumbai",
  "Kolkata",
  "Pune",
  "Bengaluru",
  "Chennai",
  "Chandigarh",
  "Jaipur",
];

export const cars = [
  {
    slug: "ford-mustang-gt-1998",
    name: "Ford Mustang GT",
    year: 1998,
    make: "Ford",
    model: "Mustang GT",
    city: "Mumbai",
    stateCode: "MH",
    plate: "MH 01 GT 4598",
    priceLakh: 26.5,
    km: 68420,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["MODIFIED", "SWAPPED"],
    story:
      "The 4.6 was opened in a Goregaon shed and a blower was hung on the front accessory drive. Second gear still breaks the rear loose if the tarmac is warm.",
    specs: {
      engine: "4.6 Modular V8, supercharged",
      power: "390 bhp",
      owners: 3,
      papers: "Clear, hypothecation closed",
    },
    images: [
      shot("photo-1494976388531-d1058494cdd8"),
      shot("photo-1550355291-bbee04a92027"),
    ],
    featured: true,
  },
  {
    slug: "hindustan-ambassador-1994",
    name: "Hindustan Ambassador",
    year: 1994,
    make: "Hindustan",
    model: "Ambassador",
    city: "Kolkata",
    stateCode: "WB",
    plate: "WB 02 C 1184",
    priceLakh: 3.6,
    km: 112400,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["SINGLE OWNER", "PAPERS CLEAR"],
    story:
      "The 1.8 still wears its Solex, and the mechanic in Shyambazar refuses to fit anything else. Rear door hinges were bushed last monsoon; they sag about half an inch and then stop.",
    specs: {
      engine: "1.8 BMC petrol",
      power: "74 bhp",
      owners: 1,
      papers: "Clear, single name since 1994",
    },
    images: [
      shot("photo-1489824904134-891ab64532f1"),
      shot("photo-1471479917193-f00955256257"),
    ],
    featured: true,
  },
  {
    slug: "hm-contessa-18-1997",
    name: "HM Contessa 1.8 GL",
    year: 1997,
    make: "Hindustan",
    model: "Contessa 1.8 GL",
    city: "Delhi",
    stateCode: "DL",
    plate: "DL 4C A 7781",
    priceLakh: 4.8,
    km: 89110,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["PAPERS CLEAR", "SINGLE OWNER"],
    story:
      "Isuzu 1.8, wood dash intact, gearbox whines in fourth on the Dhaula Kuan flyover. The noise goes away once the oil is hot, which takes the length of Ring Road.",
    specs: {
      engine: "1.8 Isuzu petrol",
      power: "88 bhp",
      owners: 2,
      papers: "Clear",
    },
    images: [
      shot("photo-1532581140115-3e355d1ed1de"),
      shot("photo-1441148345475-03a2e82f9719"),
    ],
    featured: true,
  },
  {
    slug: "premier-padmini-1986",
    name: "Premier Padmini",
    year: 1986,
    make: "Premier",
    model: "Padmini",
    city: "Pune",
    stateCode: "MH",
    plate: "MH 12 F 2209",
    priceLakh: 2.2,
    km: 76400,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["SINGLE OWNER", "PAPERS CLEAR"],
    story:
      "Column shift, and a starter solenoid that needs one tap with a spanner before it bites. Floor pans were patched in 18-gauge at Khadki, welded, not buried in filler.",
    specs: {
      engine: "1.1 Premier petrol",
      power: "42 bhp",
      owners: 1,
      papers: "Clear",
    },
    images: [
      shot("photo-1517153295259-74eb0b416cee"),
      shot("photo-1520340356584-f9917d1eea6f"),
    ],
    featured: true,
  },
  {
    slug: "maruti-zen-2001",
    name: "Maruti Zen",
    year: 2001,
    make: "Maruti",
    model: "Zen",
    city: "Bengaluru",
    stateCode: "KA",
    plate: "KA 03 M 5512",
    priceLakh: 1.9,
    km: 132800,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["STANCED", "MODIFIED"],
    story:
      "The 993 got a hotter cam and the springs were cut a turn too far, so it kisses the Basavanagudi breakers. Single-box exhaust drones from 3,000 rpm and does not apologise.",
    specs: {
      engine: "1.0 MPFI, reground cam",
      power: "68 bhp",
      owners: 4,
      papers: "Clear, engine stamp noted",
    },
    images: [
      shot("photo-1494905998402-395d579af36f"),
      shot("photo-1590362891991-f776e747a588"),
    ],
    featured: true,
  },
  {
    slug: "fiat-1100-1968",
    name: "Fiat 1100",
    year: 1968,
    make: "Fiat",
    model: "1100",
    city: "Chennai",
    stateCode: "TN",
    plate: "TN 09 A 3314",
    priceLakh: 7.4,
    km: 54800,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["PAPERS CLEAR", "SINGLE OWNER"],
    story:
      "A floor-shift conversion from the nineties sits on the original 1100 block. The dynamo gave way to an alternator; the rest of the loom is still cloth tape.",
    specs: {
      engine: "1.1 petrol, floor shift",
      power: "47 bhp",
      owners: 2,
      papers: "Clear, old book in the boot",
    },
    images: [
      shot("photo-1469285994282-454ceb49e63c"),
      shot("photo-1514316454349-750a7fd3da3a"),
    ],
    featured: false,
  },
  {
    slug: "hm-contessa-diesel-1999",
    name: "HM Contessa Diesel",
    year: 1999,
    make: "Hindustan",
    model: "Contessa Diesel",
    city: "Chandigarh",
    stateCode: "CH",
    plate: "CH 01 D 9044",
    priceLakh: 3.1,
    km: 156200,
    fuel: "Diesel",
    transmission: "Manual",
    tags: ["DIESEL", "PAPERS CLEAR"],
    story:
      "The 2.0 smokes for three seconds on a cold Chandigarh morning and then clears. Injectors were done last winter; the clutch is original and bites near the top.",
    specs: {
      engine: "2.0 Isuzu diesel",
      power: "54 bhp",
      owners: 3,
      papers: "Clear",
    },
    images: [
      shot("photo-1485291571150-772bcfc10da5"),
      shot("photo-1617531653332-bd46c24f2068"),
    ],
    featured: false,
  },
  {
    slug: "standard-herald-1972",
    name: "Standard Herald",
    year: 1972,
    make: "Standard",
    model: "Herald",
    city: "Jaipur",
    stateCode: "RJ",
    plate: "RJ 14 H 1188",
    priceLakh: 4.4,
    km: 61250,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["PAPERS CLEAR", "SINGLE OWNER"],
    story:
      "The 948 is still the factory block, and the bonnet latch is a wire hook. A Jaipur painter put blue over the green; the green shows in the door shuts.",
    specs: {
      engine: "948 cc petrol",
      power: "39 bhp",
      owners: 2,
      papers: "Clear",
    },
    images: [
      shot("photo-1533106418989-88406c7cc8ca"),
      shot("photo-1617814076367-b759c7d7e738"),
    ],
    featured: false,
  },
  {
    slug: "opel-astra-2002",
    name: "Opel Astra",
    year: 2002,
    make: "Opel",
    model: "Astra",
    city: "Mumbai",
    stateCode: "MH",
    plate: "MH 02 B 6710",
    priceLakh: 1.6,
    km: 118900,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["SINGLE OWNER", "PAPERS CLEAR"],
    story:
      "The 1.6 idles lazy from a dirty idle valve and nothing worse. The compressor still holds, and the Opel book in the glovebox has nine stamps.",
    specs: {
      engine: "1.6 8-valve petrol",
      power: "92 bhp",
      owners: 1,
      papers: "Clear, service book present",
    },
    images: [
      shot("photo-1549317661-bd32c8ce0db2"),
      shot("photo-1502877338535-766e1452684a"),
    ],
    featured: false,
  },
  {
    slug: "honda-city-vtec-2000",
    name: "Honda City VTEC",
    year: 2000,
    make: "Honda",
    model: "City VTEC",
    city: "Delhi",
    stateCode: "DL",
    plate: "DL 3C V 4402",
    priceLakh: 2.8,
    km: 141200,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["SWAPPED", "MODIFIED"],
    story:
      "The VTEC head came out of a written-off City and the loom was soldered, not plugged. It goes quiet and then pulls once the second cam is in, past 4,500.",
    specs: {
      engine: "1.5 VTEC, swapped head",
      power: "115 bhp",
      owners: 3,
      papers: "Clear, engine change endorsed",
    },
    images: [
      shot("photo-1568605117036-5fe5e7bab0b7"),
      shot("photo-1525609004556-c46c7d6cf023"),
    ],
    featured: true,
  },
  {
    slug: "mitsubishi-lancer-2004",
    name: "Mitsubishi Lancer",
    year: 2004,
    make: "Mitsubishi",
    model: "Lancer",
    city: "Pune",
    stateCode: "MH",
    plate: "MH 14 L 2290",
    priceLakh: 2.4,
    km: 129400,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["RALLY", "PAPERS CLEAR"],
    story:
      "Engine was left stock; a sump guard and gravel flaps came back from a Nashik weekend. Second-gear synchro is the only tired piece in the box.",
    specs: {
      engine: "1.5 petrol",
      power: "87 bhp",
      owners: 2,
      papers: "Clear",
    },
    images: [
      shot("photo-1603386329225-868f9b1ee6c9"),
      shot("photo-1542282088-fe8426682b8f"),
    ],
    featured: false,
  },
  {
    slug: "maruti-esteem-2003",
    name: "Maruti Esteem",
    year: 2003,
    make: "Maruti",
    model: "Esteem",
    city: "Bengaluru",
    stateCode: "KA",
    plate: "KA 05 E 8831",
    priceLakh: 1.4,
    km: 167300,
    fuel: "Petrol",
    transmission: "Manual",
    tags: ["PAPERS CLEAR", "SINGLE OWNER"],
    story:
      "The 1.3 drinks about half a litre of oil between changes, mostly on the overrun. Rear drums were skimmed in Jayanagar and it still does the airport run.",
    specs: {
      engine: "1.3 MPFI",
      power: "85 bhp",
      owners: 2,
      papers: "Clear",
    },
    images: [
      shot("photo-1563720223185-11003d516935"),
      shot("photo-1493238792000-8113da705763"),
    ],
    featured: false,
  },
];

export function getCar(slug) {
  return cars.find((car) => car.slug === slug) || null;
}

export function getFeatured() {
  return cars.filter((car) => car.featured).slice(0, 6);
}

export function relatedCars(slug, count = 3) {
  const current = getCar(slug);
  const picked = [];
  const usedCities = new Set(current ? [current.city] : []);
  for (const car of cars) {
    if (car.slug === slug || usedCities.has(car.city)) continue;
    picked.push(car);
    usedCities.add(car.city);
    if (picked.length === count) break;
  }
  return picked;
}

export function allTags() {
  return [...new Set(cars.flatMap((car) => car.tags))];
}
