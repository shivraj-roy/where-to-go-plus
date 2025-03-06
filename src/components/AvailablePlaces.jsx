import { useEffect, useState } from "react";
import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
   const [availablePlaces, setAvailablePlaces] = useState([]);
   const [isFetching, setIsFetching] = useState(false);
   const [error, setError] = useState();

   useEffect(() => {
      const fetchPlaces = async () => {
         try {
            setIsFetching(true);
            const response = await fetch("http://localhost:3000/places");
            const resData = await response.json();
            setAvailablePlaces(resData.places);
            if (!response.ok) {
               throw new Error("Places could not be fetched...");
            }
         } catch (error) {
            setError({
               message: error.message || "Sorry!!! Something went wrong...",
            });
         }
         setIsFetching(false);
      };
      fetchPlaces();
   }, []);

   if (error) {
      return (
         <ErrorPage title={"An error occurred..."} message={error.message} />
      );
   }

   return (
      <Places
         title="Available Places"
         places={availablePlaces}
         fallbackText="No places available."
         onSelectPlace={onSelectPlace}
         isLoading={isFetching}
         loadingText={"Loading..."}
      />
   );
}
