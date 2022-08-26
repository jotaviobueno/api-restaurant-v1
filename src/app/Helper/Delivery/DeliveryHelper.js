// Models
import AddresModel from "../../Models/Delivery/AddressModel.js";

// Settings
import {TotalAddress} from "../../../config/Settings.js";

class UpdateHelper {
    
	async NumberOfAddresses ( email ) {
		const findAllAddress = await AddresModel.find({ email: email });

		if ( findAllAddress.length >= TotalAddress)
			return false;

		return true;
	}
	
	async existAddressId ( id ) {
		const findAddress = await AddresModel.findOne({ id: id, deleted_at: null });
		
		if ( findAddress === null )
			return false;
			
		return findAddress;
	}

}

export default new UpdateHelper;