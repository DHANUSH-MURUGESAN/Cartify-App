import React, { useEffect, useState } from "react";
import Nav from "../../Nav";
import Footer from "../../Footer";
import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";

const FAQItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="faq-item border-b border-gray-light py-3">
      <button
        className="flex justify-between items-center w-full text-dark text-left font-semibold"
        onClick={() => setOpen(!open)}
      >
        {question}
        <span className="rounded-full bg-dark text-white text-[18px] p-1">
          {open ? <MdArrowDropUp /> : <MdArrowDropDown />}
        </span>
      </button>
      {open && <p className="mt-2 text-dark">{answer}</p>}
    </div>
  );
};

const Faq = () => {
  const faqs = [
    {
      question: "What is Cartify?",
      answer: "Cartify is an online e-commerce platform offering a wide range of products, from daily essentials to trending items, all in one place.",
    },
    {
      question: "Can I place custom or bulk orders?",
      answer: "Yes! Cartify allows bulk orders for events, corporate gifting, and special occasions, with exclusive deals for large orders.",
    },
    {
      question: "What are your delivery options?",
      answer: "We offer same-day delivery within select cities and standard delivery to nearby locations, with real-time tracking.",
    },
    {
      question: "Do you ship internationally?",
      answer: "Currently, Cartify delivers only within India. We’re expanding soon to more locations.",
    },
    {
      question: "How do I track my order?",
      answer: "Once your order is shipped, you will receive a tracking link via email or SMS to monitor your delivery in real-time.",
    },
    {
      question: "What payment methods are accepted?",
      answer: "We accept credit/debit cards, UPI, net banking, digital wallets, and cash on delivery in select locations.",
    },
    {
      question: "What is your return and refund policy?",
      answer: "You can request returns within 7 days of delivery for eligible items. Refunds will be processed once the return is verified.",
    },
    {
      question: "Are there any discounts or loyalty programs?",
      answer: "Yes! Cartify offers seasonal discounts, promotional codes, and a loyalty program to reward frequent shoppers.",
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our support team via email, phone, or live chat for any questions or assistance with your order.",
    },
    {
      question: "Is my personal and payment information safe?",
      answer: "Absolutely. Cartify uses secure encryption protocols and trusted payment gateways to protect your data.",
    },
  ];

  return (
    <>
      <Nav />
      <div className="bg-cream lg:mt-18 lg:px-20 lg:py-10 md:mt-18 md:py-10 md:px-20 sm:mt-16">
        <h1 className="text-2xl md:text-4xl text-center font-bold text-dark mb-10 leading-snug">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem key={index} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Faq;
