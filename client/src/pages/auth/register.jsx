import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { registerFormControls } from "@/config";
import { registerUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login");
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  //console.log(formData);



  return (
    <div className="mx-auto w-full bg-green-100 max-w-md space-y-8">
      {/* Header Section */}
      <div className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Create New Account
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="font-medium text-green-600 hover:text-green-500 transition-colors duration-200"
          >
            Login here
          </Link>
        </p>
      </div>
  
      {/* Form Section */}
      <div className="bg-green-200 shadow-lg rounded-lg p-8">
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
}

export default AuthRegister;
