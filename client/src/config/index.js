export const registerFormControls = [
  {
    name: "userName",
    label: "User Name",
    placeholder: "Enter your user name",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    label: "Image Url",
    name: "image",
    componentType: "input",
    type: "text",
    placeholder: "Enter product image URL",
  },
  {
    label: "Title",
    name: "title",
    componentType: "input",
    type: "text",
    placeholder: "Enter product title",
  },
  {
    label: "Description",
    name: "description",
    componentType: "textarea",
    placeholder: "Enter product description",
  },
  {
    label: "Category",
    name: "category",
    componentType: "select",
    options: [
      { id: 'plumbing', label: 'Plumbing' },
      { id: 'electrical', label: 'Electrical' },
      { id: 'carpentry', label: 'Carpentry' },
      { id: 'tutoring', label: 'Tutoring' },
      { id: 'cleaning', label: 'Cleaning' },
      { id: 'applianceRepair', label: 'Appliance Repair' },
      { id: 'beautyWellness', label: 'Beauty and Wellness' },
      { id: 'pestControl', label: 'Pest Control' },
    ],
  },
  {
    label: "Brand",
    name: "brand",
    componentType: "select",
    options: [
     { id : "kolkata" , label: "Kolkata" },
     { id : "delhi" , label: "Delhi" },
      { id : "mumbai" , label: "Mumbai" },
      { id : "chennai" , label: "Chennai" },
      { id : "bangalore" , label: "Bangalore" },
    ],
  },
  {
    label: "Price",
    name: "price",
    componentType: "input",
    type: "number",
    placeholder: "Enter product price",
  },
  {
    label: "Sale Price",
    name: "salePrice",
    componentType: "input",
    type: "number",
    placeholder: "Enter sale price (optional)",
  },
  {
    label: "Total Stock",
    name: "totalStock",
    componentType: "input",
    type: "number",
    placeholder: "Enter total stock",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "products",
    label: " All Services",
    path: "/shop/listing",
  }, 
  {id : 'plumbing', label: 'Plumbing', path: '/shop/listing'},
  {id : 'electrical', label: 'Electrical', path: '/shop/listing'},
  {id : 'carpentry', label: 'Carpentry', path: '/shop/listing'},
  {id : 'tutoring', label: 'Tutoring', path: '/shop/listing'},
  {id : 'cleaning', label: 'Cleaning', path: '/shop/listing'},
  {id : 'applianceRepair', label: 'Appliance Repair', path: '/shop/listing'},
  {id : 'beautyWellness', label: 'Beauty and Wellness', path: '/shop/listing'},
  {id : 'pestControl', label: 'Pest Control', path: '/shop/listing'},
  {
    id: "search",
    label: "Search",
    path: "/shop/search",
  },
];

export const categoryOptionsMap = {
  plumbing: 'Plumbing',
  electrical: 'Electrical',
  carpentry: 'Carpentry',
  tutoring: 'Tutoring',
  cleaning: 'Cleaning',
  applianceRepair: 'Appliance Repair',
  beautyWellness: 'Beauty and Wellness',
  pestControl: 'Pest Control',
};

export const brandOptionsMap = {
  
  kolkata: "Kolkata",
  delhi: "Delhi",
  mumbai: "Mumbai",
  chennai: "Chennai",
  bangalore: "Bangalore",
};

export const filterOptions = {
  category: [
    {id : 'plumbing', label: 'Plumbing'},
    {id: 'electrical', label: 'Electrical'},
    {id: 'carpentry', label: 'Carpentry'},
    {id: 'tutoring', label: 'Tutoring'},
    {id: 'cleaning', label: 'Cleaning'},
    {id: 'applianceRepair', label: 'Appliance Repair'},
    {id: 'beautyWellness', label: 'Beauty and Wellness'},
    {id: 'pestControl', label: 'Pest Control'},

  ],
  brand: [
    { id: "kolkata", label: "Kolkata" },
    { id: "delhi", label: "Delhi" },
    { id: "mumbai", label: "Mumbai" },
    { id: "chennai", label: "Chennai" },
    { id: "bangalore", label: "Bangalore" },
  ],
};

export const sortOptions = [
  { id: "price-lowtohigh", label: "Price: Low to High" },
  { id: "price-hightolow", label: "Price: High to Low" },
  { id: "title-atoz", label: "Title: A to Z" },
  { id: "title-ztoa", label: "Title: Z to A" },
];

export const addressFormControls = [
  {
    label: "Address",
    name: "address",
    componentType: "input",
    type: "text",
    placeholder: "Enter your address",
  },
  {
    label: "City",
    name: "city",
    componentType: "input",
    type: "text",
    placeholder: "Enter your city",
  },
  {
    label: "Pincode",
    name: "pincode",
    componentType: "input",
    type: "text",
    placeholder: "Enter your pincode",
  },
  {
    label: "Phone",
    name: "phone",
    componentType: "input",
    type: "text",
    placeholder: "Enter your phone number",
  },
  {
    label: "Notes",
    name: "notes",
    componentType: "textarea",
    placeholder: "Enter any additional notes",
  },
];
