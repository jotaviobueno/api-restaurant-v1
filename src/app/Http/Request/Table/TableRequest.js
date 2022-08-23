// Dependencies
import yup from "yup";

class TableRequest {

	async ValidateCreateTable ( req, res, next ) {

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

	async ValidateDeleteTable ( req, res, next ) {

		const HeadersValidator = yup.object().shape({
			session_token: yup.string().required()
		});

		const ParamsValidator = yup.object().shape({
			table_id: yup.string().required()
		});

		try {
			await ParamsValidator.validate(req.headers);
			await HeadersValidator.validate(req.headers);

		} catch (err) {
			return res.status(422).json({errors: err.errors});

		}

		await next();
	}

}

export default new TableRequest;