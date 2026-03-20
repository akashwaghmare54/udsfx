"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">

      <div className="w-full">

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 px-4 sm:px-6 items-center">
          {/* LEFT COLUMN */}
          <div className="space-y-6 sm:space-y-8">

            {/* Moved Heading Here */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#D4AF37]">
              Book Your Decoration
            </h2>

            <p className="text-base sm:text-lg text-white/70 max-w-md">
              Planning a special event? We’ll create a beautiful decoration setup for your celebration.
            </p>

            {/* 4 BOX GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">

              {[
                { icon: Phone, title: "Phone", value: "+91 98234 94017", link: "tel:+919823494017" },
                { icon: Mail, title: "Email", value: "waghmareuday98@gmail.com", link: "mailto:waghmareuday98@gmail.com" },
                { icon: MapPin, title: "Address", value: "Vidyanagar Ward - Ballarpur, Chandrapur Maharashtra, India", link: "https://maps.app.goo.gl/o46iw4NBKuwfhmALA" },
                { icon: Clock, title: "Hours", value: "Open 24x7", link: null },

              ].map((item, i) => (
                <motion.div
                  key={i}
                  whileHover={{ y: -6 }}
                  className="p-4 sm:p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl transition hover:bg-white/10"
                >
                  <item.icon className="text-[#D4AF37] mb-4" size={20} />

                  <h3 className="font-medium mb-1">
                    {item.title}
                  </h3>

                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-[#D4AF37] transition"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm text-white/60">
                      {item.value}
                    </p>
                  )}
                </motion.div>
              ))}

            </div>

          </div>


          {/* RIGHT COLUMN (FORM stays same) */}
          <div className="glass p-6 sm:p-8 lg:p-10 rounded-3xl border border-white/10 backdrop-blur-xl">

            <form className="space-y-5">

              <input
                placeholder="Name"
                className="w-full p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#D4AF37]/50 transition"
              />

              {/* ✅ Phone Number */}
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#D4AF37]/50 transition"
              />

              {/* <input
                placeholder="Event Type"
                className="w-full p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#D4AF37]/50 transition"
              /> */}

              <input
                type="date"
                className="w-full p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#D4AF37]/50 transition"
              />

              <input
                placeholder="Location"
                className="w-full p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 outline-none focus:border-[#D4AF37]/50 transition"
              />

              {/* ✅ Short Message Box */}
              <textarea
                rows={3}
                maxLength={120}
                placeholder="Short message (optional)"
                className="w-full p-3 sm:p-4 rounded-xl bg-white/5 border border-white/10 outline-none resize-none focus:border-[#D4AF37]/50 transition"
              />

              <button
                className="w-full py-4 rounded-xl bg-[#D4AF37] text-black font-semibold hover:scale-[1.02] transition"
              >
                Send Booking
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  );
}