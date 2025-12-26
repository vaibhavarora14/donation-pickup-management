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
import "./SchedulePickup.css";

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
    <div className="schedule-pickup-page">
      <TopBar />
      <Header />

      <main className="schedule-pickup-main">
        {/* Page Title */}
        <h1 className="schedule-pickup-title">Schedule a Pickup</h1>

        {/* Note Section */}
        <Card variant="default" padding="medium" className="note-section">
          <div className="note-content">
            <div className="note-icon-wrapper">
              <AlertCircle size={24} className="note-icon" />
            </div>
            <div className="note-text">
              <strong className="note-label">Note:</strong>
              <p>
                We, at Happieesouls, support small grassroots NGOs with your
                donations. Our third party logistics partners do not carry any
                carton boxes. You can pack your donations in any carton boxes or
                blue disposable bags or any shopping bags. Please refer to
                images packing done by our donors.
              </p>
            </div>
          </div>
        </Card>

        <div className="schedule-pickup-content">
          {/* Left Column - Donor Details */}
          <div className="donor-details-section">
            {/* Donor Location */}
            <Card variant="default" padding="medium" className="location-card">
              <div className="location-header">
                <h3 className="location-label">Donor Location:</h3>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => {
                    // Handle location change
                    console.log("Change location clicked");
                  }}
                  className="change-location-btn"
                >
                  <MapPin size={16} />
                  Change location
                </Button>
              </div>
              <p className="location-address">{donorLocation.address}</p>
            </Card>

            {/* Donor Details Form */}
            <Card variant="default" padding="large" className="donor-form-card">
              <h2 className="form-section-title">Donor Detail</h2>
              <div className="form-divider"></div>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="donor-form"
                id="donor-form"
              >
                <div className="form-row">
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

                <div className="form-row">
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

                <div className="form-row">
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

                <div className="form-row">
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

                <div className="form-row form-row-split">
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

                <div className="form-row">
                  <Input
                    label="Address"
                    type="text"
                    fullWidth
                    {...register("address_line")}
                    error={errors.address_line?.message}
                  />
                </div>

                <div className="form-row form-row-split">
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

                <div className="form-row">
                  <div className="input-group input-group-full-width">
                    <label className="input-label">
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
                      <span className="input-error-message">
                        {errors.state.message}
                      </span>
                    )}
                  </div>
                </div>
              </form>
            </Card>

            {/* Pickup Date Selection */}
            <Card
              variant="default"
              padding="large"
              className="pickup-date-card"
            >
              <div className="pickup-date-header">
                <h2 className="form-section-title">Choose a pickup date</h2>
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => setShowCalendar(!showCalendar)}
                  className="calendar-btn"
                >
                  <Calendar size={16} />
                  Calendar
                </Button>
              </div>
              <div className="form-divider"></div>

              <div className="date-ranges">
                {dateRanges.map((range) => (
                  <button
                    key={range}
                    type="button"
                    className={`date-range-btn ${
                      selectedDateRange === range ? "selected" : ""
                    }`}
                    onClick={() => setSelectedDateRange(range)}
                  >
                    {range}
                  </button>
                ))}
              </div>

              {showCalendar && (
                <div className="calendar-container">
                  <div className="calendar-header">
                    <button
                      type="button"
                      className="calendar-nav-btn"
                      onClick={handlePrevMonth}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <h3 className="calendar-month">
                      {formatMonthYear(currentMonth)}
                    </h3>
                    <button
                      type="button"
                      className="calendar-nav-btn"
                      onClick={handleNextMonth}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                  <div className="calendar-grid">
                    <div className="calendar-weekdays">
                      {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                        (day) => (
                          <div key={day} className="calendar-weekday">
                            {day}
                          </div>
                        )
                      )}
                    </div>
                    <div className="calendar-days">
                      {getDaysInMonth(currentMonth).map((date, index) => (
                        <button
                          key={index}
                          type="button"
                          className={`calendar-day ${
                            !date ? "calendar-day-empty" : ""
                          } ${
                            date && isSameDay(date, selectedDate)
                              ? "calendar-day-selected"
                              : ""
                          }`}
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
          <div className="donation-items-section">
            <Card
              variant="default"
              padding="large"
              className="donation-items-card"
            >
              <h2 className="form-section-title">Donation item</h2>
              <div className="form-divider"></div>

              <div className="donation-items-list">
                {selectedItems.length > 0 ? (
                  selectedItems.map((item, index) => (
                    <p key={index} className="donation-item">
                      {item}
                    </p>
                  ))
                ) : (
                  <p className="donation-item">Gas Stove</p>
                )}
                {selectedItems.length === 0 && (
                  <>
                    <p className="donation-item">Washing Machine</p>
                    <p className="donation-item">Water Purifier</p>
                    <p className="donation-item">Table Fan</p>
                    <p className="donation-item">Almirah</p>
                    <p className="donation-item">Center Table</p>
                    <p className="donation-item">Single Or Double Cot</p>
                    <p className="donation-item">Basketball/Football/ Bat</p>
                  </>
                )}
              </div>

              <div className="form-divider"></div>

              <div className="helper-charges-section">
                <div className="helper-charges-header">
                  <span className="helper-charges-label">Helper Chargers</span>
                  <span className="helper-charges-price">₹150</span>
                </div>
                <Checkbox
                  checked={helperCharges}
                  onChange={(e) => setHelperCharges(e.target.checked)}
                  label="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis dolor justo, pretium eu sapien nec, rhoncus luctus orci. Nulla et congue lectus."
                  className="helper-charges-checkbox"
                />
              </div>

              <div className="form-divider"></div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  fullWidth
                  className="place-order-btn"
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
