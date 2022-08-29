// Dependencies
import yup from "yup";

class CardRequest {

	async ValidateAddCard ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required()
		});

		const BodyValidator = yup.object().shape({
			name: yup.string().required(),
			card_number: yup.number().required(),
			cvv: yup.number().required(),
			expires_date: yup.string().required(),
		});

		try {
			await BodyValidator.validate(req.body);
			await HeadersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

	async ValidateFindAllCard ( req, res, next ) {

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

	async ValidateDeleteCard ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required(),
			card_id: yup.string().required()
		});

		try {
			await HeadersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

}

export default new CardRequest;