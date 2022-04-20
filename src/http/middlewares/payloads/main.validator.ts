import {check} from "express-validator";

export class mainValidator {
    static save() {
        return [
            check('title').not().isEmpty().withMessage('locale.titleRequired'),
            check('category').not().isEmpty().withMessage('locale.categoryRequired'),
        ]
    }

    static update() {
        return [
            check('_id').not().isEmpty().withMessage('locale.idRequired'),
            check('title').not().isEmpty().withMessage('locale.titleRequired'),
            check('category').not().isEmpty().withMessage('locale.categoryRequired'),
        ]
    }
}
