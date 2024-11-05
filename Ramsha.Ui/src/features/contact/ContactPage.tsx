import AppMaps, { MarkerData } from '../../app/components/maps/AppMaps'
import React, { useEffect, useState } from 'react';
import { AddressInfo } from '../../app/components/maps/mapUtils';

const ContactPage = () => {
  const [address, setAddress] = useState<AddressInfo | null>(null);

  const handleAddressChange = (addressInfo: AddressInfo | null) => {
    console.log('newAddress: ', addressInfo)
  }



  return (
    <>
      <AppMaps sx={{ height: 500, width: '100%', p: 4 }} onAddressChange={handleAddressChange} />
    </>
  )

}

export default ContactPage;