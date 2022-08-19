// Dependencies
import yup from "yup";

class UpdateRequest {

	async ValidateUpdateName ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required()
		});

		const BodyValidator = yup.object().shape({
			new_name: yup.string().min(3).max(60).required(),
			password: yup.string().required(),
		});

		try {
			await BodyValidator.validate(req.body);
			await HeadersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}
}

export default new UpdateRequest;