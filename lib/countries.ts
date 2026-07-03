export type Region = {
  name: string;
  countries: string[];
};

export const regions: Region[] = [
  {
    name: "Africa",
    countries: [
      "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
      "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros",
      "Congo", "DR Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea",
      "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
      "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya",
      "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco",
      "Mozambique", "Namibia", "Niger", "Nigeria", "Rwanda", "São Tomé and Príncipe",
      "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa",
      "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda",
      "Zambia", "Zimbabwe",
    ],
  },
  {
    name: "Asia",
    countries: [
      "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan",
      "Brunei", "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia",
      "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos",
      "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal",
      "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar",
      "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria",
      "Taiwan", "Tajikistan", "Thailand", "Timor-Leste", "Turkey",
      "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen",
    ],
  },
  {
    name: "Europe",
    countries: [
      "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia and Herzegovina",
      "Bulgaria", "Croatia", "Czech Republic", "Denmark", "Estonia", "Finland",
      "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy",
      "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta",
      "Moldova", "Monaco", "Montenegro", "Netherlands", "North Macedonia",
      "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino",
      "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland",
      "Ukraine", "United Kingdom", "Vatican City",
    ],
  },
  {
    name: "North America",
    countries: [
      "Antigua and Barbuda", "Bahamas", "Barbados", "Belize", "Canada",
      "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "El Salvador",
      "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico",
      "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia",
      "Saint Vincent and the Grenadines", "Trinidad and Tobago",
      "United States of America",
    ],
  },
  {
    name: "South America",
    countries: [
      "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador",
      "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela",
    ],
  },
  {
    name: "Oceania",
    countries: [
      "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia",
      "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa",
      "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu",
    ],
  },
  {
    name: "Middle East",
    countries: [
      "Bahrain", "Iran", "Iraq", "Israel", "Jordan", "Kuwait", "Lebanon",
      "Oman", "Palestine", "Qatar", "Saudi Arabia", "Syria",
      "United Arab Emirates", "Yemen",
    ],
  },
];
