import React from "react";

import croissant from "../assets/croissant.png";
import whisk from "../assets/whisk.png";
import flower from "../assets/flower.png";

function ContactUs() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf8] min-h-screen py-24 px-6">

      {/* CROISSANT */}
      <img
        src={croissant}
        alt=""
        className="absolute left-[-180px] bottom-[-20px] w-[780px] opacity-95 hidden lg:block pointer-events-none select-none"
      />

      {/* WHISK */}
      <img
        src={whisk}
        alt=""
        className="absolute right-8 top-56 w-[190px] opacity-20 hidden lg:block pointer-events-none select-none"
      />

      {/* FLOWER */}
      <img
        src={flower}
        alt=""
        className="absolute right-0 bottom-10 w-[260px] opacity-15 hidden lg:block pointer-events-none select-none"
      />

      {/* SPARKLES */}
      <div className="absolute top-40 left-16 text-pink-200 text-5xl hidden lg:block">
        ✦
      </div>

      <div className="absolute top-52 right-72 text-pink-200 text-4xl hidden lg:block">
        ✦
      </div>

      <div className="absolute bottom-20 right-80 text-pink-200 text-4xl hidden lg:block">
        ✦
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto text-center">

        {/* TOP TEXT */}
        <p className="text-[#e6007e] uppercase tracking-[0.35em] text-sm font-semibold mb-5">
          We’d Love To Hear From You
        </p>

        {/* HEART */}
        <div className="flex items-center justify-center gap-4 mb-6">
          <div className="w-14 h-[1px] bg-pink-200"></div>
          <span className="text-[#e6007e] text-sm">♥</span>
          <div className="w-14 h-[1px] bg-pink-200"></div>
        </div>

        {/* TITLE */}
        <h1 className="text-6xl md:text-7xl font-serif text-stone-900 mb-4">
          Contact Us
        </h1>

        {/* INFINITY */}
        <div className="text-[#e6007e] text-3xl mb-6">
          ∞
        </div>

        {/* DESCRIPTION */}
        <p className="text-stone-500 text-xl leading-relaxed mb-20">
          Have a question, feedback, or just want to say hello?
          <br />
          We’re here to help!
        </p>

        {/* FORM */}
        <form className="max-w-5xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14 text-left">

            {/* FIRST NAME */}
            <div>
              <label className="block text-stone-700 text-base mb-4">
                First Name
              </label>

              <input
                type="text"
                className="w-full bg-transparent border-b border-stone-400 pb-4 outline-none focus:border-[#e6007e] transition text-lg"
              />
            </div>

            {/* LAST NAME */}
            <div>
              <label className="block text-stone-700 text-base mb-4">
                Last Name
              </label>

              <input
                type="text"
                className="w-full bg-transparent border-b border-stone-400 pb-4 outline-none focus:border-[#e6007e] transition text-lg"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-stone-700 text-base mb-4">
                Email (required)
              </label>

              <input
                type="email"
                className="w-full bg-transparent border-b border-stone-400 pb-4 outline-none focus:border-[#e6007e] transition text-lg"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block text-stone-700 text-base mb-4">
                Phone Number
              </label>

              <input
                type="text"
                className="w-full bg-transparent border-b border-stone-400 pb-4 outline-none focus:border-[#e6007e] transition text-lg"
              />
            </div>

            {/* SUBJECT */}
            <div>
              <label className="block text-stone-700 text-base mb-4">
                Subject
              </label>

              <input
                type="text"
                className="w-full bg-transparent border-b border-stone-400 pb-4 outline-none focus:border-[#e6007e] transition text-lg"
              />
            </div>

            {/* ENQUIRY TYPE */}
            <div>
              <label className="block text-stone-700 text-base mb-4">
                Enquiry Type
              </label>

              <div className="relative">
                <select
                  className="w-full appearance-none bg-transparent border-b border-stone-400 pb-4 outline-none text-stone-700 focus:border-[#e6007e] transition text-lg"
                >
                  <option>Choose an option</option>
                  <option>Customer Feedback</option>
                  <option>Product Enquiry</option>
                  <option>Business Opportunity</option>
                  <option>Career</option>
                </select>

                <span className="absolute right-1 top-1 text-[#e6007e] pointer-events-none text-lg">
                  ▼
                </span>
              </div>
            </div>

          </div>

          {/* MESSAGE */}
          <div className="text-left mt-14">
            <label className="block text-stone-700 text-base mb-4">
              Your Message
            </label>

            <textarea
              rows="4"
              className="w-full bg-transparent border-b border-stone-400 pb-4 outline-none resize-none focus:border-[#e6007e] transition text-lg"
            ></textarea>
          </div>

          {/* BUTTON */}
          <div className="text-center mt-14">
            <button
              type="submit"
              className="bg-[#e6007e] hover:bg-[#c4006b] text-white px-28 py-5 rounded-full text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Send Message
            </button>

            <p className="text-stone-400 text-base mt-5">
              We typically respond within 24 hours.
            </p>
          </div>

        </form>
      </div>
    </section>
  );
}

export default ContactUs;