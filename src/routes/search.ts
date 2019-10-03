// import { filter } from 'lodash';
import { App } from '../App';

module.exports = {
  get: async (req, res) => {
    const q = req.query.q;
    const searchResult = await App.youTubeClient.searchVideos(q, 10);

    const allowed = ['title', 'thumbnails'];
    const filtered = Object.keys(searchResult)
      .filter(key => allowed.includes(key))
      .reduce((obj, key) => {
        obj[key] = searchResult[key];

        return obj;
      }, {});

    // console.log(filter(searchResult, 'name'));
    res.status(200).json(searchResult);
  },
};
