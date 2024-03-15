import React, { useState, useEffect } from "react";
import DoctorCard from "./../../Components/doctors/DoctorCard";
// import Testimonial from "../../Components/testimonial/Testimonial";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/userFetchData";
import Loading from "../../Components/Loader/Loading";
import Error from "../../Components/Error/Error";

const Doctors = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const handleSearch = (query) => {
    setQuery(query.trim());
    console.log("handle search:", query);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedQuery(query);
    }, 700);

    return () => {
      if (timeout) {
        clearTimeout(timeout);
      }
    };
  }, [query]);

  const {
    data: doctors,
    loading,
    error,
  } = useFetchData(`${BASE_URL}/doctors?query=${debouncedQuery}`);

  return (
    <>
      <section className="bg-[#fff9ea]">
        <div className="container text-center">
          <h2 className="heading">Find a Doctor</h2>

          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-full flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Doctor by Name or Specifications"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="btn">
              Search
            </button>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          {error && (
            <Error errorMessage="An error occurred while fetching doctors." />
          )}
          {!error && doctors && doctors.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {doctors?.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>
          )}
          {loading && <Loading />}
          {!loading && doctors && doctors.length === 0 && (
            <p>No doctors found.</p>
          )}
        </div>
      </section>

      <section>
        <div className="container">
          <div className="mx-auto">
            <h2 className="heading text-center">What our patients say</h2>
            <p className="text_para text-center">
              World-class care for everyone. Our health system offers unmatched,
              expert health care.
            </p>
          </div>
          {/* <Testimonial /> */}
        </div>
      </section>
    </>
  );
};

export default Doctors;
