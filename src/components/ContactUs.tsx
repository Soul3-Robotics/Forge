import React, { useState } from 'react';
import { Mail, MessageSquare, Send, Phone, MapPin } from 'lucide-react';

export const ContactUs: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    const mailto = `mailto:info@soul3.in?subject=Message from ${encodeURIComponent(name)}&body=${encodeURIComponent(message + '\n\nFrom: ' + email)}`;
    window.location.href = mailto;
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-4 relative z-10 pointer-events-auto">

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mt-12">

        {/* Left: Contact Info & Community */}
        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#008B87] to-[#20c9c3]">Touch</span>
            </h2>
            <p className="text-lg text-gray-300 font-light leading-relaxed mb-4">
              Whether you're interested in our technology, want to partner with us, or simply want to say hello, our team is ready to connect.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#008B87]/20 border border-[#008B87]/30 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-[#008B87]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Email</p>
                <p className="text-white text-lg">info@soul3.in</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#008B87]/20 border border-[#008B87]/30 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-[#008B87]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">Phone</p>
                <p className="text-white text-lg">+91 98920 46795</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#008B87]/20 border border-[#008B87]/30 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5 text-[#008B87]" />
              </div>
              <div>
                <p className="text-gray-400 text-sm uppercase tracking-widest font-semibold">HQ</p>
                <p className="text-white text-lg">Riidl, Somaiya Vidyavihar University</p>
              </div>
            </div>

            {/* Map Location */}
            <div className="mt-4 rounded-2xl overflow-hidden border border-white/10 opacity-80 hover:opacity-100 transition-opacity">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.834468648358!2d72.89725831518398!3d19.07098795708573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c627a20bcaa9%3A0xb2fd3bcfeac0052a!2sriidl%20Somaiya%20Vidyavihar!5e0!3m2!1sen!2sin!4v1683884872322!5m2!1sen!2sin"
                width="100%"
                height="100"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* WhatsApp Community Box */}
          <div className="mt-6 p-6 rounded-3xl border border-[#25D366]/30 bg-[#25D366]/10 backdrop-blur-md relative overflow-hidden group hover:border-[#25D366]/50 transition-colors duration-300 cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative z-10 flex flex-col items-start space-y-3">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-[#25D366]" />
                <h3 className="text-xl font-bold text-white">Join Our Community</h3>
              </div>
              <p className="text-gray-300 text-sm">
                Connect with pioneers, patients, and developers in our official WhatsApp group. Get early access and exclusive updates.
              </p>
              <button
                onClick={() => window.open('https://chat.whatsapp.com/Kpssse6vlcb1kSsYQX4bJ6', '_blank')}
                className="px-5 py-2 text-sm rounded-full bg-[#25D366] text-black font-bold flex items-center space-x-2 hover:bg-[#20b858] transition-colors shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)]"
              >
                <span>Join WhatsApp</span>
                <Send className="w-3 h-3 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-[#008B87]/20 bg-[#008B87]/5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#008B87] opacity-10 blur-[100px] rounded-full mix-blend-screen pointer-events-none"></div>

          <h3 className="text-xl font-bold text-white mb-6">Send us a Message</h3>

          <form className="space-y-4 relative z-10" onSubmit={handleSubmit}>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#008B87] uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#008B87]/50 focus:ring-1 focus:ring-[#008B87]/50 transition-all placeholder:text-gray-600 text-base"
                placeholder="John Doe"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#008B87] uppercase tracking-widest">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#008B87]/50 focus:ring-1 focus:ring-[#008B87]/50 transition-all placeholder:text-gray-600 text-base"
                placeholder="john@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-[#008B87] uppercase tracking-widest">Message</label>
              <textarea
                rows={3}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#008B87]/50 focus:ring-1 focus:ring-[#008B87]/50 transition-all placeholder:text-gray-600 resize-none text-base"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button type="submit" className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-[#008B87] to-[#00a8a3] text-white font-bold tracking-wide hover:shadow-[0_0_20px_rgba(0,139,135,0.4)] transition-all flex items-center justify-center space-x-2">
              <span>Send Message</span>
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
