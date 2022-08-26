// repository
import repository from "../../Repository/Delivery/DeliveryRepository.js";

// helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import UpdateHelper from "../../../Helper/Delivery/UpdateHelper.js";

class UpdateController {

	async AddAnddress ( req, res ) {
		const { session_token } = req.headers;
		const { andress, number, district } = req.body;
		const DeliveryInformation = `${andress}, ${number}, ${district}`;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });

		if (! await UpdateHelper.NumberOfAddresses( ClientInfo.email ) )
			return await ResponseHelper.unprocessableEntity( res, { error: "it was not possible to register the address because you already have the maximum level of registered addresses" });

		if ( number <= 0 )
			return await ResponseHelper.unprocessableEntity( res, { error: "error no number" });

		const addressInformation = await repository.AddAndress( DeliveryInformation, ClientInfo.email, ClientInfo.name );

		if ( addressInformation )
			return await ResponseHelper.success( res, {
				name: addressInformation.name,
				email: addressInformation.email,
				address: addressInformation.addressInfo.address,
				address_id: addressInformation.addressInfo.id,
				created_at: addressInformation.addressInfo.created_at
			});
		
		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}
}

export default new UpdateController;