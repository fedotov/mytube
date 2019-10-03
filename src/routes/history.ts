import { History } from '../models/History.model';

module.exports = {
  get: async (req, res) => {
    const items = await History.findAll();

    res.status(200).json(items);
  },

  post: async (req, res) => {
    const {videoId, title, thumbnail} = req.body;
    const item = await History.create({videoId, title, thumbnail});

    res.status(200).json(item);
  },

  delete: async (req, res) => {
    const {videoId} = req.body;
    const itemStatus = await History.destroy({ where: {videoId} });

    res.status(200).json(itemStatus);
  },
};
