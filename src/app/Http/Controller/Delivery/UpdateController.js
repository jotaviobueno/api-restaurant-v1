// repository
import repository from "../../Repository/Delivery/UpdateRepository.js";

// helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import DeliveryHelper from "../../../Helper/Delivery/DeliveryHelper.js";

class UpdateController {

	async UpdateAddress ( req, res ) {
		const { session_token, address_id } = req.headers;
		const { new_andress, new_number, new_district } = req.body;
		const NewAddress = `${new_andress}, ${new_number}, ${new_district}`;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		const AddressInformation = await DeliveryHelper.existAddressId( address_id );

		if (! AddressInformation )
			return await ResponseHelper.unprocessableEntity( res, { error: "AddressInformation is invalid" });

		if ( AddressInformation.email != ClientInfo.email )
			return await ResponseHelper.notAuthorized( res, { error: "not Authorized" });

		if ( AddressInformation.address === NewAddress )
			return await ResponseHelper.unprocessableEntity( res, { error: "address equal to the one already registered in the account" });

		const UpdatedInformations = await repository.UpdateAddressAndCreateLog( ClientInfo.name, ClientInfo.email, address_id, NewAddress, AddressInformation.address );

		if ( UpdatedInformations )
			return await ResponseHelper.success( res, UpdatedInformations);

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}
    
}

export default new UpdateController;