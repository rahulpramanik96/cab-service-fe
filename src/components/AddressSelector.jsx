import './AddressSelector.css';
import AddressMap from "./AddressMap";
import { useSelector } from 'react-redux';
import axios from 'axios';

const AddressSelector = () => {
  const user = useSelector((state) => state.user);

  const handlePickupAddressConfirm = () => {
    axios.post('http://localhost:8080/sendLocation', {
      lat: user.pickupPosition.lat,
      lng: user.pickupPosition.lng,
      address: user.pickupAddress,
    });
  }

  return (
    <>
      <div className="address-selector">
        <div>
          <textarea type="text" rows="5" cols="50" value={user.pickupAddress ? user.pickupAddress : 'Loading...'} disabled />
          <button className="pickup-address-confirm-btn" onClick={handlePickupAddressConfirm}>CONFIRM</button>
        </div>
        <AddressMap />
      </div>
    </>
  )
}

export default AddressSelector;
