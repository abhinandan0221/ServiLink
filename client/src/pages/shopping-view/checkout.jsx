import Address from "@/components/shopping-view/address";
import img from "../../assets/servilink.png";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { deleteCartItem } from "@/store/shop/cart-slice";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { createNewOrder } from "@/store/shop/order-slice";
import { Navigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { fetchProductDetails } from "@/store/shop/products-slice"; // Import the thunk
import { useEffect } from "react";
function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false); // To track order placement
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Calculate the total cart amount
  const totalCartAmount =
    cartItems && cartItems.items && cartItems.items.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) *
              currentItem?.quantity,
          0
        )
      : 0;

  // Function to handle order placement
  function handlePlaceOrder() {
    if (!cartItems.items || cartItems.items.length === 0) {
      toast({
        title: "Your cart is empty. Please add services to proceed",
        variant: "destructive",
      });
      return;
    }

    if (currentSelectedAddress === null) {
      toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
      return;
    }

    // Fetch product details for all items in the cart
    const fetchAllProductDetails = async () => {
      const productDetailsArray = await Promise.all(
        cartItems.items.map(async (item) => {
          const result = await dispatch(fetchProductDetails(item.productId));
          return result.payload.data; // Assuming the API response contains product details in `data`
        })
      );

      //console.log("Fetched Product Details:", productDetailsArray);

      const productBrands = productDetailsArray.map((product) => product.brand);
      const city = currentSelectedAddress?.city; // Get the selected address city
      // Check if all products belong to the same brand
      const uniqueBrands = [...new Set(productBrands)];
      console.log("Unique Brands:", uniqueBrands);
      console.log("Selected City:", city);
      if (uniqueBrands.length > 1 || uniqueBrands[0].toLowerCase() != city.toLowerCase()) {
        toast({
          title: "Some services in the cart not belong to your city.",
          variant: "destructive",
        });
        return;
      }

      // Proceed with order placement logic here...
      // Prepare the order data
      const orderData = {
        userId: user?.id,
        cartId: cartItems?._id,
        cartItems: cartItems.items.map((singleCartItem) => ({
          productId: singleCartItem?.productId,
          title: singleCartItem?.title,
          image: singleCartItem?.image,
          price:
            singleCartItem?.salePrice > 0
              ? singleCartItem?.salePrice
              : singleCartItem?.price,
          quantity: singleCartItem?.quantity,
        })),
        addressInfo: {
          addressId: currentSelectedAddress?._id,
          address: currentSelectedAddress?.address,
          city: currentSelectedAddress?.city,
          pincode: currentSelectedAddress?.pincode,
          phone: currentSelectedAddress?.phone,
          notes: currentSelectedAddress?.notes,
        },
        orderStatus: "pending", // Default status
        totalAmount: totalCartAmount,
        orderDate: new Date(),
        orderUpdateDate: new Date(),
      };

      // Dispatch the action to create the order
      dispatch(createNewOrder(orderData)).then((data) => {
        if (data?.payload?.success) {
          toast({
            title: "Order Placed Successfully!",
            description: "Your order has been successfully placed.",
            variant: "success",
          });
          setIsOrderPlaced(true); // Mark order as placed
        } else {
          toast({
            title: "Failed to Place Order",
            description: "There was an issue placing your order. Please try again.",
            variant: "destructive",
          });
        }
      });
    };

    fetchAllProductDetails();
  }

  // Redirect to confirmation page after successful order placement
  if (isOrderPlaced) {
    for (let i = 0; i < cartItems.items.length; i++) {
      dispatch(deleteCartItem({ userId: user?.id, productId: cartItems?.items[i]?.productId })); // Clear the cart after order placement
    }
    return <Navigate to="/shop/account" />;
  }

  return (
    <div className="flex flex-col">
      {/* Header Image */}
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        {/* Address Selection */}
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />

        {/* Cart Items and Checkout */}
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent key={item.productId} cartItem={item} />
              ))
            : null}

          {/* Total Amount */}
          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>

          {/* Place Order Button */}
          <div className="mt-4 w-full">
            <Button onClick={handlePlaceOrder} className="w-full">
              Place Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;