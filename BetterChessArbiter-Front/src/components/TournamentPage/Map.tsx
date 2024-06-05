import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import axios from "axios";
type MapProps = {
  tournamentId: string;
};

function Map({ tournamentId }: MapProps) {
  const [apiLoaded, setApiLoaded]= useState<boolean>(false);
  const {isLoaded} =useJsApiLoader({
    id:"AIzaSyDkTCiJ4cSKk3LylA_ADu1xhA0zMu9QDwE",
    googleMapsApiKey:"AIzaSyDkTCiJ4cSKk3LylA_ADu1xhA0zMu9QDwE"
  })
  const [map,setMap] = useState(null);
  
  const [defaultProps, setDefaultMapProps] = useState<{
    center: {
      lat: number;
      lng: number;
    };
    zoom: number;
  }>();

  useEffect(() => {
    
    const getMap = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7001/api/tournament/coordinates/${tournamentId}`
        );
        if (response.status == 200) {
          setDefaultMapProps({ center: response.data, zoom: 15 });
          console.log(response.data);
          setApiLoaded(true);
        }
      } catch (error) {
        alert(error);
      }
    };
    getMap();
  }, []);

  return (isLoaded && apiLoaded) ? (
    <div style={{ height: "50vh", width: "100%" }}>
      <GoogleMap
      
      mapContainerStyle={{height:"50vh", width:"100%"}}
      center={defaultProps?.center}
      zoom={defaultProps?.zoom}
     >
      <Marker position={defaultProps!.center}/>
      </GoogleMap>
    </div>
  ) : (
    <>Loading...</>
  );
}

export default Map;
