import React from "react";

function ContactUs() {
  return (
    // Fits the screen exactly under the header navbar, perfectly clean and minimal
    <section className="relative overflow-hidden bg-[#fffaf8] min-h-[calc(100vh-80px)] w-full flex items-start justify-center px-6 pt-12 md:pt-10 pb-20">

      {/* --- MAIN WRAPPER CONTENT --- */}
      <div className="relative z-10 w-full max-w-3xl text-center flex flex-col items-center justify-center my-auto">

        {/* TOP SUB-TEXT */}
        <p className="text-[#e6007e] uppercase tracking-[0.35em] text-xs font-bold mb-3 w-full text-center">
          We’d Love To Hear From You
        </p>

        {/* HEART SEPARATOR */}
        <div className="flex items-center justify-center gap-4 mb-4 w-full">
          <div className="w-14 h-[0.5px] bg-pink-200/70"></div>
          <span className="text-[#e6007e] text-sm">♥</span>
          <div className="w-14 h-[0.5px] bg-pink-200/70"></div>
        </div>

        {/* TITLE */}
        <h1 className="text-[52px] font-serif font-light text-stone-900 leading-none mb-4 w-full text-center">
          Contact Us
        </h1>

        {/* DESCRIPTION */}
        <p className="text-stone-500 text-base leading-relaxed mb-10 max-w-md mx-auto font-light text-center">
          Have a question, feedback, or just want to say hello? We’re here to help!
        </p>

        {/* --- BALANCED 2-COLUMN FORM --- */}
        <form className="w-full mx-auto px-4 sm:px-8 space-y-7">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-6 text-left">

            {/* FIRST NAME */}
            <div className="flex flex-col border-b border-stone-300/80 pb-1.5 focus-within:border-[#e6007e] transition-colors duration-200">
              <label className="text-stone-500 text-sm font-normal mb-1">
                First Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent outline-none text-stone-800 text-lg py-0.5 font-light"
              />
            </div>

            {/* LAST NAME */}
            <div className="flex flex-col border-b border-stone-300/80 pb-1.5 focus-within:border-[#e6007e] transition-colors duration-200">
              <label className="text-stone-500 text-sm font-normal mb-1">
                Last Name
              </label>
              <input
                type="text"
                className="w-full bg-transparent outline-none text-stone-800 text-lg py-0.5 font-light"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col border-b border-stone-300/80 pb-1.5 focus-within:border-[#e6007e] transition-colors duration-200">
              <label className="text-stone-500 text-sm font-normal mb-1">
                Email (required)
              </label>
              <input
                type="email"
                required
                className="w-full bg-transparent outline-none text-stone-800 text-lg py-0.5 font-light"
              />
            </div>

            {/* PHONE NUMBER */}
            <div className="flex flex-col border-b border-stone-300/80 pb-1.5 focus-within:border-[#e6007e] transition-colors duration-200">
              <label className="text-stone-500 text-sm font-normal mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full bg-transparent outline-none text-stone-800 text-lg py-0.5 font-light"
              />
            </div>

            {/* SUBJECT */}
            <div className="flex flex-col border-b border-stone-300/80 pb-1.5 focus-within:border-[#e6007e] transition-colors duration-200">
              <label className="text-stone-500 text-sm font-normal mb-1">
                Subject
              </label>
              <input
                type="text"
                className="w-full bg-transparent outline-none text-stone-800 text-lg py-0.5 font-light"
              />
            </div>

            {/* ENQUIRY TYPE */}
            <div className="flex flex-col border-b border-stone-300/80 pb-1 focus-within:border-[#e6007e] transition-colors duration-200">
              <label className="text-stone-500 text-sm font-normal mb-1">
                Enquiry Type
              </label>
              <div className="relative w-full">
                <select
                  className="w-full appearance-none bg-transparent outline-none text-stone-700 text-lg pb-0.5 pr-6 cursor-pointer font-light"
                  defaultValue=""
                >
                  <option value="" disabled hidden>Choose an option</option>
                  <option value="feedback">Customer Feedback</option>
                  <option value="enquiry">Product Enquiry</option>
                  <option value="business">Business Opportunity</option>
                  <option value="career">Career</option>
                </select>
                <span className="absolute right-0 bottom-2 text-[#e6007e] pointer-events-none text-[10px]">
                  ▼
                </span>
              </div>
            </div>

          </div>

          {/* YOUR MESSAGE FIELD */}
          <div className="flex flex-col text-left border-b border-stone-300/80 pb-1.5 focus-within:border-[#e6007e] transition-colors duration-200">
            <label className="text-stone-500 text-sm font-normal mb-1">
              Your Message
            </label>
            <textarea
              rows="1"
              className="w-full bg-transparent outline-none resize-none text-stone-800 text-lg py-0.5 font-light"
            ></textarea>
          </div>

          {/* REFINED SLIM SUBMIT BUTTON */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-[#e6007e] hover:bg-[#c4006b] text-white px-12 py-2.5 rounded-full text-sm font-semibold tracking-wide shadow-sm hover:shadow hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
            >
              Send Message
            </button>

            <p className="text-stone-400 text-xs mt-3 font-light tracking-wide">
              We typically respond within 24 hours.
            </p>
          </div>

        </form>
      </div>
    </section>
  );
}

export default ContactUs;