import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  MapPin,
  Calendar,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { TopBar, Header, Footer } from "../components/layout";
import { Button, Card, Input, Select, Checkbox } from "../components/ui";
import { supabase } from "../supabaseClient";
import { ORGANIZATION_ID } from "../config";
import { cn } from "../utils/cn";

const SchedulePickup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedItems = [] } = location.state || {};

  const [selectedDateRange, setSelectedDateRange] =
    useState("1st Apr - 4th Apr");
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [helperCharges, setHelperCharges] = useState(false);
  const [donorLocation, setDonorLocation] = useState({
    address:
      "Haribhakti Wadi, Lakkadpitha Road, Dandia Bazar, Vadodara, Gujarat, India",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Date range options
  const dateRanges = [
    "1st Apr - 4th Apr",
    "5th Apr - 8th Apr",
    "9th Apr - 12th Apr",
    "13th Apr - 16th Apr",
  ];

  // Calendar functions
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    // Adjust starting day: Monday = 0, Sunday = 6
    let startingDayOfWeek = firstDay.getDay() - 1;
    if (startingDayOfWeek < 0) startingDayOfWeek = 6; // Sunday becomes 6

    const days = [];
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }
    return days;
  };

  const formatMonthYear = (date) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleDateClick = (date) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const isSameDay = (date1, date2) => {
    if (!date1 || !date2) return false;
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  };

  const onSubmit = async (data) => {
    try {
      const donationData = {
        organization_id: ORGANIZATION_ID,
        first_name: data.first_name,
        last_name: data.last_name || "",
        email: data.email,
        phone: data.phone,
        address_line: data.address_line,
        flat_house_no: data.flat_house_no,
        floor_number: data.floor_number,
        city: data.city,
        state: data.state,
        pincode: data.pincode,
        pickup_date: selectedDate
          ? selectedDate.toISOString().split("T")[0]
          : null,
        items: selectedItems,
        helpers_needed: helperCharges ? 1 : 0,
      };

      const { data: responseData, error } = await supabase.functions.invoke(
        "submit-donation",
        {
          body: donationData,
        }
      );

      if (error) throw error;
      if (responseData && responseData.error)
        throw new Error(responseData.error);

      alert("Order placed successfully! We will contact you shortly.");
      navigate("/");
    } catch (err) {
      console.error("Submission error:", err);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f4f4]">
      <TopBar />
      <Header />

      <main className="max-w-[1440px] mx-auto px-5 py-10 pb-15">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-black text-center mb-8 uppercase tracking-wide">
          Schedule a Pickup
        </h1>

        {/* Note Section */}
        <Card variant="default" padding="medium" className="bg-[#f0ecd6] border border-[#e4e7eb] mb-10 max-w-[1000px] mx-auto">
          <div className="flex gap-4 items-start">
            <div className="flex-shrink-0 w-[29px] h-[29px] bg-accent rounded-full flex items-center justify-center text-white">
              <AlertCircle size={18} />
            </div>
            <div className="flex-1">
              <strong className="text-accent text-lg font-semibold mr-1">Note:</strong>
              <p className="text-[#334147] text-sm leading-[18px] tracking-[0.7px] mt-1">
                We, at Happieesouls, support small grassroots NGOs with your
                donations. Our third party logistics partners do not carry any
                carton boxes. You can pack your donations in any carton boxes or
                blue disposable bags or any shopping bags. Please refer to
                images packing done by our donors.
              </p>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_413px] gap-8 max-w-[1200px] mx-auto">
          {/* Left Column - Donor Details */}
          <div className="flex flex-col gap-5">
            {/* Donor Location */}
            <Card variant="default" padding="medium" className="bg-white rounded-[14px]">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-sm font-medium text-heading m-0">Donor Location:</h3>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => {
                    console.log("Change location clicked");
                  }}
                  className="flex items-center gap-1 border border-accent text-accent px-5 py-2 rounded-[5px] text-xs font-medium"
                >
                  <MapPin size={16} />
                  Change location
                </Button>
              </div>
              <p className="text-xs text-[#535456] leading-5 m-0">{donorLocation.address}</p>
            </Card>

            {/* Donor Details Form */}
            <Card variant="default" padding="large" className="bg-white rounded-[15px]">
              <h2 className="text-xl font-semibold text-[#272727] mb-4 m-0">Donor Detail</h2>
              <div className="h-px bg-[#e4e7eb] mb-6"></div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
                id="donor-form"
              >
                <div className="flex gap-4">
                  <Input
                    label="First Name*"
                    type="text"
                    fullWidth
                    {...register("first_name", {
                      required: "First name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters",
                      },
                    })}
                    error={errors.first_name?.message}
                  />
                </div>

                <div className="flex gap-4">
                  <Input
                    label="Last Name*"
                    type="text"
                    fullWidth
                    {...register("last_name", {
                      required: "Last name is required",
                    })}
                    error={errors.last_name?.message}
                  />
                </div>

                <div className="flex gap-4">
                  <Input
                    label="Personal Email*"
                    type="email"
                    fullWidth
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    error={errors.email?.message}
                  />
                </div>

                <div className="flex gap-4">
                  <Input
                    label="Mobile Number*"
                    type="tel"
                    fullWidth
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Phone number must be 10 digits",
                      },
                    })}
                    error={errors.phone?.message}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Flat/House No./Building*"
                    type="text"
                    fullWidth
                    {...register("flat_house_no", {
                      required: "Flat/House number is required",
                    })}
                    error={errors.flat_house_no?.message}
                  />
                  <Input
                    label="Floor Number"
                    type="text"
                    fullWidth
                    {...register("floor_number")}
                    error={errors.floor_number?.message}
                  />
                </div>

                <div className="flex gap-4">
                  <Input
                    label="Address"
                    type="text"
                    fullWidth
                    {...register("address_line")}
                    error={errors.address_line?.message}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Pin Code*"
                    type="text"
                    fullWidth
                    {...register("pincode", {
                      required: "Pincode is required",
                      pattern: {
                        value: /^[0-9]{6}$/,
                        message: "Pincode must be 6 digits",
                      },
                    })}
                    error={errors.pincode?.message}
                  />
                  <Input
                    label="City*"
                    type="text"
                    fullWidth
                    {...register("city", {
                      required: "City is required",
                    })}
                    error={errors.city?.message}
                  />
                </div>

                <div className="flex gap-4">
                  <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium text-[#545759] mb-1">
                      Select Region, State or Province*
                    </label>
                    <Select
                      fullWidth
                      {...register("state", {
                        required: "State is required",
                      })}
                      options={[
                        { value: "", label: "Select State" },
                        { value: "gujarat", label: "Gujarat" },
                        { value: "maharashtra", label: "Maharashtra" },
                        { value: "karnataka", label: "Karnataka" },
                        { value: "delhi", label: "Delhi" },
                      ]}
                    />
                    {errors.state && (
                      <span className="text-xs text-red-500 mt-1">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                </div>
              </form>
            </Card>

            {/* Pickup Date Selection */}
            <Card variant="default" padding="large" className="bg-white rounded-[15px]">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-[#272727] m-0">Choose a pickup date</h2>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="flex items-center gap-2.5 border border-accent text-accent px-3.5 py-2.5 rounded-[5px] text-xs font-medium"
                >
                  <Calendar size={16} />
                  Calendar
                </Button>
              </div>
              <div className="h-px bg-[#e4e7eb] mb-6"></div>

              <div className="grid grid-cols-2 gap-4 mb-5">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={cn(
                      "px-5 py-3 rounded-[20px] text-sm transition-all",
                      selectedDateRange === range
                        ? "bg-accent text-white border border-accent"
                        : "border border-[#aaa] bg-white text-[#282828] hover:border-accent"
                    )}
                    onClick={() => setSelectedDateRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>

              {showCalendar && (
                <div className="mt-5 border border-accent rounded-[9px] p-5 bg-white">
                  <div className="flex justify-between items-center mb-5">
                    <button
                      type="button"
                      className="bg-none border-none text-accent cursor-pointer p-1.5 flex items-center justify-center hover:opacity-70"
                      onClick={handlePrevMonth}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <h3 className="text-xl font-bold text-black m-0">
                      {formatMonthYear(currentMonth)}
                    </h3>
                    <button
                      type="button"
                      className="bg-none border-none text-accent cursor-pointer p-1.5 flex items-center justify-center hover:opacity-70"
                      onClick={handleNextMonth}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="flex flex-col gap-2.5">
                    <div className="grid grid-cols-7 gap-1.5 mb-2.5">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <div key={day} className="text-center text-xs text-[rgba(60,60,67,0.6)] font-normal">
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="grid grid-cols-7 gap-1.5">
                      {getDaysInMonth(currentMonth).map((date, index) => (
                        <button
                          key={index}
                          type="button"
                          className={cn(
                            "w-[51px] h-[42px] border-none bg-none text-base text-black cursor-pointer rounded transition-all",
                            !date && "cursor-default",
                            date && isSameDay(date, selectedDate) &&
                              "bg-accent text-white font-medium"
                          )}
                          onClick={() => handleDateClick(date)}
                          disabled={!date}
                        >
                          {date ? date.getDate() : ""}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column - Donation Items & Order */}
          <div className="flex flex-col">
            <Card variant="default" padding="large" className="bg-white rounded-[15px] lg:sticky lg:top-24 h-fit">
              <h2 className="text-xl font-semibold text-[#272727] mb-4 m-0">Donation item</h2>
              <div className="h-px bg-[#e4e7eb] mb-5"></div>

              <div className="flex flex-col gap-2.5 mb-5">
                {selectedItems.length > 0 ? (
                  selectedItems.map((item, index) => (
                    <p key={index} className="text-base text-[#353945] m-0 leading-10">
                      {item}
                    </p>
                  ))
                ) : (
                  <>
                    <p className="text-base text-[#353945] m-0 leading-10">Gas Stove</p>
                    <p className="text-base text-[#353945] m-0 leading-10">Washing Machine</p>
                    <p className="text-base text-[#353945] m-0 leading-10">Water Purifier</p>
                    <p className="text-base text-[#353945] m-0 leading-10">Table Fan</p>
                    <p className="text-base text-[#353945] m-0 leading-10">Almirah</p>
                    <p className="text-base text-[#353945] m-0 leading-10">Center Table</p>
                    <p className="text-base text-[#353945] m-0 leading-10">Single Or Double Cot</p>
                    <p className="text-base text-[#353945] m-0 leading-10">Basketball/Football/ Bat</p>
                  </>
                )}
              </div>

              <div className="h-px bg-[#e4e7eb] mb-5"></div>

              <div className="mb-5">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-base font-semibold text-[#3c3d47]">Helper Chargers</span>
                  <span className="text-base font-bold text-[#3c3d47]">₹150</span>
                </div>
                <Checkbox
                  checked={helperCharges}
                  onChange={(e) => setHelperCharges(e.target.checked)}
                  label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dolor justo, pretium eu sapien nec, rhoncus luctus orci. Nulla et congue lectus."
                />
              </div>

              <div className="h-px bg-[#e4e7eb] mb-5"></div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  fullWidth
                >
                  Place Order
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SchedulePickup;
