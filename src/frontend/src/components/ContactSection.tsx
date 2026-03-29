import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertCircle,
  CheckCircle,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { useSubmitContactForm } from "../hooks/useQueries";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const submitForm = useSubmitContactForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitForm.mutateAsync(form);
      setSubmitted(true);
      setForm({ name: "", email: "", message: "" });
    } catch {
      /* error handled by mutation state */
    }
  };

  return (
    <section id="contact" className="py-20 bg-industrial-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="section-heading">Get In Touch</h2>
          <p className="text-industrial-300 mt-6 max-w-xl">
            Our safety specialists are ready to help you find the right
            equipment for your industry.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            {submitted ? (
              <div
                className="bg-industrial-800 border border-amber-500/30 rounded-lg p-8 flex flex-col items-center justify-center text-center h-full"
                data-ocid="contact.success_state"
              >
                <CheckCircle className="w-16 h-16 text-amber-500 mb-4" />
                <h3 className="font-display font-bold text-white text-xl mb-2">
                  Message Sent!
                </h3>
                <p className="text-industrial-300 mb-6">
                  Our team will contact you within 24 hours.
                </p>
                <Button
                  onClick={() => setSubmitted(false)}
                  className="bg-amber-500 hover:bg-amber-600 text-industrial-900 font-bold uppercase tracking-wider"
                  data-ocid="contact.secondary_button"
                >
                  Send Another
                </Button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-industrial-800 border border-industrial-700 rounded-lg p-6 space-y-4"
                data-ocid="contact.panel"
              >
                <h3 className="font-display font-bold text-white uppercase tracking-wide mb-2">
                  Send a Message
                </h3>
                <div>
                  <Label className="text-industrial-300 text-xs uppercase tracking-wider mb-1.5 block">
                    Your Name
                  </Label>
                  <Input
                    value={form.name}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, name: e.target.value }))
                    }
                    required
                    placeholder="John Smith"
                    className="bg-industrial-900 border-industrial-600 text-white placeholder:text-industrial-500 focus:border-amber-500"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label className="text-industrial-300 text-xs uppercase tracking-wider mb-1.5 block">
                    Email Address
                  </Label>
                  <Input
                    type="email"
                    value={form.email}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, email: e.target.value }))
                    }
                    required
                    placeholder="john@company.com"
                    className="bg-industrial-900 border-industrial-600 text-white placeholder:text-industrial-500 focus:border-amber-500"
                    data-ocid="contact.input"
                  />
                </div>
                <div>
                  <Label className="text-industrial-300 text-xs uppercase tracking-wider mb-1.5 block">
                    Message
                  </Label>
                  <Textarea
                    value={form.message}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, message: e.target.value }))
                    }
                    required
                    placeholder="Tell us about your safety requirements..."
                    rows={4}
                    className="bg-industrial-900 border-industrial-600 text-white placeholder:text-industrial-500 focus:border-amber-500 resize-none"
                    data-ocid="contact.textarea"
                  />
                </div>
                {submitForm.isError && (
                  <div
                    className="flex items-center gap-2 text-red-400 text-sm"
                    data-ocid="contact.error_state"
                  >
                    <AlertCircle className="w-4 h-4" />
                    <span>Failed to send. Please try again.</span>
                  </div>
                )}
                <Button
                  type="submit"
                  disabled={submitForm.isPending}
                  className="w-full bg-amber-500 hover:bg-amber-600 text-industrial-900 font-bold uppercase tracking-wider"
                  data-ocid="contact.submit_button"
                >
                  {submitForm.isPending ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>

          {/* Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-industrial-800 border border-industrial-700 rounded-lg p-6"
          >
            <h3 className="font-display font-bold text-white uppercase tracking-wide mb-6">
              Contact Details
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-industrial-400 text-xs uppercase tracking-wider mb-1">
                    Phone
                  </p>
                  <p className="text-white font-medium">+91 76780 34480</p>
                  <p className="text-white font-medium">+91 82379 32116</p>
                  <p className="text-industrial-300 text-sm mt-1">
                    Mon–Sat 9am–7pm IST
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-industrial-400 text-xs uppercase tracking-wider mb-1">
                    Email
                  </p>
                  <p className="text-white font-medium">safety@safeguard.com</p>
                  <p className="text-industrial-300 text-sm">
                    24/7 Emergency Support
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-amber-500/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-industrial-400 text-xs uppercase tracking-wider mb-1">
                    Headquarters
                  </p>
                  <p className="text-white font-medium">SafeGuard Industries</p>
                  <p className="text-industrial-300 text-sm">India</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-industrial-700">
              <p className="text-industrial-400 text-xs uppercase tracking-wider mb-4">
                Regional Office
              </p>
              <div className="flex items-center gap-2 text-sm text-industrial-300">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                Mumbai, India
              </div>
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-industrial-800 border border-industrial-700 rounded-lg overflow-hidden"
          >
            <div className="h-full min-h-64 flex flex-col">
              <div className="p-4 border-b border-industrial-700">
                <h3 className="font-display font-bold text-white uppercase tracking-wide text-sm">
                  Our Location
                </h3>
              </div>
              <div
                className="flex-1 relative"
                style={{
                  background:
                    "linear-gradient(135deg, #0d0f12 0%, #12151a 100%)",
                }}
              >
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  viewBox="0 0 400 300"
                  role="img"
                  aria-label="Map grid background"
                >
                  {[0, 50, 100, 150, 200, 250, 300].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="#4a5568"
                      strokeWidth="0.5"
                    />
                  ))}
                  {[0, 50, 100, 150, 200, 250, 300, 350, 400].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="0"
                      x2={x}
                      y2="300"
                      stroke="#4a5568"
                      strokeWidth="0.5"
                    />
                  ))}
                  <rect
                    x="120"
                    y="80"
                    width="160"
                    height="100"
                    rx="4"
                    fill="#2d3748"
                    stroke="#F5A623"
                    strokeWidth="1"
                  />
                  <rect
                    x="160"
                    y="120"
                    width="80"
                    height="40"
                    rx="2"
                    fill="rgba(245, 166, 35, 0.2)"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-amber">
                      <MapPin className="w-6 h-6 text-industrial-900" />
                    </div>
                    <p className="text-white font-bold text-sm">
                      Mumbai, India
                    </p>
                    <p className="text-industrial-300 text-xs">SafeGuard HQ</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
