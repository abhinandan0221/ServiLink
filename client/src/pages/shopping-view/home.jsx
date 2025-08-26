import { Button } from "@/components/ui/button";
import servilink from "../../assets/servilink.webp"
import {
  BookType,
  BookOpenText,
  Airplay,
  BabyIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloudLightning,
  Heater,
  Images,
  Shirt,
  ShirtIcon,
  ShoppingBasket,
  UmbrellaIcon,
  WashingMachine,
  WatchIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/products-slice";
import ShoppingProductTile from "@/components/shopping-view/product-tile";
import { useNavigate } from "react-router-dom";
import { addToCart, fetchCartItems } from "@/store/shop/cart-slice";
import { useToast } from "@/components/ui/use-toast";
import ProductDetailsDialog from "@/components/shopping-view/product-details";
import { getFeatureImages } from "@/store/common-slice";

const categoriesWithIcon = [
  {
    id: 'plumbing',
    label: 'Plumbing',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/5234/5234176.png', // wrench and pipes
  },
  
  {
    id: 'electrical',
    label: 'Electrical',
    imageUrl: 'https://cdn1.iconfinder.com/data/icons/provincial-electricity-authority-2/64/pole_electric_pole_pole_dance_electronics_electricity-1024.png', // electric plug
  },
  {
    id: 'tutoring',
    label: 'Tutoring',
    imageUrl: 'https://cdn0.iconfinder.com/data/icons/tutor-icon-set/512/teacher_writing_on_board-1024.png', // open book
  },
  {
    id: 'cleaning',
    label: 'Cleaning',
    imageUrl: 'https://cdn4.iconfinder.com/data/icons/stop-virus-outline-iconset/128/ic_clean_floor-1024.png', // mop and bucket
  },
  {
    id: 'applianceRepair',
    label: 'ApplianceRepair',
    imageUrl: 'https://cdn-icons-png.flaticon.com/512/1044/1044945.png', // screwdriver & gear
  },
  {
    id: 'beautyWellness',
    label: 'BeautyandWellness',
    imageUrl: 'https://icons.iconarchive.com/icons/elegantthemes/beautiful-flat/128/Flower-icon.png', // spa lotus symbol
  },
  {
    id: 'pestControl',
    label: 'Pest Control',
    imageUrl: 'https://cdn0.iconfinder.com/data/icons/future-farming-glyph-1/96/eliminating-enemie-drone-pest-weed-survey-1024.png', // insect with prohibition sign
  },
  {
    id: 'carpentry',
    label: 'Carpentry',
    imageUrl: 'https://cdn4.iconfinder.com/data/icons/build-a-house-filled-outline/512/wood_saw_hand_work_tool_equipment_carpenter-1024.png', // hammer and wood tools
  }
];


const brandsWithIcon = [
  { id : "kolkata" , label: "Kolkata", icon: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Howrah_bridge_at_night.jpg" },
  { id: "delhi", label: "Delhi", icon: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Delhi.jpg" },
  { id: "mumbai", label: "Mumbai", icon: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Mumbai_03-2016_30_Gateway_of_India.jpg" },
  { id: "chennai", label: "Chennai", icon: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Kapaleeswarar_Temple%2C_Mylapore%2C_Chennai.jpg/800px-Kapaleeswarar_Temple%2C_Mylapore%2C_Chennai.jpg" },
  { id: "bangalore", label: "Bangalore", icon: "https://upload.wikimedia.org/wikipedia/commons/2/21/UB_CITY_Skyline.jpg" },
];
function ShoppingHome() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProducts
  );
  const { featureImageList } = useSelector((state) => state.commonFeature);

  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleNavigateToListingPage(getCurrentItem, section) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };

    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: user?.id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(user?.id));
        toast({
          title: "Product is added to cart",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) setOpenDetailsDialog(true);
  }, [productDetails]);

  useEffect(() => {
    // const timer = setInterval(() => {
    //   setCurrentSlide((prevSlide) => (prevSlide + 1) % featureImageList.length);
    // }, 1500);

    // return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    dispatch(
      fetchAllFilteredProducts({
        filterParams: {},
        sortParams: "price-lowtohigh",
      })
    );
  }, [dispatch]);

  console.log(productList, "productList");

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen bg-green-100">
      <div className="relative w-full h-[400px] overflow-hidden">
        {[servilink].map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${index === currentSlide ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) =>
                (prevSlide - 1 + featureImageList.length) %
                featureImageList.length
            )
          }
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() =>
            setCurrentSlide(
              (prevSlide) => (prevSlide + 1) % featureImageList.length
            )
          }
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronRightIcon className="w-4 h-4" />
        </Button>
      </div>
      <section className="py-12 bg-transparent">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Service by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcon.map((categoryItem) => (
              <Card
                onClick={() =>
                  handleNavigateToListingPage(categoryItem, "category")
                }
                className="cursor-pointer hover:shadow-lg transition-shadow"
                key={categoryItem.id}
              >
                <CardContent
                  className="flex flex-col items-center justify-center p-6"
                  style={{ transform: "scale(1.2)" }}
                >
                  <img
                    src={categoryItem.imageUrl}
                    alt={categoryItem.label}
                    className="w-16 h-16 mb-4 object-contain"
                    style={{ width: "80px", height: "80px" }}
                  />
                  <span className="font-bold">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Service by City</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandsWithIcon.map((brandItem) => (
              <Card
                onClick={() => handleNavigateToListingPage(brandItem, "brand")}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent
                  className="flex flex-col items-center justify-center p-6"
                  style={{ transform: "scale(1.2)" }}
                >
                  <img
                    src={brandItem.icon}
                    alt={brandItem.label}
                    className="w-24 h-24 mb-4 object-contain"
                    style={{ width: "100px", height: "100px" }}
                  />
                  <span className="font-bold">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Feature Products
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                <ShoppingProductTile
                  handleGetProductDetails={handleGetProductDetails}
                  product={productItem}
                  handleAddtoCart={handleAddtoCart}
                  style={{ transform: "scale(1.1)" }}
                />
              ))
              : null}
          </div>
        </div>
      </section>
      <ProductDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetails}
      />
    </div>
  );
}

export default ShoppingHome;
