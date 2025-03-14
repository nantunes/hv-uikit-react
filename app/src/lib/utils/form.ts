export interface FormData {
  asset: string;
  location: string;
  project: string;
  version?: string;
  name: string;
  description: string;
  date?: string;
  time?: string;
  public: boolean;
  release?: string;
  tags?: string;
}

export type FormDataKey = keyof FormData;

interface Field {
  id: FormDataKey;
  label: string;
  placeholder?: string;
  required?: string;
}

export const fields: Record<FormDataKey, Field> = {
  asset: {
    id: "asset",
    label: "Asset",
    placeholder: "Insert asset name",
    required: "Asset is required",
  },
  location: {
    id: "location",
    label: "Location",
    placeholder: "Insert country",
    required: "Location is required",
  },
  project: {
    id: "project",
    label: "Project",
    placeholder: "Insert project name",
    required: "Project is required",
  },
  version: {
    id: "version",
    label: "Version",
    placeholder: "Insert version number",
    required: "Version is required",
  },
  tags: {
    id: "tags",
    label: "Tags",
    placeholder: "Insert project tags",
    required: "Tags is required",
  },
  release: {
    id: "release",
    label: "Release",
    placeholder: "Insert release version",
    required: "Release is required",
  },
  name: {
    id: "name",
    label: "Name",
    placeholder: "Insert name",
    required: "Name is required",
  },
  description: {
    id: "description",
    label: "Description",
    placeholder: "Insert description",
    required: "Description is required",
  },
  date: {
    id: "date",
    label: "date",
    placeholder: "Insert date",
  },
  time: {
    id: "time",
    label: "time",
    placeholder: "Insert time",
  },
  public: {
    id: "public",
    label: "public",
  },
};

export const continents = [
  "Africa",
  "Asia",
  "Oceania",
  "Europe",
  "North America",
  "South America",
];

export const countries = [
  /* Africa */
  [
    "Algeria",
    "Angola",
    "Benin",
    "Botswana",
    "Burkina",
    "Burundi",
    "Cameroon",
    "Cape Verde",
    "Central African Republic",
    "Chad",
    "Chana",
    "Comoros Island",
    "Congo",
    "Congo (Zaire)",
    "Cote D'Ivoire",
    "Djibouti",
    "Egypt",
    "Equatorial Guinea",
    "Eritrea",
    "Ethiopia",
    "Gabon",
    "Guinea",
    "Guinea Bissau",
    "Kenya",
    "Lesotho",
    "Liberia",
    "Libya",
    "Madagascar",
    "Malawi",
    "Mali",
    "Mauritania",
    "Mauritius",
    "Morocco",
    "Mozambique",
    "Namibia",
    "Niger",
    "Nigeria",
    "Rwanda",
    "Sao Tome and Principe",
    "Senegal",
    "Seychelles",
    "Sierra Leone",
    "Somalia",
    "Republic of South Africa",
    "Sudan",
    "Swaziland",
    "Tanzania",
    "Tunisia",
    "Togo",
    "Uganda",
    "Zambia",
    "Zimbabwe",
  ],

  /* Asia */
  [
    "Afghanistan",
    "Armenia",
    "Azerbaijan",
    "Bahrain",
    "Bangladesh",
    "Bhutan",
    "Brunei",
    "Cambodia",
    "China",
    "Cyprus",
    "Georgia",
    "Iran",
    "Iraq",
    "India",
    "Indonesia",
    "Israel and Gaza",
    "Japan",
    "Jordan",
    "Kazakstan",
    "Kuwait",
    "Kyrgzstan",
    "Laos",
    "Lebanon",
    "Malaysia",
    "Mongolia",
    "Myanmar (Burma)",
    "Nepal",
    "North Korea",
    "Oman",
    "Pakistan",
    "Palau",
    "Phillipines",
    "Quatar",
    "Russian Federation",
    "Saudi Arabia",
    "South Korea",
    "Sri Lanka",
    "Syria",
    "Taiwan",
    "Tajikstan",
    "Thailand",
    "Turkey",
    "Turkmenistan",
    "United Arab Emirates",
    "Uzbekistan",
    "Vietnam",
    "Yemen",
  ],

  /* Oceania */
  [
    "Australia",
    "East Timor",
    "Fiji",
    "Kiribati",
    "Marshall Islands",
    "Micronesia, F.S.O",
    "Nauru",
    "New Zealand",
    "Papua New Guinea",
    "Solomon Islands",
    "Tonga",
    "Tuvalu",
    "Vanuatu",
    "Western Samoa",
  ],

  /* Europe */
  [
    "Albania",
    "Andorra",
    "Austria",
    "Belarus",
    "Belgium",
    "Bosnia-Herzegovina",
    "Bulgaria",
    "Croatia",
    "Czech Republic",
    "Denmark and Greenland",
    "Estonia",
    "Finland",
    "France",
    "Germany",
    "Greece",
    "Hungary",
    "Iceland",
    "Republic of Ireland",
    "Italy",
    "Latvia",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Malta",
    "Moldova",
    "Netherlands",
    "Norway",
    "Poland",
    "Portugal",
    "Romania",
    "Russian Federation",
    "Slovakia",
    "Slovenia",
    "Spain",
    "Sweden",
    "Switzerland",
    "Turkey",
    "Ukraine",
    "United Kingdom",
    "Yugoslavia",
  ],

  /* North America */
  [
    "Barbados",
    "Bahamas",
    "Belize",
    "Canada",
    "Costa Rica",
    "Cuba",
    "Dominica",
    "Dominican Republic",
    "El Salvador",
    "Greenland (Denmark)",
    "Grenada",
    "Guatemala",
    "Haiti",
    "Honduras",
    "Jamaica",
    "Mexico",
    "Pacific Islands Inc. Hawaii",
    "Panama",
    "St Kitts-Nevis",
    "St Lucia",
    "St Vincent and the Grenadines",
    "Trinidad and Tobago",
    "United States Of America",
  ],

  /* South America */
  [
    "Argentina",
    "Bolivia",
    "Brazil",
    "Chile",
    "Colombia",
    "Ecuador",
    "French Guiana",
    "Guyana",
    "Nicaragua",
    "Paraguay",
    "Peru",
    "Suriname",
    "Uruguay",
    "Venezuela",
  ],
];

export const allCountries = countries
  .reduce((acc, val) => acc.concat(val), [])
  .sort();
