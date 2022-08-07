import React from "react";

const InformationPage = () => {
  return (
    <section className="w-3/4 mx-auto sm:py-12 bg-white rounded-lg border border-gray-200 shadow-md mt-5 min-h-screen mb-5">
      <div className="container p-6 pt-0 mx-auto space-y-8 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Information Page</h1>
        <p>
          When we say that animals have rights, we mean that they deserve to
          have their interests considered regardless of whether they are cute,
          useful to humans or endangered and regardless of whether any human
          cares about them at all.
        </p>
        <h1 className="text-2xl font-semibold">Contact PETA India</h1>
        <p>+91 022-40727382</p>
        <p>
          People for the Ethical Treatment of Animals (PETA) India PO Box 28260
          Juhu, Mumbai 400 049
        </p>
        <p>
          PETA India is a Charitable Company incorporated under section 25 of
          the Companies Act, 1956.
        </p>
        <h1 className="text-2xl font-semibold">Other Important Links</h1>
        <ul>
          <li>https://www.peta.org/</li>
        </ul>
      </div>
    </section>
  );
};

export default InformationPage;
