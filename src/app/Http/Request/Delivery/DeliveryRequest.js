// Dependencies
import yup from "yup";

class DeliveryRequest {

	async ValidateAddAnddress ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required()
		});

		const BodyValidator = yup.object().shape({
			andress: yup.string().required(),
			number: yup.number().required(),
			district: yup.string().required(),
		});

		try {
			await BodyValidator.validate(req.body);
			await HeadersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

	async ValidateFindAllAddress ( req, res, next ) {

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

export default new DeliveryRequest;