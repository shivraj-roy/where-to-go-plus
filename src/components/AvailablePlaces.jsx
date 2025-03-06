import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";
import { useFetch } from "../hooks/useFetch.js";

async function fetchSortedPlaces() {
   const places = await fetchAvailablePlaces();
   return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((pos) => {
         const sortedPlaces = sortPlacesByDistance(
            places,
            pos.coords.latitude,
            pos.coords.longitude
         );
         resolve(sortedPlaces);
      });
   });
}

export default function AvailablePlaces({ onSelectPlace }) {
   const {
      isFetching,
      error,
      fetchedData: availablePlaces,
   } = useFetch(fetchSortedPlaces, []);

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
