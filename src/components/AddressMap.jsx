import { useEffect } from 'react';
import './AddressMap.css';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updatePickupAddress, updatePickupPosition } from '../store/userSlice';
import useLocation from '../utilities/useLocation';

const AddressMap = () => {
  const {location, locationError} = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.lat && location.lng && !locationError) {
      initMap();
    }
  }, [location]);

  const initMap = async () => {
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    
    const map = new Map(document.getElementById("map"), {
      center: { lat: location.lat, lng: location.lng },
      zoom: 14,
      mapId: "4504f8b37365c3d0",
    });



    const draggableMarker = new AdvancedMarkerElement({
      map,
      position: { lat: location.lat, lng: location.lng },
      gmpDraggable: true,
      title: "Drag the marker to point your location.",
    });

    addressDescriptorReverseGeocoding(location);

    draggableMarker.addListener("dragend", () => {
      dispatch(updatePickupAddress(null));
      const position = draggableMarker.position;
      addressDescriptorReverseGeocoding(position);
    });
  }

  const addressDescriptorReverseGeocoding = async (position) => {
    const reverseGeocodingData = await axios.get(`https://geocode.maps.co/reverse?lat=${position.lat}&lon=${position.lng}&api_key=${import.meta.env.VITE_GEOCODING_API_KEY}`);
    dispatch(updatePickupPosition({
      lat: position.lat,
      lng: position.lng,
    }));
    dispatch(updatePickupAddress(reverseGeocodingData.data.display_name));
  }

  return (
    <>
      <div className="map-container">
        <div id="map"></div>
      </div>
    </>
  )
}

export default AddressMap;
