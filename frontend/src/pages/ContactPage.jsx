import React, { useState } from "react";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Input, Textarea } from "../components/ui/input";
import { Button } from "../components/ui/button";
import useMessageStore from "../store/useMessageStore";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const { sendMessage } = useMessageStore();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendMessage(form);
      setForm({ name: "", email: "", message: "" });
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      // error toast handled in store
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 overflow-hidden">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-gradient-to-tr from-pink-400/30 via-purple-400/20 to-yellow-300/20 rounded-full blur-3xl opacity-60 pointer-events-none z-0" />
      <div className="absolute bottom-10 right-1/3 w-[220px] h-[100px] bg-gradient-to-br from-blue-400/20 via-cyan-300/10 to-purple-400/10 rounded-full blur-2xl opacity-40 pointer-events-none z-0" />

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-2 text-foreground drop-shadow-xl select-none">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          We'd love to hear from you! Fill out the form and our team will get
          back to you soon.
        </p>
        <Card className="w-full shadow-lg border bg-card/80 backdrop-blur-md">
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6 pt-8 pb-4">
              <Input
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                required
                className="text-base"
              />
              <Input
                name="email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                required
                className="text-base"
              />
              <Textarea
                name="message"
                placeholder="Your Message"
                value={form.message}
                onChange={handleChange}
                rows={5}
                required
                className="text-base"
              />
            </CardContent>
            <CardFooter className="pt-2 pb-8">
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-lg cursor-pointer font-semibold transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-lg hover:bg-primary/90 focus-visible:scale-[1.03] focus-visible:shadow-lg disabled:scale-100 disabled:shadow-none"
              >
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ContactPage;
