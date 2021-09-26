"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Validator_1 = global[Symbol.for('ioc.use')]("Adonis/Core/Validator");
const Venue_1 = __importDefault(require("../../Models/Venue"));
class VenuesController {
    async index({ response }) {
        const venues = await Venue_1.default.all();
        for (let i in venues) {
            venues[i].fields = await venues[i].related('fields').query();
        }
        response.send(venues);
    }
    async show({ request, response }) {
        let id;
        id = request.param('id');
        const venue = await Venue_1.default.find(id);
        venue.fields = await venue.related('fields').query();
        if (!venue) {
            return;
        }
        response.ok({ message: "berhasil get data venue by id", venue });
    }
    async store({ request, response }) {
        const venueSchema = Validator_1.schema.create({
            name: Validator_1.schema.string({
                trim: true
            }),
            address: Validator_1.schema.string({
                trim: true
            }),
            phone: Validator_1.schema.string({}, [
                Validator_1.rules.mobile({
                    locales: ['id-ID'],
                    strict: true
                }),
            ])
        });
        const data = await request.validate({ schema: venueSchema });
        const insertId = await Venue_1.default.create(data);
        let resData = {
            status: 'ok',
            newData: insertId
        };
        response.json(resData);
    }
    async update({ request, response }) {
        let id;
        id = request.param('id');
        const venueSchema = Validator_1.schema.create({
            name: Validator_1.schema.string.optional({
                trim: true
            }),
            address: Validator_1.schema.string.optional({
                trim: true
            }),
            phone: Validator_1.schema.string.optional({}, [
                Validator_1.rules.mobile({
                    locales: ['id-ID'],
                    strict: true
                }),
            ]),
            updated_at: Validator_1.schema.string.optional({ trim: true })
        });
        const data = await request.validate({ schema: venueSchema });
        const vn = await Venue_1.default.find(id);
        vn.merge(data);
        vn.save();
        let resData = {
            status: 'ok',
            venueId: id,
            updateData: data
        };
        response.send(resData);
    }
    async destroy({ request, response }) {
        let id;
        id = request.param('id');
        const venues = await Venue_1.default.findOrFail(id);
        await venues.delete();
        let resData = {
            status: 'ok',
            venueId: id,
            message: "Data deleted"
        };
        response.send(resData);
    }
}
exports.default = VenuesController;
//# sourceMappingURL=VenuesController.js.map