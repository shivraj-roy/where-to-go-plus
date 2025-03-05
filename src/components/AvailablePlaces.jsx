import { useEffect, useState } from "react";
import Places from "./Places.jsx";

export default function AvailablePlaces({ onSelectPlace }) {
   const [availablePlaces, setAvailablePlaces] = useState([]);
   const [isFetching, setIsFetching] = useState(false);

   useEffect(() => {
      const fetchPlaces = async () => {
         setIsFetching(true);
         const response = await fetch("http://localhost:3000/places");
         const resData = await response.json();
         setAvailablePlaces(resData.places);
         setIsFetching(false);
      };
      fetchPlaces();
   }, []);

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
