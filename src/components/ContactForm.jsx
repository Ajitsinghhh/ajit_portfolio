import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactForm = ({ isDarkMode = true }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ type: "", message: "" });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: "Message sent successfully! I'll get back to you soon.",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    }

    setIsLoading(false);
  };

  return (
    <section
      id="contact"
      className={`py-20 px-6 transition-colors duration-300 ${
        isDarkMode ? "bg-[#1a1a1a]" : "bg-gray-50"
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Get In Touch</h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Get in Touch Block */}
          <div>
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-2">📞</span>
              <h3
                className={`text-xl font-semibold transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Get in Touch
              </h3>
            </div>

            <div
              className={`space-y-4 transition-colors ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <span className="font-medium text-sm uppercase tracking-wide opacity-75">
                    Name
                  </span>
                  <div className="font-semibold text-lg">Ajit Singh</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <span className="font-medium text-sm uppercase tracking-wide opacity-75">
                    Specialization
                  </span>
                  <div className="font-semibold text-lg">
                    Frontend Developer
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <span className="font-medium text-sm uppercase tracking-wide opacity-75">
                    Email
                  </span>
                  <div className="font-semibold text-lg">
                    ajitsinghpanwar2004@gmail.com
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <div>
                  <span className="font-medium text-sm uppercase tracking-wide opacity-75">
                    Phone
                  </span>
                  <div className="font-semibold text-lg">7689096514</div>
                </div>
              </div>
            </div>

            <p
              className={`text-sm leading-relaxed mt-6 transition-colors ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              I'm always interested in new opportunities and collaborations.
              Whether you have a project in mind or just want to say hello, feel
              free to reach out!
            </p>
          </div>

          {/* Contact Form */}
          <Card
            className={`shadow-xl transition-colors ${
              isDarkMode
                ? "bg-[#0f0f0f] border-gray-700"
                : "bg-white border-gray-200"
            }`}
          >
            <CardHeader>
              <CardTitle
                className={`transition-colors ${
                  isDarkMode ? "text-white" : "text-gray-900"
                }`}
              >
                Send a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label
                    htmlFor="name"
                    className={`transition-colors ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Name *
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 transition-colors ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="email"
                    className={`transition-colors ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Email *
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 transition-colors ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <Label
                    htmlFor="message"
                    className={`transition-colors ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    Message *
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className={`mt-1 transition-colors ${
                      isDarkMode
                        ? "bg-gray-800 border-gray-600 text-white placeholder-gray-400"
                        : "bg-white border-gray-300 text-gray-900"
                    }`}
                    placeholder="Tell me about your project or just say hello..."
                    rows={5}
                    required
                  />
                </div>

                {status.message && (
                  <div
                    className={`p-3 rounded-lg text-sm ${
                      status.type === "success"
                        ? "bg-green-100 text-green-700 border border-green-200"
                        : "bg-red-100 text-red-700 border border-red-200"
                    }`}
                  >
                    {status.message}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  {isLoading ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
