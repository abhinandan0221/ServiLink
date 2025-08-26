import { useSelector } from "react-redux";
import { Badge } from "../ui/badge";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";  // Assuming Button component is available
import { jsPDF } from "jspdf";
import servilinkLogo from "../../assets/servilink.png"; // Import logo for PDF

function ShoppingOrderDetailsView({ orderDetails }) {
  const { user } = useSelector((state) => state.auth);

  // Function to generate and download PDF
  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Set background color (light green)
    doc.setFillColor(210, 255, 210); // Light green color
    doc.rect(0, 0, 210, 297, 'F'); // Full page fill
  
    // Add logo
    doc.addImage(servilinkLogo, 'PNG', 10, 10, 50, 50);
  
    // Title and header styling
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.setTextColor(34, 139, 34); // Dark green for the title
    doc.text("Order Invoice", 105, 30, { align: 'center' });
  
    // Add order details
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // Default black text for the details
    let yPosition = 60;
  
    // Order Details Section
    doc.setFont("helvetica", "bold");
    doc.text("Order Details", 10, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 10;
    doc.text(`Order ID: ${orderDetails?._id}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Order Date: ${orderDetails?.orderDate.split("T")[0]}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Order Price: $${orderDetails?.totalAmount}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Payment Method: ${orderDetails?.paymentMethod}`, 10, yPosition);
    yPosition += 10;
    doc.text(`Payment Status: ${orderDetails?.paymentStatus}`, 10, yPosition);
    yPosition += 20;
  
    // Order Items Section
    doc.setFont("helvetica", "bold");
    doc.text("Order Items", 10, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 10;
  
    // Table Header
    doc.setFillColor(34, 139, 34); // Dark green for table header
    doc.rect(10, yPosition, 190, 10, 'F');
    doc.setTextColor(255, 255, 255); // White text for table header
    doc.text("Item", 15, yPosition + 7);
    doc.text("Quantity", 100, yPosition + 7, { align: 'center' });
    doc.text("Price", 150, yPosition + 7, { align: 'right' });
    doc.setTextColor(0, 0, 0); // Reset text color
    yPosition += 10;
  
    // Table Rows
    orderDetails?.cartItems.forEach((item) => {
      doc.rect(10, yPosition, 190, 10); // Draw table row border
      doc.text(item.title, 15, yPosition + 7);
      doc.text(`${item.quantity}`, 100, yPosition + 7, { align: 'center' });
      doc.text(`$${item.price}`, 150, yPosition + 7, { align: 'right' });
      yPosition += 10;
    });
  
    yPosition += 10;
  
    // Shipping Info Section
    doc.setFont("helvetica", "bold");
    doc.text("Shipping Information", 10, yPosition);
    doc.setFont("helvetica", "normal");
    yPosition += 10;
    doc.text(`${user.userName}`, 10, yPosition);
    yPosition += 10;
    doc.text(`${orderDetails?.addressInfo?.address}`, 10, yPosition);
    yPosition += 10;
    doc.text(`${orderDetails?.addressInfo?.city}`, 10, yPosition);
    yPosition += 10;
    doc.text(`${orderDetails?.addressInfo?.pincode}`, 10, yPosition);
    yPosition += 10;
    doc.text(`${orderDetails?.addressInfo?.phone}`, 10, yPosition);
    yPosition += 10;
    doc.text(`${orderDetails?.addressInfo?.notes || "No notes provided"}`, 10, yPosition);
  
    // Save PDF
    doc.save(`${orderDetails?._id}_invoice.pdf`);
  };

  return (
    <DialogContent className="sm:max-w-[800px] overflow-auto max-h-[80vh]">
      <div className="grid gap-6 p-4 bg-white rounded-lg shadow-lg">
        <div className="grid gap-2">
          <div className="flex mt-6 items-center justify-between">
            <p className="font-medium text-xl">Order ID</p>
            <Label className="text-gray-700 font-semibold">{orderDetails?._id}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-xl">Order Date</p>
            <Label className="text-gray-700">{orderDetails?.orderDate.split("T")[0]}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-xl">Order Price</p>
            <Label className="text-gray-700">${orderDetails?.totalAmount}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-xl">Payment Method</p>
            <Label className="text-gray-700">{orderDetails?.paymentMethod}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-xl">Payment Status</p>
            <Label className="text-gray-700">{orderDetails?.paymentStatus}</Label>
          </div>
          <div className="flex mt-2 items-center justify-between">
            <p className="font-medium text-xl">Order Status</p>
            <Label>
              <Badge
                className={`py-1 px-3 ${
                  orderDetails?.orderStatus === "confirmed"
                    ? "bg-green-500"
                    : orderDetails?.orderStatus === "rejected"
                    ? "bg-red-600"
                    : "bg-black"
                }`}
              >
                {orderDetails?.orderStatus}
              </Badge>
            </Label>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-xl">Order Details</div>
            <ul className="grid gap-3">
              {orderDetails?.cartItems && orderDetails?.cartItems.length > 0
                ? orderDetails?.cartItems.map((item) => (
                    <li key={item.id} className="flex items-center justify-between text-gray-700">
                      <span>{item.title}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>${item.price}</span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="font-medium text-xl">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span className="text-gray-700">{user.userName}</span>
              <span className="text-gray-700">{orderDetails?.addressInfo?.address}</span>
              <span className="text-gray-700">{orderDetails?.addressInfo?.city}</span>
              <span className="text-gray-700">{orderDetails?.addressInfo?.pincode}</span>
              <span className="text-gray-700">{orderDetails?.addressInfo?.phone}</span>
              <span className="text-gray-700">{orderDetails?.addressInfo?.notes}</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <Button onClick={generatePDF} className="w-full bg-blue-500 text-white hover:bg-blue-600">
            Generate PDF
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetailsView;
