// Dependencies
import yup from "yup";

class AddressRequest {

	async ValidateCreateOrder ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required(),
			card_id: yup.string().required()
		});

		const ParamsValidator = yup.object().shape({
			address_id: yup.string().required(),
		});

		const BodyValidator = yup.object().shape({
			cvv: yup.number().required(),
			dish_id: yup.string().required(),
		});

		try {
			await BodyValidator.validate(req.body);
			await ParamsValidator.validate(req.params);
			await HeadersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

	async ValidateSeeOrderHistory ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required()
		});

		try {
			await HeadersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

}

export default new AddressRequest;