export function user(app, req, res) {

    req.assert('_name', 'O nome é Obrigatório').notEmpty();
    req.assert('_email', 'O e-mail é Obrigatório').notEmpty().isEmail();

    let errors = req.validationErrors();

    if (errors) {

        app.utius.error.send(errors, req, res);
        return false;

    } else {

        return true;

    }

}