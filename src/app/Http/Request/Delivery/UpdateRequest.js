// Dependencies
import yup from "yup";

class UpdateRequest {

	async ValidateUpdateAddress ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required(),
			address_id: yup.string().required()
		});

		const BodyValidator = yup.object().shape({
			new_andress: yup.string().required(),
			new_number: yup.number().required(),
			new_district: yup.string().required(),
		});

		try {
			await HeadersValidator.validate(req.headers);
			await BodyValidator.validate(req.body);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}
}

export default new UpdateRequest;