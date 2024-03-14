import React from "react";
import DoctorCard from "./DoctorCard";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/userFetchData";
import Loading from "../Loader/Loading";
import Error from "../../Components/Error/Error";

const DoctorList = () => {
  const { data: doctors, loading, error } = useFetchData(`${BASE_URL}/doctors`);

  return (
    <div>
      {loading && <Loading />}
      {error && (
        <Error errorMessage="An error occurred while fetching doctors." />
      )}

      {!error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          {doctors && doctors.length > 0 ? (
            doctors.map((doctor) => (
              <DoctorCard key={doctor._id} doctor={doctor} />
            ))
          ) : (
            <p>No doctors available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorList;
