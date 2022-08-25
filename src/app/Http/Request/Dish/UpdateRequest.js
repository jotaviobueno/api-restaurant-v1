// Dependencies
import yup from "yup";

class UpdateRequest {

	async ValidateUpdateDishName ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required(),
			dish_id: yup.string().required()
		});

		const BodyValidator = yup.object().shape({
			new_dish_name: yup.string().required()
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