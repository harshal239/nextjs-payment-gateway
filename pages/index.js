import Head from "next/head";
import Navbar from "../components/Navbar";
import Element from "../components/Element";
import Hero from "../components/Hero";

export default function Home() {
  const makePayment = async () => {
    console.log("here...");

    const res = await initializeRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load");
    }

    const data = await fetch("/api/razorpay", { method: "POST" }).then((t) => {
      t.json();
    });
    console.log(data);

    var options = {
      key: process.env.RAZORPAY_KEY, // Enter the Key ID generated from the Dashboard
      name: "Harshal Walunj",
      currency: data.currency,
      amount: data.amount,
      order_id: data.id,
      description: "Thankyou for your test donation",
      image: "",
      handler: function (response) {
        // Validate payment at server - using webhooks is a better idea.
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name: "Harshal Walunj",
        email: "harshalwalunj49@gmail.com",
        contact: "8483074163",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const initializeRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  return (
    <div>
      <Head>
        <title>Integrate Payments </title>
        <meta
          name="description"
          content="Integrate payments in your React and Next.js application with TailwindCSS and Razorpay"
        />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <main className="font-sans h-screen overflow-auto bg-gradient-to-tr from-[#252B30] to-[#191C22]">
        <Navbar />
        <Hero onClick={makePayment} />
        <Element className="bottom-10 bg-gradient-to-r from-green-500 to-green-700 antialiased" />
        <Element className="bottom-20 w-[110px] bg-gradient-to-r from-indigo-500 to-indigo-700 antialiased" />
        <Element className="top-12 w-[200px] bg-gradient-to-r from-purple-500 to-purple-700 antialiased" />
      </main>
    </div>
  );
}
