// repository
import repository from "../../Repository/Delivery/DeliveryRepository.js";

// helpers
import ClientHelper from "../../../Helper/Client/ClientHelper.js";
import LoginHelper from "../../../Helper/Client/LoginHelper.js";
import ResponseHelper from "../../../Helper/ResponseHelper.js";
import DeliveryHelper from "../../../Helper/Delivery/DeliveryHelper.js";

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

		if (! await DeliveryHelper.NumberOfAddresses( ClientInfo.email ) )
			return await ResponseHelper.unprocessableEntity( res, { error: "it was not possible to register the address because you already have the maximum level of registered addresses" });

		if ( number <= 0 )
			return await ResponseHelper.unprocessableEntity( res, { error: "error no number" });

		const addressInformation = await repository.AddAndress( DeliveryInformation, ClientInfo.email, ClientInfo.name );

		if ( addressInformation )
			return await ResponseHelper.success( res, {
				name: addressInformation.name,
				email: addressInformation.email,
				address: addressInformation.address,
				address_id: addressInformation.id,
				created_at: addressInformation.created_at
			});
		
		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async FindAllAddress ( req, res ) {
		const { session_token } = req.headers;

		const SessionInfo = await LoginHelper.existToken( session_token );

		if (! SessionInfo )
			return await ResponseHelper.badRequest( res, { error: "your session is invalid" });

		const ClientInfo = await ClientHelper.existEmail( SessionInfo.email );

		if (! ClientInfo )
			return await ResponseHelper.unprocessableEntity( res, { error: "your email is invalid" });
	
		const AddressInformation = await repository.FindAllAddress( ClientInfo.email );

		if ( AddressInformation )
			return await ResponseHelper.success( res, AddressInformation );

		return await ResponseHelper.unprocessableEntity( res, { error:  "unable to process request" });
	}

	async Delete ( req, res ) {
		const { session_token, address_id } = req.headers;

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
			return await ResponseHelper.notAuthorized( res, { error: "not authorized" });

		const InformationDeleted = await repository.DeleteAddress( AddressInformation.id, ClientInfo.email );

		if ( InformationDeleted )
			return await ResponseHelper.success( res, {
				name: InformationDeleted.name,
				email: InformationDeleted.email,
				id: InformationDeleted.id,
				address: InformationDeleted.address,
				created_at: InformationDeleted.created_at,
				deleted_at: new Date(),
				updated_at: new Date(),
			});

		return await ResponseHelper.unprocessableEntity( res, { error: "unable to process request" });
	}
}

export default new UpdateController;