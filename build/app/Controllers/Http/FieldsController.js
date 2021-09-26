"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Database_1 = __importDefault(global[Symbol.for('ioc.use')]("Adonis/Lucid/Database"));
const Field_1 = __importDefault(require("../../Models/Field"));
const Venue_1 = __importDefault(require("../../Models/Venue"));
class FieldsController {
    async index({ request, response, auth }) {
        const venueId = request.param('venue_id');
        const fields = await Field_1.default.findBy('venue_id', venueId);
        let resData = {
            status: 'ok',
            data: fields
        };
        response.send(resData);
    }
    async show({ request, response }) {
        const venueId = request.param('venue_id');
        const fieldId = request.param('id');
        const field = await Field_1.default.findOrFail(fieldId);
        let resData = {
            status: 'ok',
            data: field
        };
        response.send(resData);
    }
    async store({ request, response }) {
        const venuesId = request.param('venue_id');
        const fieldsSchema = Validator_1.schema.create({
            name: Validator_1.schema.string({
                trim: true
            }),
            type: Validator_1.schema.string({
                trim: true
            })
        });
        const data = await request.validate({ schema: fieldsSchema });
        const dataToInsert = {
            name: data.name,
            type: data.type
        };
        let venues = await Venue_1.default.find(venuesId);
        let insertId = await venues.related('fields').create(dataToInsert);
        let resData = {
            status: 'ok',
            insertId: insertId,
            newData: dataToInsert
        };
        response.ok({ "message": "berhasil menambahkan data field baru", data: resData });
    }
    async update({ request, response }) {
        const fieldId = request.param('id');
        const fieldsSchema = Validator_1.schema.create({
            name: Validator_1.schema.string.optional({
                trim: true
            }),
            type: Validator_1.schema.string.optional({
                trim: true
            }),
            venue_id: Validator_1.schema.number.optional()
        });
        const data = await request.validate({ schema: fieldsSchema });
        const date = new Date();
        const datetime = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        data.updated_at = datetime;
        let updateId = await Database_1.default.from('fields').where('id', fieldId).update(data);
        let resData = {
            status: 'ok',
            newData: data
        };
        response.json(resData);
    }
    async destroy({ request, response }) {
        const fieldId = request.param('id');
        let updateId = await Database_1.default.from('fields').where('id', fieldId).delete();
        let resData = {
            status: 'ok',
            message: "Field was deleted"
        };
        response.json(resData);
    }
}
exports.default = FieldsController;
//# sourceMappingURL=FieldsController.js.map